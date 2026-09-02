const { Before, After, AfterStep } = require('@cucumber/cucumber');
const { chromium, request } = require('@playwright/test');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/login.page');

const artifactsDir = path.join('artifacts');
const registryPath = path.join(artifactsDir, 'recorded-scenarios.json');

function safeName(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
}

function readRegistry() {
    if (!fs.existsSync(registryPath)) return { scenarios: {} };

    try {
        return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    } catch {
        // Si el archivo se interrumpe o se edita manualmente, no bloquea la prueba.
        return { scenarios: {} };
    }
}

function scenarioId(pickle) {
    return crypto
        .createHash('sha256')
        .update(`${pickle.uri}:${pickle.name}`)
        .digest('hex');
}

function saveScenario(registry, id, pickle) {
    registry.scenarios[id] = {
        feature: pickle.uri,
        scenario: pickle.name,
        recordedAt: new Date().toISOString()
    };
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
}

Before(async function ({ pickle }) {
    const scenarioName = safeName(pickle.name);
    const executionId = `${scenarioName}-${Date.now()}`;
    const registry = readRegistry();

    this.scenarioId = scenarioId(pickle);
    this.registry = registry;
    this.pickle = pickle;
    this.captureArtifacts =
        process.env.RECAPTURAR_EVIDENCIAS === 'true' ||
        !registry.scenarios[this.scenarioId];

    this.screenshotsDir = path.join('artifacts', 'screenshots', executionId);
    this.videosDir = path.join('artifacts', 'videos');
    if (this.captureArtifacts) {
        fs.mkdirSync(this.screenshotsDir, { recursive: true });
        fs.mkdirSync(this.videosDir, { recursive: true });
    }

    this.browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });

    this.context = await this.browser.newContext(
        this.captureArtifacts
            ? {
                recordVideo: {
                    dir: this.videosDir,
                    size: { width: 1280, height: 720 }
                }
            }
            : {}
    );

    this.page = await this.context.newPage();
    this.stepNumber = 0;

    this.request = await request.newContext({
        baseURL: 'https://room-rent.xyz/portal/'
    });

    this.loginPage = new LoginPage(this.page);
});

AfterStep(async function ({ pickleStep }) {
    if (!this.captureArtifacts || !this.page || this.page.isClosed()) return;

    this.stepNumber += 1;
    const stepName = safeName(pickleStep.text) || 'paso';
    const screenshotPath = path.join(
        this.screenshotsDir,
        `${String(this.stepNumber).padStart(2, '0')}-${stepName}.png`
    );

    await this.page.screenshot({ path: screenshotPath, fullPage: true });
});

After(async function () {
    // El contexto debe cerrarse antes que el navegador para que Playwright
    // termine de escribir el archivo de vídeo del escenario.
    await this.context.close();
    await this.browser.close();

    if (this.captureArtifacts) {
        saveScenario(this.registry, this.scenarioId, this.pickle);
    }
});

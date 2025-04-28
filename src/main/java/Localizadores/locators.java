package Localizadores;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class locators {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver","src\\main\\resources\\drivers\\chromedriver.exe");
        //Iniciar buscador
        WebDriver driver = new ChromeDriver();

        //Acceder al ambiente
        driver.get("https://v2.psicoalianza.com/login");
        //Maximizar buscador
        driver.manage().window().maximize();

        //registrar datos de acceso
        String username = "14251103";
        String password = "123456789$$";

        //localizador por id
        WebElement usernameInput = driver.findElement(By.id("email"));
        WebElement passwordInput = driver.findElement(By.id("password"));
        WebElement loginBtn = driver.findElement(By.className("btn-primary"));

        //Login
        usernameInput.sendKeys(username);
        passwordInput.sendKeys(password);
        loginBtn.click();


    }
}

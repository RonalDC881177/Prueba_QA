package Prueba_QA;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Prueba_QA {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\POS\\Desktop\\install\\untitled\\src\\main\\resources\\drivers\\chromedriver.exe");
        //Iniciar buscador
        WebDriver driver = new ChromeDriver();

        //Acceder al ambiente
        driver.get("https://v2.psicoalianza.com/login");

        //Maximizar buscador
        driver.manage().window().maximize();
        driver.close();
    }

}

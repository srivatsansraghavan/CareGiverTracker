package pageObjects;

import java.net.MalformedURLException;
import java.net.URL;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.http.*;
import io.cucumber.java.*;
import support.FormHelper;

public class Hooks {
	@BeforeAll()
	public static void setUp() throws MalformedURLException {
		HttpRequest request = new HttpRequest(HttpMethod.GET, "/base/clean-env-db/local");
		HttpClient client = HttpClient.Factory.createDefault().createClient(new URL("http://localhost:3000"));
		HttpResponse response = client.execute(request);
		WebDriver driver = FormHelper.startDriver();
		FormHelper.maximiseBrowser(driver);
	}
	
	@AfterAll()
	public static void tearDown() {
		FormHelper.teardown();
	}
}
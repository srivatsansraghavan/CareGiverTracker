package runner;

import org.junit.runner.RunWith;
import io.cucumber.junit.*;

@RunWith(Cucumber.class)
@CucumberOptions(features="src/test/resources/features", glue="stepdefinitions", monochrome=true, plugin= {
		"pretty",
		"html:target/cucumber.html"
})
public class CucumberRunner{}
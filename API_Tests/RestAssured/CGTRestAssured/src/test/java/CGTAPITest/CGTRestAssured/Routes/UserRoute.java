package CGTAPITest.CGTRestAssured.Routes;

import org.json.simple.*;
import org.testng.Assert;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import io.restassured.RestAssured;
import io.restassured.http.Method;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class UserRoute {
	
	RequestSpecification httpRequest;
	public static String accessToken;
	
	public UserRoute() {
		RestAssured.baseURI = "http://localhost:3000/user/";
    	httpRequest = RestAssured.given();
    	httpRequest.contentType("application/json");
	}
	
	public JsonPath getResponse(String reqType, String endpoint, JSONObject reqData, int resCode) {
		Method method = Method.valueOf(reqType);
		httpRequest.body(reqData.toJSONString());
		Response response = httpRequest.request(method, endpoint);
		Assert.assertEquals(resCode, response.getStatusCode());
    	return response.jsonPath();
	}
	
	@Parameters({ "email", "password", "fullname" })
	@Test
	public void verifySignUpUser(String email, String password, String fullname) {
		JSONObject addUserData = new JSONObject();
    	addUserData.put("email", email);
    	addUserData.put("password", password);
    	addUserData.put("fullname", fullname);
		JsonPath jsonSchema = getResponse("POST", "/add-users", addUserData, 200);
    	Assert.assertEquals("User created successfully!", jsonSchema.get("message"));
    	accessToken = jsonSchema.getString("access_token");
	}
	
	@Parameters({ "email", "password" })
	@Test
	public void verifyLoginUser(String email, String password) {
		JSONObject loginUserData = new JSONObject();
		loginUserData.put("email", email);
		loginUserData.put("password", password);
		JsonPath jsonSchema = getResponse("POST", "/login-user", loginUserData, 200);
    	Assert.assertEquals("User signed in successfully!", jsonSchema.get("message"));
    	accessToken = jsonSchema.getString("access_token");
	}
}
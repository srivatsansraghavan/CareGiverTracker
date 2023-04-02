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

public class RoleRoute {
	
	RequestSpecification httpRequest;
	
	public RoleRoute() {
		RestAssured.baseURI = "http://localhost:3000/role/";
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
	
	@Parameters({ "email" })
	@Test
	public void checkFirstLogin(String email) {
		httpRequest.queryParam("email", email);
		Response response = httpRequest.request(Method.GET, "/is-first-login");
		Boolean firstLogin = Boolean.valueOf(response.getBody().asString());
    	Assert.assertTrue(firstLogin);
	}
	
	@Parameters({ "email", "care-taken-of", "care-taken-name", "care-taken-dob", "care-taken-gender" })
	@Test
	public void verifyAddRoleToUser(String email, String careTakenOf, String careTakenName, String careTakenDOB, String careTakenGender) {
		JSONObject addRoleData = new JSONObject();
		addRoleData.put("care_giver", email);
		addRoleData.put("care_taken_of", careTakenOf);
		addRoleData.put("care_taken_name", careTakenName);
		addRoleData.put("care_taken_dob", careTakenDOB);
		addRoleData.put("care_taken_gender", careTakenGender);
		JsonPath jsonSchema = getResponse("POST", "/add-role", addRoleData, 200);
    	Assert.assertEquals("Care can now be provided to " + careTakenName, jsonSchema.get("message"));
	}
	
	@Parameters({ "email", "care-taken-of", "care-taken-name", "care-taken-dob", "care-taken-gender" })
	@Test
	public void verifyGetRoleDetails(String email, String careTakenOf, String careTakenName, String careTakenDOB, String careTakenGender) {
		httpRequest.queryParam("giver_email", email);
		Response response = httpRequest.request(Method.GET, "/get-role-details");
		JsonPath jsonSchema = response.jsonPath();
		Assert.assertEquals(careTakenOf, jsonSchema.get("care_taken_of"));
		Assert.assertEquals(careTakenName, jsonSchema.get("care_taken_name"));
		Assert.assertEquals(careTakenDOB, jsonSchema.get("care_taken_dob"));
		Assert.assertEquals(careTakenGender, jsonSchema.get("care_taken_gender"));
	}
}
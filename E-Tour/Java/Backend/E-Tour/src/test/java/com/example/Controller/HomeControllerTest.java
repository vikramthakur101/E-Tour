/*This test class is a unit test for HomeController using JUnit 5 and Mockito.
Since HomeController is dependent on HomeServices, we mock the service layer to ensure that we are only testing the controller.
The test should verify that the hcontroller.getAllCategories() calls hservice.getAllCategories and
the service method should call ATLEASTONCE

*/

package com.example.Controller;

import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import com.example.Controller.*;
import com.example.controller.HomeController;
import com.example.services.HomeServices;

@ExtendWith(MockitoExtension.class)                             //allows mockito for Junit5 and to mock and DI 
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)            //orders testcases based on @order specific order
public class HomeControllerTest {
	@Mock 														//creates a mock instance of Homeservices
	private HomeServices hservice;
	
	//@InjectMocks                                           //can use this instead of manual instantiation using setUp()
	private HomeController hcontroller;
	
	@BeforeEach                                               //runs before/after every testcase
	void setUp() throws Exception{
		hcontroller=new HomeController(hservice);
	}
	
	@AfterEach
	void tearDown() throws Exception{
		// Cleanup actions after each test (if needed)
	}
	
	
	@Test                                //marks method as testcase
	@Order(1)									//specifies order of execution
	void testgetAllCategories() {
		hcontroller.getAllCategories();
		verify(hservice,atLeastOnce()).getAllCategories();   //to verify that the specific method is called.
	}
}

package com.programmer08054.list_rest_service;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import freemarker.template.Template;
import freemarker.template.TemplateException;

// 108.24.167.239
@org.springframework.stereotype.Controller
public class Controller {
	@RequestMapping("/")
	@ResponseBody
	public String goToHomePage() {
		// create your root object
		Map<String, Object> root = new TreeMap<>();

		Template template = TemplateData.getInstance().getTemplate("index-template.html");
		StringWriter writer = new StringWriter();
		try {
			template.process(root, writer);
		} catch (TemplateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return writer.toString();
	}
	
	@RequestMapping("/grocery-list")
	@ResponseBody
	public String goToGroceryList() {
		GroceryListManager.initializeListFile();

		// create your root object
		Map<String, Object> root = new TreeMap<>();
		root.put("groceryList", GroceryListManager.readListFromFile());

		Template template = TemplateData.getInstance().getTemplate("grocery-template.html");
		StringWriter writer = new StringWriter();
		try {
			template.process(root, writer);
		} catch (TemplateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return writer.toString();
	}

	@RequestMapping("/add")
	@ResponseBody
	public ResponseEntity<String> add(@RequestParam(defaultValue = GroceryList.DEFAULT_GROUP) String group,
			@RequestParam String name) {
		final String groupSanitized = GroceryListManager.superSanitizeString(group);
		final String nameSanitized = GroceryListManager.superSanitizeString(name);
		if (groupSanitized.isEmpty() || nameSanitized.isEmpty()) {
			return new ResponseEntity<>("Failed to add " + nameSanitized + " to " + groupSanitized + "!",
					HttpStatus.BAD_REQUEST);
		}
		GroceryList groceryList = GroceryListManager.readListFromFile();
		groceryList.addItem(groupSanitized, nameSanitized);
		GroceryListManager.writeListToFile(groceryList);
		return new ResponseEntity<>("Added " + nameSanitized + " to " + groupSanitized + "!", HttpStatus.OK);
	}

	@RequestMapping("/delete")
	@ResponseBody
	public ResponseEntity<String> delete(@RequestParam(defaultValue = GroceryList.DEFAULT_GROUP) String group,
			@RequestParam String name) {
		final String groupSanitized = GroceryListManager.superSanitizeString(group);
		final String nameSanitized = GroceryListManager.superSanitizeString(name);
		if (groupSanitized.isEmpty() || nameSanitized.isEmpty()) {
			return new ResponseEntity<>("Failed to delete " + nameSanitized + " from " + groupSanitized + "!",
					HttpStatus.BAD_REQUEST);
		}
		GroceryList groceryList = GroceryListManager.readListFromFile();
		groceryList.deleteItem(groupSanitized, nameSanitized);
		GroceryListManager.writeListToFile(groceryList);
		return new ResponseEntity<>("Deleted " + nameSanitized + " from " + groupSanitized + "!", HttpStatus.OK);
	}
	@RequestMapping("/login")
	@ResponseBody
	public String loginPage(@RequestParam(defaultValue = "false") String error) {

		// create your root object
		Map<String, Object> root = new TreeMap<>();
		root.put("error", "true".equals(error));

		Template template = TemplateData.getInstance().getTemplate("login-template.html");
		StringWriter writer = new StringWriter();
		try {
			template.process(root, writer);
		} catch (TemplateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return writer.toString();
	}
}
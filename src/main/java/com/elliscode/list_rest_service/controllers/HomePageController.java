package com.elliscode.list_rest_service.controllers;

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

import com.elliscode.list_rest_service.GroceryList;
import com.elliscode.list_rest_service.GroceryListManager;
import com.elliscode.list_rest_service.TemplateData;

import freemarker.template.Template;
import freemarker.template.TemplateException;

// 108.24.167.239
@org.springframework.stereotype.Controller
public class HomePageController {
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
}
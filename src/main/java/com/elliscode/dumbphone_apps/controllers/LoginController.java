package com.elliscode.dumbphone_apps.controllers;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.elliscode.dumbphone_apps.TemplateData;

import freemarker.template.Template;
import freemarker.template.TemplateException;

@org.springframework.stereotype.Controller
public class LoginController {
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

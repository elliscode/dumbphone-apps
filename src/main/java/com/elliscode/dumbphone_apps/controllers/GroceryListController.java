package com.elliscode.dumbphone_apps.controllers;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.elliscode.dumbphone_apps.GroceryList;
import com.elliscode.dumbphone_apps.GroceryListManager;
import com.elliscode.dumbphone_apps.ListGroup;
import com.elliscode.dumbphone_apps.TemplateData;

import freemarker.template.Template;
import freemarker.template.TemplateException;

@org.springframework.stereotype.Controller
public class GroceryListController {

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

	@RequestMapping("/move")
	@ResponseBody
	public ResponseEntity<String> move(@RequestParam String direction, @RequestParam String group) {
		final String groupSanitized = GroceryListManager.superSanitizeString(group);
		if (groupSanitized.isEmpty()) {
			return new ResponseEntity<>("Failed to move " + groupSanitized + "!", HttpStatus.BAD_REQUEST);
		}
		GroceryList groceryList = GroceryListManager.readListFromFile();
		groceryList = moveGroup(direction, group, groceryList);
		GroceryListManager.writeListToFile(groceryList);
		return new ResponseEntity<>("Moved " + groupSanitized + "!", HttpStatus.OK);
	}

	private GroceryList moveGroup(String direction, String group, GroceryList groceryList) {
		List<ListGroup> groups = new ArrayList<>(groceryList.getGroups());
		int index = -1;
		for(int i = 0; i < groups.size(); i++) {
			ListGroup groupObj = groups.get(i);
			if(groupObj.getName().equals(group)) {
				index = i;
				break;
			}
		}
		if(index < 0) {
			System.err.println("index < 0");
			return groceryList;
		}
		int newIndex = -1;
		if(direction.equals("up")) {
			newIndex = index - 1;
		} else {
			newIndex = index + 1;
		}
		if(newIndex < 0 || newIndex >= groups.size()) {
			System.err.println("newIndex = " + newIndex);
			return groceryList;
		}
		ListGroup temp = groups.get(index);
		groups.set(index, groups.get(newIndex));
		groups.set(newIndex, temp);
		return new GroceryList(groups);
	}

}

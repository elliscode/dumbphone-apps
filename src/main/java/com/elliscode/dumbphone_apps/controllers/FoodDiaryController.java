package com.elliscode.dumbphone_apps.controllers;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.elliscode.dumbphone_apps.TemplateData;
import com.elliscode.dumbphone_apps.food_diary.entities.DiaryEntry;
import com.elliscode.dumbphone_apps.food_diary.entities.Food;
import com.elliscode.dumbphone_apps.food_diary.entities.Serving;
import com.elliscode.dumbphone_apps.food_diary.entities.User;
import com.elliscode.dumbphone_apps.food_diary.repositories.DiaryEntryRepository;
import com.elliscode.dumbphone_apps.food_diary.repositories.FoodRepository;
import com.elliscode.dumbphone_apps.food_diary.repositories.ServingRepository;
import com.elliscode.dumbphone_apps.food_diary.repositories.UserRepository;
import com.google.gson.JsonArray;

import freemarker.template.Template;
import freemarker.template.TemplateException;

@org.springframework.stereotype.Controller
public class FoodDiaryController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	FoodRepository foodRepository;
	@Autowired
	DiaryEntryRepository diaryEntryRepository;
	@Autowired
	ServingRepository servingRepository;

	@RequestMapping("/food-diary")
	@ResponseBody
	public String foodDiary() {

		// get current user and update database
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		List<User> users = userRepository.findByNameEquals(currentPrincipalName);
		if (users.isEmpty()) {
			User item = new User(currentPrincipalName);
			userRepository.save(item);
			users.add(item);
		}
		User user = users.get(0);

		// get current day and get date range
		Date currentTime = new Date();
		Date minTime = new Date(currentTime.getYear(), currentTime.getMonth(), currentTime.getDate());
		Date maxTime = new Date(currentTime.getYear(), currentTime.getMonth(), currentTime.getDate() + 1);

		// retrieve all entries for this day range
		List<DiaryEntry> entries = diaryEntryRepository.findByUserHashEqualsAndTimeStampBetween(user.getHash(), minTime,
				maxTime);

		// create your root object
		Map<String, Object> root = new TreeMap<>();
		root.put("entries", entries);
		root.put("total", entries.stream().mapToDouble(entry -> entry.getServing().getCalories()).sum());

		Template template = TemplateData.getInstance().getTemplate("food-diary-template.html");
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

	@RequestMapping("/food-diary/add")
	@ResponseBody
	public ResponseEntity<String> add(@RequestParam String foodName) {
		foodName = foodName.trim();
		if (foodName.isEmpty()) {
			return new ResponseEntity<>("Failed to add!", HttpStatus.BAD_REQUEST);
		}

		// get current user and update database
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		List<User> users = userRepository.findByNameEquals(currentPrincipalName);
		if (users.isEmpty()) {
			User item = new User(currentPrincipalName);
			userRepository.save(item);
			users.add(item);
		}
		User user = users.get(0);

		List<Food> foods = foodRepository.findByNameEquals(foodName);
		if (foods.isEmpty()) {
			Food item = new Food(foodName);
			foods.add(item);
			foodRepository.save(item);
		}
		Food food = foods.get(0);
		
		List<Serving> servings = servingRepository.findByFoodHashEquals(food.getHash());
		if (servings.isEmpty()) {
			Serving item = new Serving(food, "serving");
			servings.add(item);
			servingRepository.save(item);
		}
		Serving serving = servings.get(0);

		DiaryEntry entry = new DiaryEntry(user, serving);
		diaryEntryRepository.save(entry);

		return new ResponseEntity<>("Added " + entry + "!", HttpStatus.OK);
	}

	@RequestMapping("/food-diary/search")
	@ResponseBody
	public ResponseEntity<String> search(@RequestParam String query) {
		query = query.trim();
		List<Food> foods = foodRepository.findFirst10ByNameIgnoreCaseContainingOrderByName(query);
		JsonArray output = new JsonArray();
		for (int i = 0; i < foods.size(); i++) {
			Food food = foods.get(i);
			output.add(food.getName());
		}

		return new ResponseEntity<>(output.toString(), HttpStatus.OK);
	}

	@RequestMapping("/food-diary/delete")
	@ResponseBody
	public ResponseEntity<String> delete(@RequestParam UUID hash) {
		diaryEntryRepository.deleteById(hash);

		return new ResponseEntity<>("Deleted " + hash.toString(), HttpStatus.OK);
	}
}

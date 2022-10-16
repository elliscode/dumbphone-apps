package com.programmer08054.list_rest_service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

public class GroceryListManager {
	private static final Object fileOperationLock = new Object();
	private static final Path path = Paths.get(System.getProperty("user.home")).resolve("grocery-list")
			.resolve("list.txt");

	public static GroceryList readListFromFile() {
		synchronized (fileOperationLock) {
			GroceryList groceryList = new GroceryList();
			GroceryListManager.initializeListFile();
			try (BufferedReader reader = Files.newBufferedReader(path)) {
				String line = null;
				while (null != (line = reader.readLine())) {
					if (line.trim().isEmpty() || line.startsWith("//")) {
						continue;
					}
					String groupName = GroceryList.DEFAULT_GROUP;
					String itemName = "";
					String[] parts = line.split(",", 2);
					if (2 == parts.length) {
						groupName = parts[0];
						itemName = parts[1];
					} else {
						itemName = parts[0];
					}
					groceryList.addItem(groupName, itemName);
				}
			} catch (Throwable e) {
				e.printStackTrace();
			}
			return groceryList;
		}
	}

	public static void initializeListFile() {
		synchronized (fileOperationLock) {
			if (Files.exists(path)) {
				return;
			}
			if (!Files.exists(path.getParent())) {
				try {
					Files.createDirectories(path.getParent());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8,
					StandardOpenOption.CREATE)) {
				writer.write("// This file was created on " + getStringDate());
				writer.newLine();
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}
	}

	public static String superSanitizeString(String input) {
		if(null == input) {
			return "";
		}
		return input.replaceAll("[^\\x20\\x30-\\x39\\x41-\\x5A\\x61-\\x7A]+", " ").trim();
	}

	public static void writeListToFile(GroceryList groceryList) {
		synchronized (fileOperationLock) {
			try (BufferedWriter writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8,
					StandardOpenOption.TRUNCATE_EXISTING)) {
				writer.write("// This file was created on " + getStringDate());
				writer.newLine();
				for (ListGroup group : groceryList.getGroups()) {
					for (String item : group.getItems()) {
						writer.write(group.getName());
						writer.write(",");
						writer.write(item);
						writer.newLine();
					}
				}
			} catch (Throwable e) {
				e.printStackTrace();
			}
		}
	}

	public static String getStringDate() {
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		return formatter.format(date);
	}
}

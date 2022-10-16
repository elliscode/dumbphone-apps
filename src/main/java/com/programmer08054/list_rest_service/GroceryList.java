
package com.programmer08054.list_rest_service;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

public class GroceryList {
	public static final String DEFAULT_GROUP = "Groceries";
	private final Object modificationLock = new Object();
	private Map<String, ListGroup> groups = new LinkedHashMap<>();

	public Collection<ListGroup> getGroups() {
		synchronized (modificationLock) {
			return groups.values();
		}
	}

	public void addGroup(String groupName) {
		synchronized (modificationLock) {
			groups.put(groupName, new ListGroup(groupName));
		}
	}

	public ListGroup getGroup(String groupName) {
		synchronized (modificationLock) {
			if (!groups.containsKey(groupName)) {
				groups.put(groupName, new ListGroup(groupName));
			}
			return groups.get(groupName);
		}
	}

	public void addItem(String item) {
		String groupName = DEFAULT_GROUP;
		synchronized (modificationLock) {
			if (!groups.containsKey(groupName)) {
				groups.put(groupName, new ListGroup(groupName));
			}
			groups.get(groupName).addItem(item);
		}
	}

	public void addItem(String groupName, String item) {
		synchronized (modificationLock) {
			for(String key : groups.keySet()) {
				if(key.toLowerCase().equals(groupName.toLowerCase())) {
					groupName = key;
				}
			}
			if (!groups.containsKey(groupName)) {
				groups.put(groupName, new ListGroup(groupName));
			}
			groups.get(groupName).addItem(item);
		}
	}

	public void deleteItem(String item) {
		String groupName = DEFAULT_GROUP;
		synchronized (modificationLock) {
			if (!groups.containsKey(groupName)) {
				groups.put(groupName, new ListGroup(groupName));
			}
			groups.get(groupName).removeItem(item);
		}
	}

	public void deleteItem(String groupName, String item) {
		synchronized (modificationLock) {
			if (!groups.containsKey(groupName)) {
				groups.put(groupName, new ListGroup(groupName));
			}
			groups.get(groupName).removeItem(item);
		}
	}
}

package com.elliscode.dumbphone_apps;

import java.util.Collection;
import java.util.Collections;
import java.util.TreeSet;

public class ListGroup {
	public final Object modificationLock = new Object();

	private String name;
	private TreeSet<String> items;

	public ListGroup(String name) {
		this.name = name;
		this.items = new TreeSet<>();
	}

	public ListGroup(String name, Collection<String> items) {
		this.name = name;
		this.items = new TreeSet<>(items);
	}

	public String getName() {
		return name;
	}

	public Collection<String> getItems() {
		synchronized (modificationLock) {
			return Collections.unmodifiableSet(items);
		}
	}

	public void addItem(String item) {
		synchronized (modificationLock) {
			for(String value : items) {
				if(value.toLowerCase().equals(item.toLowerCase())) {
					return;
				}
			}
			items.add(item);
		}
	}

	public void removeItem(String item) {
		synchronized (modificationLock) {
			items.remove(item);
		}
	}
}

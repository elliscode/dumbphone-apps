package com.elliscode.dumbphone_apps.food_diary.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	public User() {
		name = "";
		hash = createHash();
	}
	
	public User(String name) {
		this.name = name;
		this.hash = createHash();
	}
	
	private UUID createHash() {
		return UUID.nameUUIDFromBytes(name.getBytes());
	}
	
	@Id
	@Column(name = "hash")
	private UUID hash;
	@Column(name = "name")
	private String name;
	public UUID getHash() {
		return hash;
	}

	public void setHash(UUID hash) {
		this.hash = hash;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

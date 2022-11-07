package com.elliscode.dumbphone_apps.food_diary.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.JsonObject;

@Entity
@Table(name = "foods")
public class Food {
	public Food() {
	}

	public Food(String name) {
		this.name = name;
	}
	
	@Id
	@GeneratedValue( strategy=GenerationType.AUTO )
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

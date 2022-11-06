package com.elliscode.dumbphone_apps.food_diary.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.JsonObject;

@Entity
@Table(name = "foods")
public class Food {
	public Food() {
		name = "";
		hash = createHash();
	}

	public Food(String name) {
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
	@Column(name = "mass")
	private double mass;
	@Column(name = "calories")
	private double calories;
	@Column(name = "carbs")
	private double carbs;
	@Column(name = "fats")
	private double fats;
	@Column(name = "protein")
	private double protein;
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

	public double getMass() {
		return mass;
	}

	public void setMass(double mass) {
		this.mass = mass;
	}

	public double getCalories() {
		return calories;
	}

	public void setCalories(double calories) {
		this.calories = calories;
	}

	public double getCarbs() {
		return carbs;
	}

	public void setCarbs(double carbs) {
		this.carbs = carbs;
	}

	public double getFats() {
		return fats;
	}

	public void setFats(double fats) {
		this.fats = fats;
	}

	public double getProtein() {
		return protein;
	}

	public void setProtein(double protein) {
		this.protein = protein;
	}	
}

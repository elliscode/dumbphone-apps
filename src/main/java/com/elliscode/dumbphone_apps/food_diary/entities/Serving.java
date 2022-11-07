package com.elliscode.dumbphone_apps.food_diary.entities;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "servings")
public class Serving {
	public Serving() {
	}
	
	public Serving(Food food, String name) {
		this.food = food;
		this.name = name;
		this.quantity = 1;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "hash")
	private UUID hash;

	@ManyToOne
	@JoinColumn(name = "food_hash")
	private Food food;
	
	@Column(name = "name")
	private String name;

	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "calories")
	private double calories;
	
	@Column(name = "carbs")
	private double carbs;
	
	@Column(name = "fats")
	private double fats;
	
	@Column(name = "protein")
	private double protein;
	
	@Column(name = "alcohol")
	private double alcohol;

	public UUID getHash() {
		return hash;
	}

	public void setHash(UUID hash) {
		this.hash = hash;
	}

	public Food getFood() {
		return food;
	}

	public void setFood(Food food) {
		this.food = food;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
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

	public double getAlcohol() {
		return alcohol;
	}

	public void setAlcohol(double alcohol) {
		this.alcohol = alcohol;
	}
}

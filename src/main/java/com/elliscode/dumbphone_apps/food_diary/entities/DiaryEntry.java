package com.elliscode.dumbphone_apps.food_diary.entities;

import java.util.Date;
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
@Table(name = "diary_entries")
public class DiaryEntry {
	public DiaryEntry() {
		user = new User();
		food = new Food();
		timeStamp = new Date();
	}
	
	public DiaryEntry(User user, Food food) {
		this.user = user;
		this.food = food;
		timeStamp = new Date();
	}
	
	@Id
	@GeneratedValue( strategy=GenerationType.AUTO )
	@Column(name = "hash")
	private UUID hash;
	
	@ManyToOne
    @JoinColumn(name = "user_hash")
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "food_hash")
    private Food food; 
	
	@Column(name = "time_stamp")
	private Date timeStamp;
	
	public UUID getHash() {
		return hash;
	}

	public void setHash(UUID hash) {
		this.hash = hash;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Food getFood() {
		return food;
	}

	public void setFood(Food food) {
		this.food = food;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	@Override
	public String toString() {
		return "\n[" + "User: " + user.getName() + ", " + "Food: " + food.getName() + ", " + "Timestamp: " + timeStamp.toString() + "]";
	}
}

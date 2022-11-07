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

import org.hibernate.annotations.Formula;

@Entity
@Table(name = "diary_entries")
public class DiaryEntry {
	public DiaryEntry() {
	}

	public DiaryEntry(User user, Serving serving) {
		this.user = user;
		this.serving = serving;
		this.servingQuantity = 1;
		timeStamp = new Date();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "hash")
	private UUID hash;

	@ManyToOne
	@JoinColumn(name = "user_hash")
	private User user;

	@ManyToOne
	@JoinColumn(name = "serving_hash")
	private Serving serving;

	@Column(name = "serving_quantity")
	private double servingQuantity;

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

	public Serving getServing() {
		return serving;
	}

	public void setServing(Serving serving) {
		this.serving = serving;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(Date timeStamp) {
		this.timeStamp = timeStamp;
	}

	public double getServingQuantity() {
		return servingQuantity;
	}

	public void setServingQuantity(double servingQuantity) {
		this.servingQuantity = servingQuantity;
	}

	@Override
	public String toString() {
		return "\n[" + "User: " + user.getName() + ", " + "Food: " + serving.getFood().getName() + ", " + "Timestamp: "
				+ timeStamp.toString() + "]";
	}
}

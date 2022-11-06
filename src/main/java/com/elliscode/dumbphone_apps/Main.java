package com.elliscode.dumbphone_apps;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.elliscode.dumbphone_apps.food_diary.repositories.UserRepository;

@EnableAutoConfiguration
@SpringBootApplication
public class Main {
    @Autowired UserRepository fdr;
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}
}
package com.elliscode.dumbphone_apps.food_diary.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elliscode.dumbphone_apps.food_diary.entities.User;

public interface UserRepository extends JpaRepository<User, UUID> {
	List<User> findByNameEquals(String name);
}

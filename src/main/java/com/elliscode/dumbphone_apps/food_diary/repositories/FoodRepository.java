package com.elliscode.dumbphone_apps.food_diary.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elliscode.dumbphone_apps.food_diary.entities.Food;

public interface FoodRepository extends JpaRepository<Food, UUID>  {
	List<Food> findByNameEquals(String name);
	List<Food> findByNameContaining(String query);
}

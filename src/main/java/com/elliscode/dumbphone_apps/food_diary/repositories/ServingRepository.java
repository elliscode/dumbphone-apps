package com.elliscode.dumbphone_apps.food_diary.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elliscode.dumbphone_apps.food_diary.entities.Serving;

public interface ServingRepository extends JpaRepository<Serving, UUID> {
	List<Serving> findByFoodHashEquals(UUID foodHash);
}

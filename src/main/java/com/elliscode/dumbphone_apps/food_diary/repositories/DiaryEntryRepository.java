package com.elliscode.dumbphone_apps.food_diary.repositories;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elliscode.dumbphone_apps.food_diary.entities.DiaryEntry;

public interface DiaryEntryRepository extends JpaRepository<DiaryEntry, UUID> {
	List<DiaryEntry> findByUserHashEquals(UUID userHash);
	List<DiaryEntry> findByUserHashEqualsAndTimeStampBetween(UUID userHash, Date start, Date end);
}

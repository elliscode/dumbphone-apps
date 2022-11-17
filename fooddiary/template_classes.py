from fooddiary.models import Food, DiaryEntry
import json


class TemplateEntry:
    def __init__(self, diary_entry: DiaryEntry):
        self.hash = diary_entry.hash
        self.quantity = diary_entry.quantity
        self.food = TemplateFood(diary_entry.food)
        self.time_stamp = diary_entry.time_stamp


class TemplateFood:
    def __init__(self, food: Food):
        self.hash = food.hash
        self.name = food.name
        self.metadata = json.loads(food.metadata)

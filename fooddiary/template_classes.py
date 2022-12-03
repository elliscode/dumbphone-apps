from fooddiary.models import Food, DiaryEntry
import json


class TemplateEntry:
    def __init__(self, diary_entry: DiaryEntry):
        self.hash = diary_entry.hash
        self.quantity = diary_entry.quantity
        self.serving = diary_entry.serving
        self.food = TemplateFood(diary_entry.food)
        self.time_stamp = diary_entry.time_stamp

        # determine what serving you are using
        self.derived_values = self.food.get_serving(self.serving, self.quantity)

    def to_dict(self):
        return {'hash': self.hash,
                'quantity': self.quantity,
                'food': self.food.to_dict(),
                'time_stamp': self.time_stamp,
                'derived_values': self.derived_values.to_dict()}


class TemplateFood:
    def __init__(self, food: Food):
        self.hash = food.hash
        self.name = food.name
        self.metadata: TemplateMetadata = TemplateMetadata(food.metadata)

    def to_dict(self):
        return {'hash': self.hash,
                'name': self.name,
                'metadata': self.metadata.to_dict(), }

    def get_serving(self, serving_name, diary_quantity):
        serving = self.metadata.get_serving(serving_name)
        return TemplateDerivedValues(food=self, serving=serving, quantity=diary_quantity)


class TemplateServing:
    def __init__(self, calories=None, serving=None):
        if calories is not None:
            self.multiplier = float(1)
            self.amount = calories
            self.name = 'kcal'
        elif serving is not None:
            self.multiplier = float(serving.get('multiplier', 1))
            self.amount = serving.get('amount', 1)
            self.name = serving.get('name', 'undefined')
        else:
            self.multiplier = float(1)
            self.amount = 1
            self.name = 'serving'

    def to_dict(self):
        return {'multiplier': self.multiplier,
                'amount': self.amount,
                'name': self.name}


class TemplateDerivedValues:
    def __init__(self, food: TemplateFood, serving: TemplateServing, quantity: float):
        self.calories = food.metadata.calories * serving.multiplier * quantity
        self.protein = food.metadata.protein * serving.multiplier * quantity
        self.fat = food.metadata.fat * serving.multiplier * quantity
        self.carbs = food.metadata.carbs * serving.multiplier * quantity
        self.alcohol = food.metadata.alcohol * serving.multiplier * quantity
        self.caffeine = food.metadata.caffeine * serving.multiplier * quantity

    def to_dict(self):
        return {'calories': self.calories,
                'protein': self.protein,
                'fat': self.fat,
                'carbs': self.carbs,
                'alcohol': self.alcohol,
                'caffeine': self.caffeine, }


class TemplateMetadata:
    def __init__(self, string: str, serving: TemplateServing = None, ):
        metadata = json.loads(string)
        self.calories: float = float(metadata.get('calories', 0))
        self.protein: float = float(metadata.get('protein', 0))
        self.fat: float = float(metadata.get('fat', 0))
        self.carbs: float = float(metadata.get('carbs', 0))
        self.alcohol: float = float(metadata.get('alcohol', 0))
        self.caffeine: float = float(metadata.get('caffeine', 0))
        self.servings = {}
        if serving is not None:
            self.servings[serving.name] = serving
        else:
            for servingItem in metadata.get('servings', []):
                item = TemplateServing(serving=servingItem)
                self.servings[item.name] = item
            if not self.servings:
                self.servings['serving'] = TemplateServing()

    def to_dict(self):
        return {'calories': self.calories,
                'protein': self.protein,
                'fat': self.fat,
                'carbs': self.carbs,
                'alcohol': self.alcohol,
                'caffeine': self.caffeine,
                'servings': self.get_servings_as_dict_array(), }

    def get_servings_as_dict_array(self):
        output = []
        for key in self.servings:
            output.append(self.servings[key].to_dict())
        return output

    def get_serving(self, serving_name):
        serving: TemplateServing = self.servings.get(serving_name, None)
        if not serving:
            if 'kcal' == serving_name:
                serving = TemplateServing(calories=self.calories)
            else:
                serving = TemplateServing()
        return serving

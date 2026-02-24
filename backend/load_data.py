import json
import math
from database import SessionLocal, engine
from models import Recipe, Base


Base.metadata.create_all(bind=engine)

db = SessionLocal()

with open("recipes.json", "r", encoding="utf-8") as f:
    raw = json.load(f)

def clean(value):
    if isinstance(value, float) and math.isnan(value):
        return None
    return value

count = 0

for key, value in raw.items():
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except:
            continue

    if not isinstance(value, dict):
        continue

    recipe = Recipe(
        cuisine=value.get("cuisine"),
        title=value.get("title"),
        rating=clean(value.get("rating")),
        prep_time=clean(value.get("prep_time")),
        cook_time=clean(value.get("cook_time")),
        total_time=clean(value.get("total_time")),
        description=value.get("description"),
        nutrients=value.get("nutrients"),
        serves=value.get("serves"),
    )
    db.add(recipe)
    count += 1

db.commit()
db.close()

print(f"✅ Data loaded successfully: {count} records")
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from database import Base, engine
from models import Recipe
from database import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import text

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/api/recipes")
def get_recipes(page: int = 1, limit: int = 10):
    db: Session = SessionLocal()
    offset = (page - 1) * limit

    total = db.query(Recipe).count()
    recipes = (
        db.query(Recipe)
        .order_by(Recipe.rating.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": recipes
    }

@app.get("/api/recipes/search")
def search_recipes(
    title: str = None,
    cuisine: str = None,
    rating: float = None,
    time: int = None,
    calories: int = None,
    page: int = 1,
    limit: int = 10
):
    db = SessionLocal()
    query = db.query(Recipe)

    if title:
        query = query.filter(Recipe.title.ilike(f"%{title}%"))
    if cuisine:
        query = query.filter(Recipe.cuisine == cuisine)
    if rating is not None:
        query = query.filter(Recipe.rating >= rating)
    if time is not None:
        query = query.filter(text("COALESCE(total_time, 9999) <= :time").params(time=time))
    if calories is not None:
        query = query.filter(text("CAST(REGEXP_REPLACE(nutrients->>'calories', '[^0-9]', '', 'g') AS INTEGER) <= :calories").params(calories=calories))

    total = query.count()
    results = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": results
    }
@app.get("/api/recipes/all")
def get_all_recipes():
    db = SessionLocal()
    recipes = db.query(Recipe).limit(20).all()
    return recipes
@app.get("/api/debug/db-info")
def debug_db_info():
    db = SessionLocal()
    return {
        "db_file": engine.url.database,
        "total_records": db.query(Recipe).count()
    }

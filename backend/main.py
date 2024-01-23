from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)



@app.get("/search/{query}")
async def search_books(query: str):
    response = requests.get(f"https://openlibrary.org/search.json?q={query}&limit=20")
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Data not found")
    return response.json()


@app.get("/book/{book_id}")
async def book_details(book_id: str):
    response = requests.get(f"https://openlibrary.org/works/{book_id}.json")
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="Book not found")
    return response.json()


@app.get("/recommendations")
async def recommendations():
    try:
        with open('recommendations.json', 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")

from flask import Flask, Response
from flask_pymongo import PyMongo
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = PyMongo(app)

from app import views

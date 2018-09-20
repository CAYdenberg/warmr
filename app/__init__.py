from flask import Flask, Response
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# load dotenv in the base root
APP_ROOT = os.path.join(os.path.dirname(__file__), '..')   # refers to application_top
dotenv_path = os.path.join(APP_ROOT, '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
db = PyMongo(app)

from app import views

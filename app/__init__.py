from flask import Flask, Response

app = Flask(__name__)

from app import views

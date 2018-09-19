from app import app
from flask import render_template, request, url_for, jsonify
import os
import json


@app.route("/", methods=["GET"])
def index():
    js_entry = url_for('static', filename="main.js")
    css = url_for('static', filename="main.css")
    return render_template("index.html", js_entry=js_entry, css=css)

from app import app, mongo
from flask import render_template, url_for, jsonify


@app.route("/api/regions", methods=["GET"])
def regions():
    results = mongo.db.regions.find()
    regions = []
    for result in results:
        regions.append({
            "years1965to2017": result['years1965to2017'],
            "name": result['name']
        })
    return jsonify(regions)


@app.route("/", methods=["GET"])
def index():
    js_entry = url_for('static', filename="main.js")
    css = url_for('static', filename="main.css")
    return render_template("index.html", js_entry=js_entry, css=css)

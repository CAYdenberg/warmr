from app import app
app.config.from_object('config')

if __name__ == "__main__":
    app.run(load_dotenv=True, host="0.0.0.0")

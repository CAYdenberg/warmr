# warmr
Try to predict the future of climate change

## Contributing

### Requirements

- Nodejs 9
- npm 6
- Python 3
- Virtualenv 15
- A Mongo database you can read and write to somewhere (I use [mlab](https://mlab.com/))

### Quickstart Guide (MacOS and Linux - your Windows mileage may vary)

- Clone the repository `git clone https://github.com/CAYdenberg/warmr.git`
- `cd warmr`
- Create a new Python3 virtual environment somewhere `python3 -m venv /path/to/new/venv`
- Activate it `source /path/to/new/venv/bin/activate`
- Install python dependencies `pip install -r requirements.txt`
- Create a .env file to manage environment variables: `touch .env`
- Open .env with your favourite text editor and enter:

```
FLASK_DEBUG=1
JS_ROOT="http://localhost:5000/main.js"
MONGO_URI=mongodb://yourmongodblocationwithcredentials
```

- Save.
- Populate the database. `cd data && python clean_greenhouse_data.csv`
- `cd ..`
- Now try `flask run` and make sure the server comes up. Don't worry about how the site looks at this point, we haven't created assets yet.
- Install JavaScript dependencies `npm install`
- Run unit tests `npm test`
- Run the build process and make sure it works `npm run build`
- Start the development server `npm start`
- If it doesn't open automatically, open a new browser tab and visit `localhost:1234`

And we're off!

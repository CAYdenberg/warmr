import os
from dotenv import load_dotenv
import pandas as pd
import pymongo

load_dotenv()

df = pd.read_csv('greenhouse.csv', header=0)

df = df.dropna(subset=['Million tonnes of carbon dioxide'])
df = df.drop(axis=1, labels=['2017.1', '2006-16', '2017.2'])
df = df.rename(axis=1, mapper={'Million tonnes of carbon dioxide': 'Country'})
df = df.set_index('Country')

columns = list(df.columns.values)
df['years'] = df.apply(lambda row: tuple(row[c] for c in columns), axis=1)

connection = pymongo.MongoClient(os.environ.get('MONGO_URI'))
db = connection['warmr']

for index, row in df.iterrows():
    if "Total" in index:
        db.regions.update_one(
            {"name": index[6:]},
            {"$set": {"years1965to2017": row.years}},
            True
        )
    else:
        db.countries.update_one(
            {"name": index},
            {"$set": {"years1965to2017": row.years}},
            True
        )

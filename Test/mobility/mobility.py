import gramex.cache
import pandas as pd
import numpy as np

metrics = {
    'retail_and_recreation_percent_change_from_baseline': 'Retail_and_Recreation',
    'grocery_and_pharmacy_percent_change_from_baseline': 'Grocery_and_Pharmacy',
    'parks_percent_change_from_baseline': 'parks',
    'transit_stations_percent_change_from_baseline': 'Transit_Stations',
    'workplaces_percent_change_from_baseline': 'Workplaces',
    'residential_percent_change_from_baseline': 'Residential'
}
data = gramex.cache.open('google.csv', 'csv')
cols = ['country_region', 'date']
cols.extend(metrics.keys())
data = data[cols]

def google(handler):
    # TODO: date filter
    df = data.rename(columns=metrics)
    country = handler.argparse(country={'default': 'United Arab Emirates'})['country']
    df['date'] = pd.to_datetime(df['date'])
    if country != 'worldwide':
        df = df[df['country_region'] == country]
    df = df.groupby([pd.Grouper(key='date',freq='D'), 'country_region']).mean().reset_index()
    return {'data': df.to_json(orient='records')}

def google_insights(handler):
    df = data.rename(columns=metrics)
    df['date'] = pd.to_datetime(df['date'])
    conditions = [(data['date'] <= '2020-03-15'), 
              (data['date'] > '2020-03-16') & (data['date'] <= '2020-05-15'), 
              (data['date'] > '2020-05-15')]
    values = ['Before', 'During', 'After']
    df['type'] = np.select(conditions, values)
    country = handler.argparse(country={'default': 'United Arab Emirates'})['country']
    if country != 'worldwide':
        df = df[df['country_region'] == country]
    return {'data':df.to_json(orient='records')}

data1 = gramex.cache.open('apple_mobility.csv', 'csv')
cols = ['region','transportation_type', 'value']

def apple(handler):
    df = data1[cols]
    region = handler.argparse(region={'default': 'United Arab Emirates'})['region']
    if region!= 'worldwide':
        df = df[df['region']== region]
        return{'data1': df.to_json(orient='records')}




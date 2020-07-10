import gramex.cache
import pandas as pd

metrics = {
    'retail_and_recreation_percent_change_from_baseline': 'retail_and_recreation',
    'grocery_and_pharmacy_percent_change_from_baseline': 'grocery_and_pharmacy',
    'parks_percent_change_from_baseline': 'parks',
    'transit_stations_percent_change_from_baseline': 'transit_stations',
    'workplaces_percent_change_from_baseline': 'workplaces',
    'residential_percent_change_from_baseline': 'residential'
}
data = gramex.cache.open('data/google.csv', 'csv')
cols = ['country_region', 'date']
cols.extend(metrics.keys())
data = data[cols]




def google(handler):
    # TODO: date filter
    df = data.rename(columns=metrics)
    country = handler.argparse(country={'default': 'Afghanistan'})['country']
    df['date'] = pd.to_datetime(df['date'])
    if country != 'worldwide':
        df = df[df['country_region'] == country]
    df = df.groupby([pd.Grouper(key='date',freq='D'), 'country_region']).mean().reset_index()
    return {'data': df.to_json(orient='records')}

import gramex.cache
import pandas as pd
import numpy as np

data2 = gramex.cache.open('apple_dates.csv', 'csv')
cols = ['region', 'transportation_type', 'date', 'value']

def apple_insights(handler):
    df = data2[cols]
    df['date'] = pd.to_datetime(df['date'])
    conditions = [(df['date'] <= '2020-03-15'), 
              (df['date'] > '2020-03-16') & (df['date'] <= '2020-05-15'), 
              (df['date'] > '2020-05-15')]
    values = ['Before', 'During', 'After']
    df['type'] = np.select(conditions, values)
    region = handler.argparse(region={'default': 'Argentina'})['region']
    if region!= 'worldwide':
        df = df[df['region']== region]
    return {'data2':df.groupby('type').mean().reset_index()}
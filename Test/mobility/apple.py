import pandas as pd 

data = pd.read_csv('apple_mobility.csv')
df = data.groupby('transportation_type').mean().reset_index()
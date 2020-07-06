import pandas as pd


data = pd.read_csv("Global_Mobility_Report.csv")


def top_retail(args, handler):
    a = args[['country_region', 'retail_and_recreation']].groupby('country_region').mean().reset_index()
    data_1=a.nlargest(10, 'retail_and_recreation')
    return(data_1)

def top_grocery(args, handler):
    a = args[['country_region', 'grocery_and_pharmacy']].groupby('country_region').mean().reset_index()
    data_1=a.nlargest(10, 'grocery_and_pharmacy')
    return(data_1)

def top_parks(args, handler):
    a = args[['country_region', 'parks']].groupby('country_region').mean().reset_index()
    data_1=a.nlargest(10, 'parks')
    return(data_1)

def top_transit(args, handler):
    a = args[['country_region', 'transit_stations']].groupby('country_region').mean().reset_index()
    data_1=a.nlargest(10, 'transit_stations')
    return(data_1)

def top_workplaces(args, handler):
    a = args[['country_region', 'workplaces']].groupby('country_region').mean().reset_index()
    data_1=a.nlargest(10, 'workplaces')
    return(data_1)

def United_States(args, handler):
    h = args.loc[args['region']=='United States']
    return h

def top_categories(args, handler):
    a = args.drop(['country_region_code','sub_region_1','iso_3166_2_code', 'sub_region_2', 'census_fips_code'], axis=1)
    return a


def getdata(args, handler):
    category = handler.args('category', [])[0]
    data = args[['country_region', 'date', category]]
    # groupy
    # weekly
    # monthly
    return data


def filters(handler):
    categories = ['retail_and_recreation_percent_change_from_baseline',
                  'grocery_and_pharmacy_percent_change_from_baseline',
                  'parks_percent_change_from_baseline',
                  'transit_stations_percent_change_from_baseline',
                  'workplaces_percent_change_from_baseline',
                  'residential_percent_change_from_baseline'
                ]
    countries = data['country_region'].unique().tolist()
    return {'countries': countries, 'categories': categories}
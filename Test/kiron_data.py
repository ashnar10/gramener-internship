import pandas as pd 
import numpy as np 

data = read.pd('disaster_data.csv)
data.groupby("Name").sum().reset_index()
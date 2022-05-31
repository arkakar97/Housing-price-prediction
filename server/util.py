import pickle
import json
import numpy as np


__locality = None
__data_columns = None
__model = None

def get_estimated_price(locality,area,bhk,bathroom,furnishing,parking,status,transaction,type):
    try:
        loc_index = __data_columns.index(locality.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = area
    x[1] = bhk
    x[2] = bathroom
    x[3] = furnishing
    x[4] = parking
    x[5] = status
    x[6] = transaction
    x[7] = type
    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locality

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locality = __data_columns[8:]  # first 8 columns are sqft, bhk, bathroom, furnishing, parking, status, transaction, type

    global __model
    if __model is None:
        with open('./artifacts/delhi_home_prices_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_locality_names():
    return __locality

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_locality_names())
    print(get_estimated_price("uttam nagar",1000, 3, 3, 2, 2, 2, 1, 1))
    print(get_estimated_price("uttam nagar", 1000, 2, 2, 2, 2, 1, 1, 1))
    print(get_estimated_price("vasant kunj", 1500, 3, 2, 2, 2, 1, 1, 1))
    print(get_estimated_price("vasant kunj", 2000, 2, 2, 2, 2, 1, 1, 1))
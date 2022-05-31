from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_locality_names', methods=['GET'])
def get_locality_names():
    response = jsonify({
        'locality':util.get_locality_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response



@app.route('/predict_home_price', methods=['GET','POST'])
def predict_home_price():
    locality = request.form['locality']
    area = float(request.form['area'])
    bhk =int(request.form['bhk'])
    bathroom =int(request.form['bathroom'])
    furnishing =int(request.form['furnishing'])
    parking =int(request.form['parking'])
    status =int(request.form['status'])
    transaction =int(request.form['transaction'])
    type =int(request.form['type'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(locality,area,bhk,bathroom,furnishing,parking,status,transaction,type)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(host="localhost", port=8000, debug=True)

    


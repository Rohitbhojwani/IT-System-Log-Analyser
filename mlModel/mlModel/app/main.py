from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

current_directory = os.path.dirname(__file__)
model_path = os.path.join(current_directory, '..', 'kmeans_model.pkl')

# Load your trained model
# model = joblib.load('./kmeans_model.pkl')
model = joblib.load(model_path)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        # Assuming your model expects a feature named 'data'
        prediction = model.predict([data['data']])
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    print("Starting Flask application...")
    app.run(debug=True, host='0.0.0.0', port=5000)


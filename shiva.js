import React from 'react'
import requests
from flask import Flask, request, jsonify

app = Flask(_name_)

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')
    numbers = set()

    for url in urls:
        try:
            response = requests.get(url, timeout=0.5)
            if response.status_code == 200:
                data = response.json()
                if 'numbers' in data:
                    numbers.update(set(data['numbers']))
        except requests.exceptions.RequestException:
            pass

    sorted_numbers = sorted(numbers)
    return jsonify({'numbers': sorted_numbers})

if _name_ == '_main_':
    app.run(port=8008)
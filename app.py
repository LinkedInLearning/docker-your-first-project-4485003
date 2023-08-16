from flask import Flask, request, url_for, redirect, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('Product-List.html')
# def product_list():
#     return render_template('Product-List.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
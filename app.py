from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Cart.html')
def cart():
    return render_template('Cart.html')

@app.route('/Character-Detail-Blade.html')
def character_detail_blade():
    return render_template('Character-Detail-Blade.html')

@app.route('/Character-Detail-Delores.html')
def character_detail_delores():
    return render_template('Character-Detail-Delores.html')

@app.route('/Characters-by-Collection.html')
def characters_by_collection():
    return render_template('Characters-by-Collection.html')

@app.route('/Contact-Us.html')
def contact_us():
    return render_template('Contact-Us.html')

@app.route('/Product-Detail.html')
def product_detail():
    return render_template('Product-Detail.html')

@app.route('/Product-List-Search-Results.html')
def product_list_search_results():
    return render_template('Product-List-Search-Results.html')

@app.route('/Product-List.html')
def product_list():
    return render_template('Product-List.html')

@app.route('/Static-About.html')
def static_about():
    return render_template('Static-About.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
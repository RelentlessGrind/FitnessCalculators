import os
import logging
from flask import Flask, render_template

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "fitness-calculators-secret-key")

# Route definitions
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/1rm')
def one_rep_max():
    return render_template('1rm.html')

@app.route('/bmi')
def body_mass_index():
    return render_template('bmi.html')

@app.route('/bmr')
def basal_metabolic_rate():
    return render_template('bmr.html')

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('index.html'), 500

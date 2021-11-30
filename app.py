from flask import Flask
import os
import json
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<state>')
def getState(state):
    return render_template('{}.html'.format(state))


if __name__ == '__main__':
    app.run(debug=True)

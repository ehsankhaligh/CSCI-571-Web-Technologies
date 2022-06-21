# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python38_app]
# [START gae_python3_app]

#Example: https://gist.github.com/miguelgrinberg/5614326

from FinnhubStockAPI import *
from flask import jsonify, Flask
import datetime as dt
from datetime import datetime
import time


# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
#app = Flask(__name__)
app = Flask(__name__, static_folder='static')

'''
@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Hello World!'
'''

@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file('index.html')

'''
Rest API Example slides: retrieve the list of task
@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})
'''

@app.route("/api/v1.0/stock/company/<symbol>", methods=['GET'])
def apiCompanyTab(symbol):
    compTabJson = getCompanyTabJson(symbol)
    return jsonify({'compTabJson': compTabJson})

@app.route("/api/v1.0/stock/stocksum/<symbol>", methods=['GET'])
def apiStockSummaryTab(symbol):
    summaryTabJson = getStockSummaryTabJson(symbol)
    return jsonify({'summaryTabJson': summaryTabJson})

@app.route("/api/v1.0/stock/stocksumrec/<symbol>", methods=['GET'])
def apiStockSummaryRecTab(symbol):
    stockSummaryRecTabJson = getStockSummaryRecTabJson(symbol)
    return jsonify({'stockSummaryRecTabJson': stockSummaryRecTabJson})

@app.route("/api/v1.0/stock/charts/<symbol>", methods=['GET'])
def apiChartsTab(symbol):

    pastSixMonths = dt.datetime.now() - dt.timedelta(190) #past 190 days date
    timeNow = datetime.today()

    #print(timeNow.hour)
    #print(timeNow.minute)
    #print(timeNow.year)
    #print(timeNow.month)
    #print(timeNow.day)

    #print(pastSixMonths.hour)
    #print(pastSixMonths.minute)
    #print(pastSixMonths.year)
    #print(pastSixMonths.month)
    #print(pastSixMonths.day)

    # assigned regular string date
    #date_time = dt.datetime(2021, 7, 26, 21, 20)
    date_now = dt.datetime(timeNow.year, timeNow.month, timeNow.day, timeNow.hour, timeNow.minute, timeNow.second)
    date_past = dt.datetime(pastSixMonths.year, pastSixMonths.month, pastSixMonths.day, pastSixMonths.hour, pastSixMonths.minute, pastSixMonths.second)

    # print regular python date&time
    #print("date_time =>",date_now)

    # displaying unix timestamp after conversion
    #print("unix_timestamp => ",(int(time.mktime(date_now.timetuple()))))

    toUnix = int(time.mktime(date_now.timetuple()))
    fromUnix = int(time.mktime(date_past.timetuple()))

    chartsTabJson = getChartsTabJson(symbol, fromUnix, toUnix)
    return jsonify({'chartsTabJson': chartsTabJson})

@app.route("/api/v1.0/stock/news/<symbol>", methods=['GET'])
def apiLatestNewsTab(symbol):

    start_date = dt.datetime.now() - dt.timedelta(30) #past 30 days date
    toYYYYMMDD = datetime.today().strftime('%Y-%m-%d')
    fromYYYYMMDD = start_date.strftime('%Y-%m-%d')

    latestNewsTabJson = getLatestNewsTabJson(symbol, fromYYYYMMDD, toYYYYMMDD)
    return jsonify({'latestNewsTabJson': latestNewsTabJson})

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. You
    # can configure startup instructions by adding `entrypoint` to app.yaml.
    #http://127.0.0.1:8080/api/v1.0/stock/company/tsla
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python3_app]
# [END gae_python38_app]

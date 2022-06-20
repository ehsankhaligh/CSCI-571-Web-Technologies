'''
Base Line examples taken from https://realpython.com/python-requests/
my info:
https://stackabuse.com/python-string-interpolation-with-the-percent-operator/
'''
import datetime
import requests
import json

myToken = 'c7rgofaad3iel5ub9hrg'
noReturnValJson = {}

def getCompanyTabJson(symbol):
    # Company Tab https://finnhub.io/api/v1/stock/profile2?symbol=TSLA&token=c7rgofaad3iel5ub9hrg
    profileURL = "https://finnhub.io/api/v1/stock/profile2?symbol=%s&token=%s" % (symbol, myToken)
    #print(profileURL)

    try:
        getReq = requests.get(profileURL).json()

        cleanedJson = {}
        cleanedJson['logo'] = getReq['logo']
        cleanedJson['name'] = getReq['name']
        cleanedJson['ticker'] = getReq['ticker']
        cleanedJson['exchange'] = getReq['exchange']
        cleanedJson['ipo'] = getReq['ipo']
        cleanedJson['finnhubIndustry'] = getReq['finnhubIndustry']
        #print(cleanedJson)

        return cleanedJson

    except:
        return noReturnValJson

def getStockSummaryTabJson(symbol):
    # Stock Summary Tab https://finnhub.io/api/v1/quote?symbol=TSLA&token=c7rgofaad3iel5ub9hrg
    profileURL = "https://finnhub.io/api/v1/quote?symbol=%s&token=%s" % (symbol, myToken)
    #print(profileURL)

    try:
        getReq = requests.get(profileURL).json()
        getReq["symbol"] = symbol
        #print(getReq)
        return getReq
    except:
        return noReturnValJson

def getStockSummaryRecTabJson(symbol):
    # Stock Rec  https://finnhub.io/api/v1/stock/recommendation?symbol=TSLA&token=c7rgofaad3iel5ub9hrg
    profileURL = "https://finnhub.io/api/v1/stock/recommendation?symbol=%s&token=%s" % (symbol, myToken)
    #print(profileURL)

    try:
        getReq = requests.get(profileURL).json()
        #print(len(getReq))
        #print(getReq[0])
        return getReq[0]
    except:
        return noReturnValJson

def getChartsTabJson(symbol, fromUnix, toUnix):
    # https://finnhub.io/api/v1/stock/candle?symbol=TSLA&resolution=1&from=1631022248&to=1631627048&token=c7rgofaad3iel5ub9hrg
    profileURL = "https://finnhub.io/api/v1/stock/candle?symbol=%s&resolution=D&from=%s&to=%s&token=%s" % (symbol, fromUnix, toUnix, myToken)
    #print(profileURL)

    try:
        getReq = requests.get(profileURL).json()
        cleanedJson = {}
        cleanedJson['t'] = getReq['t']
        cleanedJson['c'] = getReq['c']
        cleanedJson['v'] = getReq['v']
        cleanedJson["symbol"] = symbol
        #print(cleanedJson)

        return cleanedJson
    except:
        return noReturnValJson

def getLatestNewsTabJson(symbol, fromYYYYMMDD, toYYYYMMDD):
    # Latest News Tab  https://finnhub.io/api/v1/company-news?symbol=TSLA&from=2021-09-01&to=2021-09-09&token=c7rgofaad3iel5ub9hrg
    profileURL = "https://finnhub.io/api/v1/company-news?symbol=%s&from=%s&to=%s&token=%s" % (symbol, fromYYYYMMDD, toYYYYMMDD, myToken)
    print(profileURL)

    try:
        getReq = requests.get(profileURL).json()
        cleanedJson = {}
        count=0

        #print("*********start*********")
        for x in range(len(getReq)):

            if count == 5:
                #print("*********stop*********")
                break
            #print("loop count x: ", x)
            #print("len(getReq):", len(getReq))

            if (getReq[x]['image'] != '' and getReq[x]['headline'] != '' and getReq[x]['datetime'] != '' and getReq[x]['url'] != '' ):

                nestedJson = {}
                #print("count:", count)
                #print(getReq[x]['image'])
                #print(getReq[x]['headline'])
                #print(getReq[x]['datetime'])
                #print(getReq[x]['url'])
                #print("---------------------------")

                nestedJson['image'] = getReq[x]['image']
                nestedJson['headline'] = getReq[x]['headline']
                nestedJson['datetime'] = getReq[x]['datetime']
                nestedJson['url'] = getReq[x]['url']

                cleanedJson[str(count)] = nestedJson

                count = count + 1

        #print(cleanedJson)

        return cleanedJson
    except:
        return noReturnValJson


#if __name__ == "__main__":
    #getCompanyTabJson('TSLA')
    #getStockSummaryTabJson('TSLA')
    #getStockSummaryRecTabJson('TSLA')
    #getChartsTabJson('TSLA', '1631022248', '1631627048')
    #getLatestNewsTabJson('TSLA', '2021-09-01', '2021-09-09')

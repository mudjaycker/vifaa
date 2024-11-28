import collections 
import sys
if sys.version_info.major == 3 and sys.version_info.minor >= 10:
    from collections.abc import MutableSet
    collections.MutableSet = collections.abc.MutableSet
else: 
    from collections import MutableSet
# creating a Flask app 
from flask import Flask, jsonify, request 
from flask_cors import CORS
app = Flask(__name__) 
CORS(app)
  
# on the terminal type: curl http://127.0.0.1:5000/ 
# returns hello world when we use GET. 
# returns the data that we send when we use POST. 
@app.route('/', methods = ['GET']) 
def home(): 
    if(request.method == 'GET'): 
  
        data = "hello world"
        return jsonify({'data': data})

if __name__ == '__main__': 
  
    app.run(debug = True)
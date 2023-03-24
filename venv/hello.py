from flask import Flask, redirect, url_for, request
from flask_cors import CORS
from flask_restful import reqparse, Api, Resource
from app.cnn import CNN
from app.products import products
import numpy as np
from psycopg2.extensions import register_adapter, AsIs
import json
import os
import psycopg2
from datetime import datetime
import time
from PIL import Image

app = Flask(__name__)
CORS(app)
api = Api(app)
cnn = CNN()

conn = psycopg2.connect("postgresql://postgres:password@localhost:3001/postgres")
cur = conn.cursor()

parser = reqparse.RequestParser()
parser.add_argument('task')

'''class Message(Resource):
    def post(self):
        return {"message": 'Hello World'}
api.add_resource(Message, '/api/image')'''


@app.route("/api",methods=["POST", "GET"])
def predict():
    
    if request.method == 'POST':

        startTime = time.time()
        
        data = request.files['image']

        image = Image.open(data)

        image2 = np.array(list(image.tobytes()), dtype=np.uint8).reshape(48,64,3)

        image3 = np.array([image2]).astype(np.float32)
        image3 = image3/255

        pred = cnn.model.predict(image3)

        print("\n", "\n".join(list(map( lambda iv: "%s: %s" % (iv[1], (products[iv[0]].split("\n", 1))[0]), enumerate(pred[0])))), "\n")
        barcodes = [np.argmax(pred[0])]

        results = []

        for code in barcodes:
            prod = products.get(code)
            if prod:
                results.append({ 'code': int(code), 'description': prod })
        
        max_pred = max(max(pred.tolist()))

        endTime = time.time()

        finalTime = endTime - startTime
        
        cur.execute('INSERT INTO searchresults (file_name, response_timestamp, barcode, response_text, probability, request_duration)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            (data.filename,
             datetime.now(),
             barcodes[0].item(),
             results[0]['description'],
             max_pred,
             finalTime)
            )
        conn.commit()
        cur.close()
        conn.close()

        #print("data", data.filename, "res[0][desc]", results[0]['description'], "barcodes", type(barcodes[0].item()), barcodes[0], "max_pred", type(max_pred))
        
        return(json.dumps(results) + "\n", 200)
    
    else:
        cur.execute("SELECT * FROM searchresults")

        records = cur.fetchall()
        print(records)

        '''cur.close()
        conn.close()'''
        return(records)
    

if __name__ == '__main__':
   app.run(debug = True)
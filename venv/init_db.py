import os
import psycopg2
from datetime import datetime

conn = psycopg2.connect("postgresql://postgres:password@localhost:3001/postgres")

cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS searchresults;')
cur.execute('CREATE TABLE searchresults (id serial PRIMARY KEY,'
                                 'file_name varchar (100) NOT NULL,'
                                 'response_timestamp timestamp NOT NULL,'
                                 'barcode integer NOT NULL,'
                                 'response_text text,'
                                 'probability decimal,'
                                 'request_duration decimal);'
                                 )

'''cur.execute('INSERT INTO searchresults (file_name, response_timestamp, barcode, response_text, probability, request_duration)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('image1.png',
             datetime.now(),
             1234,
             'Moto keks',
             0.95,
             0.1)
            )


cur.execute('INSERT INTO searchresults (file_name, response_timestamp, barcode, response_text, probability, request_duration)'
            'VALUES (%s, %s, %s, %s, %s)',
            ('image31.jpg',
             datetime.now(),
             999,
             'Domacica',
             0.89,
             0.003)
            )'''

conn.commit()

cur.execute("SELECT * FROM searchresults")

records = cur.fetchall()

print(records)

cur.close()
conn.close()
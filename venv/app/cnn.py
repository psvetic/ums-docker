from tensorflow import keras
import os
import tensorflow as tf
from app.products import products

class CNN():
	def __init__(self):
		mf = './savedmodel.h5'
		self.model = keras.models.load_model(mf)
		

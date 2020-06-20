import math

# dp = [[0 for x in range(4+1)]  
#              for y in range(4+1)] 

# print(dp)

# arr = [1,5,9,2]
# cpy = arr.copy()
# cpy.sort()
# # rev = cpy.copy()
# rev = cpy[::-1]
# print(arr)
# print(cpy)
# print(rev)

import math
import os
import random
import re
import sys
import pickle

filename = 'spam-sms-mnb-model.pkl'
classifier = pickle.load(open(filename, 'rb'))
cv = pickle.load(open('cv-transform.pkl','rb'))

st = sys.argv[1]

data = [st]
vect = cv.transform(data).toarray()
my_prediction = classifier.predict(vect)
print('Not a spam message') if my_prediction==0 else print('Spam message')
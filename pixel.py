from PIL import Image
from numpy import *

thresh = 100
fn = lambda x : 255 if x < thresh else 0
i = Image.open('image.jpg').convert('L').point(fn, mode='1').resize((20,20))
try:
	i.save('thumbnail.jpg')
except IOError:
	print('failed to save')
iar = asarray(i).astype(int)
set_printoptions(threshold=inf)

print(repr(iar))
# p = map(lambda x: ''.join(str(x)), iar)
# for r in p:
# 	print(r)
# print(p.shape)
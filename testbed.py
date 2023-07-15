import datetime
import time

print(str(datetime.datetime.now().strftime("%a, %d %b %Y %H:%M:%S GMT")))
print(time.strftime("%a, %d %b %Y %H:%M:%S GMT", time.gmtime(time.time() + (4 * 30 * 24 * 60 * 60))))
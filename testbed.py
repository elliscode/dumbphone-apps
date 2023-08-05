import time

item = '2023-07-16 04:27:03-04'
print(item)
date_string = time.strftime('%Y-%m-%d', time.strptime(item, '%Y-%m-%d %H:%M:%S-04'))
print(date_string)
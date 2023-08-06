import time
import re

item = '2023-07-16 04:27:03-04'
print(item)
date_string = time.strftime('%Y-%m-%d', time.strptime(item, '%Y-%m-%d %H:%M:%S-04'))
print(date_string)
print(time.mktime(time.strptime(item, '%Y-%m-%d %H:%M:%S-04')))

result = re.search(r"a ([a-z]) c", "test\na w c\nmore")
print(result)
print(result.group(1))

print(re.compile('^\\+1\\d{10}$').match('+17325676361'))

# result = re.search(r"Reply ([0-9]+): Ack", msg_text)
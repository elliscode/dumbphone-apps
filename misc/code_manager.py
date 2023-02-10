import random
import secrets
import string
import re


def generate_verification_code():
    letters = re.sub('[AEGIOSU]', '', string.ascii_uppercase)
    numbers = re.sub('[015]', '', string.digits)
    first_three = ''.join(secrets.choice(letters) for i in range(3))
    next_two = ''.join(secrets.choice(numbers) for i in range(2))
    last_one = ''.join(secrets.choice(letters) for i in range(1))
    return first_three + next_two + last_one

def generate_numeric_verification_code():
    return ''.join(secrets.choice(string.digits) for i in range(7))

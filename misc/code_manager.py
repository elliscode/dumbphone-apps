import random
import secrets
import string


def generate_verification_code():
    letters = string.ascii_uppercase.replace('O', '').replace('S', '').replace('I', '')
    numbers = string.digits.replace('0', '').replace('5', '').replace('1', '')
    first_three = ''.join(secrets.choice(letters) for i in range(3))
    next_two = ''.join(secrets.choice(numbers) for i in range(2))
    last_one = ''.join(secrets.choice(letters) for i in range(1))
    return first_three + next_two + last_one

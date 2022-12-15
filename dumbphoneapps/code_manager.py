import random
import secrets
import string


def generate_verification_code():
    letters_and_numbers = string.ascii_uppercase + string.digits.replace('0', '')
    return ''.join(secrets.choice(letters_and_numbers) for i in range(6))

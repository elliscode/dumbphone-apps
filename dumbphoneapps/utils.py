import phonenumbers
from phonenumbers import NumberParseException, PhoneNumber


def parse_phone_number(phone_number_string):
    try:
        phone: PhoneNumber = phonenumbers.parse(phone_number_string, 'US')
        if not phonenumbers.is_possible_number(phone):
            raise Exception('invalid phone number')
    except NumberParseException as e:
        return None
    return phone

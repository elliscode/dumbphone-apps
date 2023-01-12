import unittest

from misc.code_manager import generate_verification_code


class TestStringMethods(unittest.TestCase):

    def test_codes(self):
        for i in range(100):
            print(generate_verification_code())


if __name__ == '__main__':
    unittest.main()

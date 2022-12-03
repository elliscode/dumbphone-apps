from fooddiary.template_classes import TemplateServing


def parse_serving(serving_string: str):
    output = TemplateServing()
    parts = serving_string.split(" ", 1)
    try:
        value = float(parts[0])
        output.amount = value
        output.name = parts[1]
    except:
        print('Invalid serving ' + serving_string)
    return output

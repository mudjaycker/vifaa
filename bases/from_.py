from .consts import numbers_map
from functools import reduce

inverted_map: dict[str, int] = {v: k for k, v in numbers_map.items()}

# x = reduce(lambda acc="", i="": i + acc, "buntu")
# print(x)


def from_base(number: str | int, base: int = 2):
    result = 0
    number = str(number).replace(" ", "").upper()
    limited_range = [v.upper() for k, v in numbers_map.items() if k > 0 and k < base]

    for n in number.upper():
        if n not in limited_range:
            raise ValueError(f"'{n}' from '{number}' is not in {limited_range}")

    number = reduce(lambda acc="", i="": i + acc, number)  # reverse chars

    for i, v in enumerate(number):
        char = int(inverted_map[v])
        result += char * (base**i)
    return result


# print(from_base("309b 66f6 88bf ad72", 16)) # /=> 3502506344252943730
# print(from_base("87", 9))

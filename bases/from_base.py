from consts import numbers_map

inverted_map = {v: k for k, v in numbers_map.items()}


def from_base(number: str, base: int = 2) -> int:
    result = 0
    number = number.replace(" ", "")
    number = reversed([i for i in number.upper()])
    for i, v in enumerate(number):
        char = int(inverted_map[v])
        result += char * (base**i)
    return result


# print(from_base("309b 66f6 88bf ad72", 16)) # /=> 3502506344252943730

from consts import numbers_map

inverted_map = {v: k for k, v in numbers_map.items()}


def from_base(number: str, base: int = 2) -> int:
    result = 0
    number = reversed([i for i in number.upper()])
    for i, v in enumerate(number):
        char = int(inverted_map[v])
        result += char * (base**i)
    return result


# print(from_base("1B", 16)) # /=> 27

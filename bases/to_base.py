from const import numbers_map


def to_base(number: int, base: int = 2) -> str:
    tab = []
    temp = number
    result = ""
    if number == 0:
        return "0"
    while temp > 0:
        mod = temp % base
        temp //= base
        mod = numbers_map[mod]
        result = mod + result

    return result


# number = 27
# print(to_base(number, 16))  # /=> 1B
# print(to_base(number, 2))  # /=> 11011

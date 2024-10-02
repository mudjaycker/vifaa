from consts import numbers_map


def to_base(number: int, base: int = 2) -> str:
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


number = 62_908_919_851_366
print(to_base(number, 36))  # /=> MARYIMANA

from string import ascii_uppercase


def to_base(number: int, base: int = 2) -> str:
    tab = []
    temp = number
    _ = {k + 10: v for k, v in enumerate(ascii_uppercase)}
    hexa_map = {i: str(i) for i in range(1, 10)}
    hexa_map.update(_)
    if number == 0:
        return "0"
    while temp > 0:
        mod = temp % base
        temp //= base
        mod = hexa_map[mod] if base > 15 else str(mod)
        tab.append(mod)

    result = "".join(reversed(tab))
    return result


number = 279
print(to_base(number, 27))  # /=> 1B
print(to_base(number, 2))  # /=> 11011

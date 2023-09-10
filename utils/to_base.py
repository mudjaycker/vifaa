from string import ascii_uppercase

def to_base(number: int, base: int = 2) -> str:
    tab = []
    temp = number
    numbers_map = {i: str(i) for i in range(10)} \
                   | {k + 10: v for k, v in enumerate(ascii_uppercase)}

    if number == 0:
        return "0"
    while temp > 0:
        mod = temp % base
        temp //= base
        mod = numbers_map[mod]
        tab.append(mod)

    result = "".join(reversed(tab))
    return result


number = 27
print(to_base(number, 5))  # /=> 1B
print(to_base(number, 2))  # /=> 11011
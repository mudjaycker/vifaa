from const import numbers_map

numbers_map = {v: k for k, v in numbers_map.items()}

def from_base(number:str, base:int=2) -> int:
    result = 0
    number = reversed([i for i in number])
    for i,v in enumerate(number):
        char = int(numbers_map[v])
        result += (char*(base**i))
    print(result)

from_base("1B", 16)
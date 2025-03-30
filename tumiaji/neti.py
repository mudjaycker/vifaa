import math
x = "mouana"
y = "moana"


def neti(x: str, y: str):
    len_x = len(x)
    len_y = len(y)
    target_len = len_x  # type:ignore
    len_diff = abs(len_x - len_y)
    acc = 0

    if len_x > len_y:
        y += "*" * len_diff
    elif len_y > len_x:
        x += "*" * len_diff
        target_len = len_y  # type:ignore


    for i, v in enumerate(x):
        if v == y[i]:
            acc += 1 / (target_len)
            # acc =  math.ceil(acc)
    return acc


print(neti(x, y))

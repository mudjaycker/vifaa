def factoriser(inputed: int):
    interval = range(inputed, 1, -1)
    i = 0
    j = 0

    for q in interval:
        p = inputed // q
        if p * q == inputed:
            i += 1
            j += 0.5
            if j == i // 2:
                yield (int(p), q)
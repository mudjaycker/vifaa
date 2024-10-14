def factoriser(x: int):
    i = 0
    j = 0

    for q in range(x, 1, -1):
        p = x // q
        if p * q == x:
            i += 1
            j += 0.5
            if j == i // 2:
                yield (int(p), q)
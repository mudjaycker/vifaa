def base_2(number: int):
    results = []
    j = 0
    for i in range(number, -1, -1):
        j += 2**i
        if j <= number:
            results.append(i)
        else:
            j -= 2**i
    return results

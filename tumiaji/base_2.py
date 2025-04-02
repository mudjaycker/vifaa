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




number = 53
res = base_2(number)
to_print = " + ".join([f"2**{i}" for i in res])
test = sum([2**i for i in res])
print(f"{to_print=}\n{test=}\n\n")



bin_inputed = bin(number)[2:]
binlist = list(bin_inputed)[::-1]
gen_bin = (index for index, value in enumerate(binlist) if value == "1")

for binval in gen_bin[::-1]:
    print(f"2.power({binval}) = {2**binval}")
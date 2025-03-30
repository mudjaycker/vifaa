def maj(text:str, sep="."):
    texts = text.split(sep)
    result = ""
    print(text)
    for i in texts:
        i = i.strip()
        i = i.capitalize()
        i += sep + " "
        result += i
    return result.strip()
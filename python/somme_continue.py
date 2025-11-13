def somme_continue(n: int = 0):
    return (n * (n + 1)) // 2


def somme_interval(a: int=0, b: int=0):
    if not b:
        a,b = 0,a
        
    return somme_continue(b) - somme_continue(a - 1)
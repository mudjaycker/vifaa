from typing import Generator


def find_p_and_q(x: int) -> Generator[int, None, None]:
    results = []

    for q in range(1, x):
        p = x // q

        if (p * q) == x:
            if (elts := tuple(sorted((p, q)))) not in results:
                results.append(elts)

    return (i for i in results)

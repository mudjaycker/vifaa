import typing as t

T = t.TypeVar("T")
U = t.TypeVar("U")


def listify(data: dict[U, T] | t.Iterable[T]):
    if isinstance(data, dict):
        return list(data.values())
    else:
        return list(data)


def flat(items: t.Iterable[T] | dict[U, T]):
    results = []
    items = listify(items)

    for i in items:
        if isinstance(i, (list, set, tuple)):
            results.extend(flat(i))
        elif isinstance(i, dict):
            results.extend(flat(listify(i)))
        else:
            results.append(i)
    return results


x = [[i, j*2] for i,j in enumerate(range(10))]

print(flat(x))

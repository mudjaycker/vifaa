from typing import Iterable, TypeVar

T = TypeVar("T")
U = TypeVar("U")


def listify(data: Iterable[T] | dict[U, T]):
    if isinstance(data, dict):
        return list(data.values())  # type: ignore
    else:
        return list(data)


def flat(items: Iterable[T] | dict[U, T]) -> list[T]:
    results: list[T] = []
    items = listify(items)

    for i in items:
        if isinstance(i, (list, set, tuple)):
            results.extend(flat(i))  # type: ignore
        elif isinstance(i, dict):   
            results.extend(flat(listify(i)))  # type: ignore
        else:
            results.append(i)
    return results
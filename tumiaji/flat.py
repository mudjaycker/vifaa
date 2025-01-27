from typing import Iterable, TypeVar, Any

T = TypeVar("T")
U = TypeVar("U")


def listify(data: Iterable[T] | dict[U, T]):
    if isinstance(data, dict):
        return list(data.values())  # type: ignore
    else:
        return list(data)


def flat(items: Iterable[T] | dict[U, T]) -> list[Any]:
    results: list[Any] = []
    items = listify(items)

    for i in items:
        if isinstance(i, (list, set, tuple)):
            results.extend(flat(i))  # type: ignore
        elif isinstance(i, dict):
            results.extend(flat(listify(i)))  # type: ignore
        else:
            results.append(i)
    return results


obj: list[dict[str, Any]] = [
    {
        "a": {
            "b": {
                "c": 3,
            },
            "b2": {
                "c2": 8,
            },
        },
        "f": {
            "n": "nano",
        },
    },
    {
        "x": {
            "b": {
                "c": 9,
            },
            "z2": {
                "c2": 83,
            },
        },
        "f": {
            "n": "ohh",
        },
    },
]
t = flat(obj)
print(t)

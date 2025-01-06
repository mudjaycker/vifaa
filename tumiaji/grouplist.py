from typing import Iterable, Literal, TypeVar, Callable

number = int | float
_T = TypeVar("_T")
_U = TypeVar("_U")

true_range = lambda x=0, y=0, z=1: (
    range(1, x + 1, z) if x and not y else range(x, y + 1, z)
)
p = 0


def check(
    condition: _U,
    raise_: Exception = Exception,
    error_msg="Error condition not passed",
) -> _U:
    if condition:
        raise raise_(error_msg)


def group_numbers(elements: list[number], nums_by_sublist: int, overflow: bool = True):

    check(
        not isinstance(elements, Iterable),
        TypeError,
        f"elements should be an iterable but got a value of {type(elements)}",
    )
    check(
        not isinstance(nums_by_sublist, int),
        TypeError,
        f"nums_by_sublist should be an integer but got a value of {type(nums_by_sublist)}",
    )

    new_elements = []
    sub_elements = []
    sorted_elements = sorted(elements)

    for elt in sorted_elements:
        sub_elements.append(elt)
        if elt % nums_by_sublist == 0:
            new_elements.append(sub_elements)
            sub_elements = []

    if overflow:
        flat_elts = [i for j in new_elements for i in j]
        last_sub_elt = new_elements[-1]
        overflowed_elts = sorted_elements[len(flat_elts) - len(sorted_elements) :]
        last_sub_elt += overflowed_elts

    last_sub_elt = new_elements[-1]
    return new_elements


if __name__ == "__main__":
    # ---------------------------------- Exemple --------------------------------- #
    import datetime as dt
    import json

    from_ = dt.datetime(2023, 12, 31)
    to = dt.datetime(2024, 12, 31)
    days = (to - from_).days + 1
    range_days = list(range(days+1))
    groups = group_numbers(range_days, 7)
    _ = lambda weekday=0: from_ + dt.timedelta(days=weekday)
    calendar = list(
        map(
            lambda weekdays: [
                {_(weekday).isoweekday(): (_(weekday).day)} for weekday in weekdays
            ],
            groups,
        )
    )
    calendar = calendar[37]
    jsonified = json.dumps(calendar, indent=4)
    print(jsonified)


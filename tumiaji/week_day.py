from datetime import date as dt
import typing as t
import math


def get_weekday(date_: t.Iterable[int]):
    today = dt.today()
    td_weekday = today.weekday()
    target_date = dt(*date_)
    days = int(math.sqrt((today - target_date).days ** 2))  # always get a positif integer
    iterations = days % 7
    days_map = list(range(7))  # range from 0 to 6
    days_map = list(reversed(days_map)) if target_date < today else days_map
    result = (
        days_map[iterations] + td_weekday + 1
        if target_date < today
        else days_map[iterations] + td_weekday
    ) % 7
    return result


x = [1976, 5, 31]

print(get_weekday(x), dt(*x).weekday())


""" def days(date_from: t.Iterable[int], date_to: t.Iterable[int]):
    from_ = dt(*date_from)
    to = dt(*date_to)
    # years = to.year - from_.year
    bis_counter = 0
    months_map: dict[int, int] = {}

    for i in range(1, 8):
        if i % 2 == 0:
            months_map[i] = 30 if i != 2 else 28
        else:
            months_map[i] = 31

    for i in range(8, 13):
        if i % 2 == 0:
            months_map[i] = 31
        else:
            months_map[i] = 30

    for i in range(from_.year, to.year):
        if i % 4 == 0:
            bis_counter += 1

    month_days = [
        tuple(range(1, months_map[i] + 1)) for i in range(1, list(date_from)[1] + 1)
    ]

    month_days[-1] = month_days[-1][: list(date_from)[2]]

    result = 0
    for m in month_days:
        for i in m:
            result += 1

    return 
from_, to = [2010, 12, 1], [2012, 2, 4]

print(days(from_, to))
 """

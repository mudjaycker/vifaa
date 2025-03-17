from datetime import date as dt
import typing as t


def get_weekday(date_: t.Iterable[int]):
    today, td_weekday = dt.today(), dt.today().weekday()
    target_date = dt(*date_)
    days = abs((today - target_date).days)  # always get positif result
    iterations = days % 7
    days_map = list(range(7))  # range from 0 to 6
    days_map = list(reversed(days_map)) if target_date < today else days_map
    result = (
        days_map[iterations] + td_weekday + 1
        if target_date < today
        else days_map[iterations] + td_weekday
    ) % 7
    return result

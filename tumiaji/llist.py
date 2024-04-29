from typing import Any
from pprint import pprint
import inspect


class ArrayDict:
    def __init__(
        self,
        items: list[dict] = [],
        limit: int = None,
        unique_key=None,
        limit_error=False,
    ) -> None:
        self.items = items
        self.limit = limit
        self.unique_key = unique_key
        self.limit_error = limit_error

    def __has_value(self, values: str):
        bool_tab = []
        for item in self.items:
            bool_tab.append(values[self.unique_key] in item.values())
        return True in bool_tab

    def get(self, key: str):
        new_items = {key: []}
        for dico in self.items:
            value = dico.get(key)
            if value:
                new_items[key].append(value)
        return new_items

    def push(self, *values):
        for v in values:
            if self.unique_key and self.__has_value(v):
                raise ValueError(
                    f"'{self.unique_key}={v.get(self.unique_key)}' already exists"
                )
            if len(self.items) == self.limit:
                if self.limit_error:
                    raise IndexError(f"Cannot contain more than {self.limit} values")
                self.items.append(v)
                del self.items[0]

            else:
                self.items.append(v)

    def order_by(self, lookup: str):
        new_items = []
        sorted_values = []
        key = lookup.replace("-", "")
        for dico in self.items:
            value = dico.get(key)
            if value:
                sorted_values.append(value)

        sorted_values.sort()
        sorted_values = (
            reversed(sorted_values) if lookup.startswith("-") else sorted_values
        )
        for val in sorted_values:
            for dico in self.items:
                if val == dico[key]:
                    new_items.append(dico)
        return new_items

    def group_by(self, callback):
        new_items = {}
        lookup = inspect.getfullargspec(callback).args[0]
        for dico in self.items:
            value = dico.get(lookup)
            if value:
                new_key = callback(dico[lookup])
                if new_key not in new_items.keys():
                    new_items.update({new_key: [dico]})
                else:
                    new_items[new_key].append(dico)
        return new_items


if __name__ == "__main__":
    x = [
        {"name": "BUTOYI", "age": 17},
        {"name": "MARYIMANA", "age": 13},
    ]
    # {"name": "MARYIMANA", "age": 19}

    mylist = ArrayDict(x, unique_key="age", limit=4, limit_error=True)
    mylist.push(
        {"name": "MARYIMANAs", "age": 12},
        {"name": "MARYIMANAsu", "age": 19},
        {"name": "MARY", "age": 15},
    )
    # print(mylist.items)
    x2 = mylist.group_by(lambda name: "long_name" if len(name) > 6 else "short_name")
    pprint(mylist.items)
    print(x2)

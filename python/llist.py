from typing import Any, Sequence
import json, inspect


class UnicityError(Exception):
    pass

class ArrayDict[T]:
    def __init__(
        self,
        items: list[dict[str, T]] = [],
        limit: int = 0,
        unique_keys: Sequence[str] = [],
    ) -> None:
        
        if limit and len(items) > limit:
            raise OverflowError(f"Cannot contain more than {limit} values")
        
        self.limit = limit
        self.unique_keys = unique_keys
        self.items = [{"idx": i+1, **d} for i,d in enumerate(items)]

    def push(self, *values):
        uniques: list[dict[str, Any]] = []
        last_id = len(self.items)

        for v in values:
        # ------------------------------- check unicity ------------------------------ #
            if self.items:
                for it in self.items:
                    for u in self.unique_keys:
                        if v[u] == it[u]:
                            uniques.append({u: v[u]})

        if uniques:
            raise UnicityError(f"{uniques} already exist")
        # ------------------------------------ end ----------------------------------- #

        for v in values:
            last_id+=1
            self.items.append({"idx": last_id, **v})
            if self.limit and len(self.items) > self.limit:
                raise OverflowError(f"Cannot contain more than {self.limit} values")

    def order_by(self, lookup: str):
        key = lookup.replace("-", "")
        sorted_values = [value for dico in self.items if (value := dico.get(key))]

        sorted_values.sort()
        sorted_values = (
            reversed(sorted_values) if lookup.startswith("-") else sorted_values
        )

        new_items = [
            dico for val in sorted_values for dico in self.items if dico.get(key) == val
        ]
        return new_items

    def group_by(self, callback):
        new_items = {}
        lookups = inspect.getfullargspec(callback).args
        params = lambda dico: [dico[l] for l in lookups]

        for dico in self.items:
            if (new_key := callback(*params(dico))) not in new_items.keys():
                new_items.update({new_key: [dico]})
            else:
                new_items[new_key].append(dico)

        return new_items

    def __getitems(self, callback):
        lookups = inspect.getfullargspec(callback).args
        
        for index, item in enumerate(self.items):
            if callback(*[item.get(lookup) for lookup in lookups]):
                yield index, item

    def filter(self, callback):
        return [item for _, item in self.__getitems(callback)]

    def get(self, callback):
        try:
            return next(self.__getitems(callback))[1]
        except StopIteration:
            return None
    
    def last(self, callback):
        try:
            return self.filter(callback)[-1]
        except IndexError:
            return None

    def delete(self, callback):
        for i, _ in self.__getitems(callback):
            del self.items[i]

    def formated(self):
        return json.dumps(self.items, indent=2)

    def __str__(self):
        return self.formated()


# x = [
    # {"name": "rara", "age": 9},
    # {"name": "oki", "age": 45},
    # {"name": "waral", "age": 62},
    # {"name": "anna", "age": 11},
# ]

# y = ArrayDict(x)


# y.push({"name": "nane", "age": 8}, {"name": "ara", "age": 10}, {"name": "anny", "age": 11})
# print(y.get(lambda name: len(name) ==3))

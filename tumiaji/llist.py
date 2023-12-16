
from typing import Any


class ArrayDict(list):
    def __init__(self, items: list[dict] = [], limit: int = None, unique_key=None) -> None:
        self.items = items
        self.limit = limit
        self.unique_key = unique_key
        super(ArrayDict, self).__init__(self.items)
   
    def __has_key(self, values: str):
        bool_tab = []
        for item in  self.items:
            bool_tab.append(values[self.unique_key] in item.values())
        return True in bool_tab
    
    def __setattr__(self, __name: str, __value: Any) -> None:
        return super().__setattr__(__name, __value)    
   
    def get(self, key: str):
        new_items = {key: []}
        for dic in self.items:
            value = dic.get(key)
            if value:
                new_items[key].append(value)
        return new_items  
    
    def push(self, *values):
        
        for v in values:
            if self.unique_key and  self.__has_key(v):
                raise ValueError(f"Unicity Error '{self.unique_key}={v.get(self.unique_key)}' already exists")
            
            if len(self.items) == self.limit:
                self.items.append(v)
                del self.items[0]
                
            else:
                self.items.append(v)
    
    def order_by(self, lookup:str):
        new_items = []
        sorted_values = []
        key = lookup.replace("-","")
        for dic in self.items:
            value = dic.get(key)
            if value:
                sorted_values.append(value)
                
        sorted_values.sort()                
        sorted_values = reversed(sorted_values) if lookup.startswith("-") else sorted_values
        for val in sorted_values:
            for dic in self.items:
                if val == dic[key]:
                    new_items.append(dic)
        return new_items

x = [{"name": "BUTOYI", "age": 17}, {"name": "MARYIMANA", "age": 16}, {"name": "MARYIMANA", "age": 19}]
    def group_by(self, callback):
        new_items = {}
        def inner(lookup):
            for dic in self.items:
                value = dic.get(lookup)
                if value:
                    new_key = callback(dic[lookup])
                    if new_key not in new_items.keys():
                        new_items.update({new_key: [dic]})
                    else:
                        new_items[new_key].append(dic)
            return new_items
        return inner
x = [{"name": "BUTOYI", "age": 17}, {"name": "MARYIMANA", "age": 16},]
#{"name": "MARYIMANA", "age": 19}

# x1 = ListOfDict(x).group_by("age")
# print(x1)
# x2 = ListOfDict(x).group_by("name", lambda name: "long"if  len(name) > 6 else "short")
# print(x2)
x3 = ListOfDict(x).order_by("age")
print(x3)
            
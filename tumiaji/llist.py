
class LList:
    def __init__(self, limit:int, items:list=[]) -> None:
        self.items = items
        self.limit = limit
        
    def push(self, value):
        if len(self.items) == self.limit:
            self.items.insert(0, value)
            self.items.pop()
        else:
            self.items.insert(0, value)
    


class ListOfDict:
    def __init__(self, items: list[dict]) -> None:
        self.items = items
   
    def get(self, key: str):
        new_items = {key: []}
        for dic in self.items:
            value = dic.get(key)
            if value:
                new_items[key].append(value)
        return new_items
    
    def simple_group_by(self, key):
        new_items = {}
        value = None
        for d in self.items:
            value = d.get(key)
            if value:
                if value not in new_items.keys():
                    new_items.update({value: [d]})
                else:
                    new_items[value].append(d)
        return new_items
    
    def complex_group_by(self, lookup, callback):
        new_items = {}
        for dic in self.items:
            value = dic.get(lookup)
            if value:
                new_key = callback(dic[lookup])
                if new_key not in new_items.keys():
                    new_items.update({new_key: [dic]})
                else:
                    new_items[new_key].append(dic)
        return new_items
    
    def group_by(self,lookup,callback=None):
        if callback:
            return self.complex_group_by(lookup, callback)
        else:
            return self.simple_group_by(lookup)
    
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

# x1 = ListOfDict(x).group_by("age")
# print(x1)
# x2 = ListOfDict(x).group_by("name", lambda name: "long"if  len(name) > 6 else "short")
# print(x2)
x3 = ListOfDict(x).order_by("age")
print(x3)
            
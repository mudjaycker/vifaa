import sys
from typing import Any
from string import ascii_letters as letters


class sambura:
    def __init__(self, dico: dict[Any, Any]):
        """
        user = {

            "name of user": "john",

            "f_name": "Doe",

            "age": 26,

            "47th zone": "USA"

        }
        with Sambura(user): import f_name, age, name_of_user, _47th_zone

        print(name_of_user) #=> jonn

        print(age) #=> 26

        print(_47th_zone) #=> USA
        """
        self.dico = dico

    def __enter__(self):
        if not isinstance(self.dico, dict):
            self.dico = self.dico.__dict__

        temp_dict = {
            str(k).replace(" ", "_").replace("-", "_"): v for k, v in self.dico.items()
        }
        temp_dict2 = {}
        for k, v in temp_dict.items():
            first = str(k)[0]
            if first not in letters and first != "_":
                k = "_" + str(k)
                temp_dict2[k] = v
            else:
                temp_dict2[k] = v

        self.dico = temp_dict2
        del temp_dict, temp_dict2
        self.sysmodules = sys.modules
        sys.modules = self.dico
        return sys.modules

    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.modules = self.sysmodules

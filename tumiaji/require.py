import importlib.util
from importlib import import_module
import sys
from types import ModuleType
from pathlib import Path


class Require:
    def __init__(self, filename: str):
        """
        _ = Require(__file__)
        
        my_module = _.require("../../home/admin/Desktop/test.py")
        
        print(my_module.x)

        ######################## With sambura ###################################

        with sambura(_.require("../path/from/variables.py")): import x as var_1, y # type: ignore

        print(var_1)

        print(y)
        """
        self.filename = filename

    def require(self, path: str, module_name: str = "random_name"):

        fname = Path(self.filename).resolve()
        directory = Path(fname.parent, path).resolve()

        spec_loc = importlib.util.spec_from_file_location(module_name, directory)
        module = importlib.util.module_from_spec(spec_loc)
        sys.modules[module_name] = module
        spec_loc.loader.exec_module(module)
        # imported: ModuleType = __import__(module_name, globals(), locals(), ["*"], 0) #not advised by python documentation
        imported: ModuleType = import_module(module_name)
        del sys.modules[module_name]
        return imported

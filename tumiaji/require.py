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

    def get(self, path: str):

        fname = Path(self.filename).resolve()
        file_path = Path(fname.parent, path).resolve()
        module_name = file_path.name
        str_file_path = str(file_path).strip()
        str_file_path = str_file_path + '.py' if file_path.suffix != '.py' else str_file_path
        file_path = Path(str_file_path)

        if not file_path.is_file() and not file_path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")
        
        

        spec_loc = importlib.util.spec_from_file_location(module_name, file_path)
        module = importlib.util.module_from_spec(spec_loc)
        sys.modules[module_name] = module
        spec_loc.loader.exec_module(module)
        # imported: ModuleType = __import__(module_name, globals(), locals(), ["*"], 0) #not advised by python documentation
        imported: ModuleType = import_module(module_name)
        del sys.modules[module_name]
        return imported

#exemple
# require = Require(__file__).get
# y = require("./factoriser")

# print(next(y.factoriser(233)))

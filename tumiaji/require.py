import importlib.util
import sys
from types import ModuleType
from pathlib import Path


def require(file_name: str, path: str, module_name: str = "random_name"):
    """
    my_module = require(__file__, "../../home/admin/Desktop/test.py")
    print(my_module.x)

    ######################## With sambura ###################################

    with sambura(require(__file__, "../path/from/variables.py")): import x as var_1, y as var_2

    print(var_1) #=> 983

    print(var_2) #=> 32,66

    """
    fname = Path(file_name).resolve()
    directory = Path(fname.parent, path).resolve()

    # print(directory)
    spec_loc = importlib.util.spec_from_file_location(module_name, directory)
    module = importlib.util.module_from_spec(spec_loc)
    sys.modules[module_name] = module
    spec_loc.loader.exec_module(module)
    imported: ModuleType = __import__(module_name, globals(), locals(), ["*"], 0)
    del sys.modules[module_name]
    return imported
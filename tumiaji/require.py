import importlib.util
# from importlib import import_module
import sys
from types import ModuleType
from pathlib import Path


class Require:
    def __init__(self, filename: str):
        self.filename = filename

    def get(self, path: str):
        """Access your modules regardless of their location

        Example:

        require = Require(__file__).get

        my_module = require("../../home/my/path/test.py") # '.py' extension is optional.


        print(my_module.x)
        
        """

        fname = Path(self.filename).resolve()
        file_path = Path(fname.parent, path).resolve()
        module_name = file_path.name
        str_file_path = str(file_path).strip()
        str_file_path = str_file_path + '.py' if file_path.suffix != '.py' else str_file_path
        file_path = Path(str_file_path)

        if not file_path.is_file() or not file_path.exists():
            raise FileNotFoundError(f"File '{file_path}' not found")
        
        

        spec_loc = importlib.util.spec_from_file_location(module_name, file_path)
        module = importlib.util.module_from_spec(spec_loc)
        sys.modules[module_name] = module
        spec_loc.loader.exec_module(module)
        imported: ModuleType = __import__(module_name, globals(), locals(), ["*"], 0) #not advised by python documentation
        # imported: ModuleType = import_module(module_name)
        del sys.modules[module_name]
        return imported

#exemple
require = Require(__file__).get
y = require("./factoriser")
print(list(y.find_p_and_q(1998)))

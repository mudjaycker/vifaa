import sys
from typing import Optional, Any, TypedDict, Callable
from threading import Thread


class ArgDetails(TypedDict):
        function: Callable
        args: list[str]
        name: str
        required: bool = False

class Largue:
    def __init__(self, name: Optional[str] = None):
        self.cmd_name = name
        self.commands: dict = {}
        self.parsed = sys.argv[1:]
        self.cmd_settings: list[ArgDetails] = []

    def larguify(
        self,
        function,
        args: list[str],
        name: str,
        required: bool = False,
    ):
        args_dict: ArgDetails = {
            "function": function,
            "args": args,
            "name": name,
            "required": required,
        }

        self.cmd_settings.append(args_dict)

        return self

    def prerun(
        self,
    ):
        def next_args(x):
            if x < len(self.parsed) - 1:
                n_ind = x + 1
                if (self.parsed[n_ind]) == "=":
                    n_ind += 1
                return self.parsed[n_ind]

        map_ = {}
        for i, arg in enumerate(self.parsed):
            for setting in self.cmd_settings:
                condition1 = arg in setting["args"] and self.cmd_name == self.parsed[0]
                condition2 = self.cmd_name == None and arg in setting["args"]
                condition = condition1 or condition2

                if condition and arg:
                    map_.update({setting["name"]: next_args(i)})

        self.cmds = map_

    def run(self):
        self.prerun()
        # if not self.cmds:
            # raise SyntaxError(f"Command not found, {self.parsed}")

        for k, v in self.cmds.items():
            setting = list(filter(lambda x: x["name"] == k, self.cmd_settings))
            setting = setting[0]
            setting["function"](v)
    
    def start(self):
        th = Thread(target=self.run)
        th.start()
        # th.join()


cmd = Largue("ion")
cmd.larguify(
    lambda x: print(x + "b"),
    ["--toto", "-s"],
    name="toto",
)

def test_loop(x):
    import time
    time.sleep(5)
    print("Testing", x)
    
cmd.larguify(lambda x: print("ion", x + "a"), ["--tata", "-t"], name="tata")
cmd.start()

cmd2 = Largue("vague")
cmd2.larguify(lambda x: test_loop(x), ["--xoxo", "-x"], name="xoxo")
cmd2.larguify(lambda x: print(x), ["--sasa", "-s"], name="sasa")
cmd2.start()
print("test")




import sys
from typing import Optional


class Largue:
    def __init__(self, name: Optional[str] = None):
        self.cmd_name = name
        self.commands: dict = {}
        self.parsed = sys.argv[1:]
        self.cmd_settings = []

    def larguify(
        self,
        function,
        args: list[str],
        name: str,
        required: bool = False,
    ):
        args_dict = {
            "function": function,
            "args": args,
            "name": name,
            required: required,
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
                    # if next_ := next_args(i):
                    map_.update({setting["name"]: next_args(i)})

        self.cmds = map_

    def run(self):
        self.prerun()
        if not self.cmds:
            raise SyntaxError(f"Command not found, {self.parsed}")

        for setting in self.cmd_settings:
            for v in self.cmds.values():
                setting["function"](v or [])
            break


cmd = Largue()
cmd.larguify(
    lambda x: print(x),
    ["--toto", "-s"],
    name="toto",
)
cmd.larguify(lambda x: print(x), ["--tata", "-t"], name="tata")
cmd.run()
print(cmd.cmds)

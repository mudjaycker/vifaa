import sys


class Largue:
    def __init__(self, name: str):
        self.name = name
        self.commands: dict = {}
        self.parsed_args = sys.argv[1:]
        self.cmd_settings = {}
        
        

    def larguify(
        self,
        function,
        args: list[str],
        help: str,
        default,
        required: bool = False,
        has_values: bool = False
    ):

        args_dict = {"function": function, default: default, "args": args, "help": help, required: required, "has_values": has_values}
        
        self.cmd_settings.update({args[0]: args_dict}) 
        
        return self
    
    def run(self,):
        def next_args(x):
            tab = []
            if x < len(self.parsed_args) - 1:
                n_ind = x + 1 
                inds = self.parsed_args[n_ind:]
                for y in inds:
                    if y not in self.cmd_settings:
                        tab.append(y)
                    else:
                        break
            return tab
            
        map_ = {}
        for i,arg in enumerate(self.parsed_args):
            curr_arg = arg if arg  in self.cmd_settings else None
            
            if curr_arg and next_args:
                map_[curr_arg] = next_args(i)

        for k, v in map_.items():
            self.cmd_settings[k]["function"](*v)
                        
        


cmd = Largue("test")
cmd.larguify(lambda *x: print(x), ["testify"], "helping", lambda : print("ok"), has_values=True)
cmd.larguify(lambda *x: print(x), ["testifions"], "helping", lambda : print("ok"), has_values=True)
# cmd.larguify(lambda x: print(x), ["o"], "helping", lambda : print("ok"), has_values=True)
cmd.run()
import datetime as dt, typing as t, asyncio

sleep = asyncio.sleep
T = t.TypeVar("T")
T_Args = t.ParamSpecArgs
T_Func = t.Callable[[T_Args], t.Coroutine[t.Any, None, T]] | t.Callable[[], t.Coroutine[t.Any, None, T]]

class aWaitFor:
    def __init__(self, seconds: float = 0):
        self.seconds = seconds

    def __call__[T](self, function: T_Func[T]):
        
        async def wrapper(*args:T_Args, **kwargs: T_Args):
            await sleep(self.seconds)
            return await function(*args, **kwargs)

        return wrapper


class aInterval:
    def __init__(self, seconds: float = 0):
        self.seconds = seconds

    def __call__[T](self, function: T_Func[T]):
        
        async def wrapper(*args:T_Args, **kwargs:T_Args):
            while self.seconds:
                await function(*args, **kwargs)
                await sleep(self.seconds)

        return wrapper


class aRunTill:
    def __init__(self, seconds: float = 0, timeout: float = 0):
        self.seconds = seconds
        self.timeout = timeout
        # self.datas = []

    def __call__[T](self, function: T_Func[T]):
        
        async def wrapper(*args:T_Args, **kwargs:T_Args):
            stamp = lambda: (dt.datetime.timestamp(dt.datetime.now()))
            target_time = self.timeout + stamp()
            res = None
            while self.seconds:
                if stamp() >= target_time:
                    return res
                res = await function(*args, **kwargs)
                await sleep(self.seconds)

        return wrapper


""" i = 0
j = 0


@aRunTill(1, 3)
async def test():
    global i
    i += 1
    print(i, "a")
    return i


@aRunTill(0.6, 4)
async def test2():
    global j, i
    print(j, "b")
    if i >= 10:
        print(i >= 10)
    j += 1


async def main():
    await asyncio.gather(
        test2(),
        test(),
    )


asyncio.run(main())
print(f"{i=}, {j=}") """
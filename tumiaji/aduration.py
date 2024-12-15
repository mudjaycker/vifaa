import asyncio
import datetime as dt

sleep = asyncio.sleep


class aWaitFor:
    def __init__(self, seconds: int = 0):
        self.seconds = seconds

    def __call__(self, function):
        async def wrapper(*args, **kwargs):
            await sleep(self.seconds)
            return await function(*args, **kwargs)

        return wrapper


class aInterval:
    def __init__(self, seconds: int = 0):
        self.seconds = seconds

    def __call__(self, function):
        async def wrapper(*args, **kwargs):
            while self.seconds:
                await sleep(self.seconds)
                await function(*args, **kwargs)

        return wrapper


class aRunTill:
    def __init__(self, seconds: int = 0, timeout: int = 0):
        self.seconds = seconds
        self.timeout = timeout
        self.datas = []

    def __call__(self, function):
        stamp = lambda: (dt.datetime.timestamp(dt.datetime.now()))
        target_time = self.timeout + stamp()

        async def wrapper(*args, **kwargs):
            while self.seconds:
                await sleep(self.seconds)
                self.datas.append(await function(*args, **kwargs))
                if stamp() >= target_time:
                    return self.datas

        return wrapper

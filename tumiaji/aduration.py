import asyncio
import datetime as dt
import time

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
        # self.datas = []

    def __call__(self, function):

        async def wrapper(*args, **kwargs):
            stamp = lambda: (dt.datetime.timestamp(dt.datetime.now()))
            target_time = self.timeout + stamp()

            while self.seconds:
                if stamp() >= target_time:
                    return
                await function(*args, **kwargs)
                await sleep(self.seconds)

        return wrapper


i = 0
j = 0


@aRunTill(0.2, 5)
async def test():
    global i
    i += 1
    print(i, "a")


@aRunTill(3, 2)
async def test2():
    global j
    j += 1
    print(j, "b")


async def main():
    await asyncio.gather(
        test2(),
    )


b = time.time()
asyncio.run(main())
print(time.time() - b)

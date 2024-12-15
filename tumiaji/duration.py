import time
import datetime as dt


class WaitFor:
    def __init__(self, seconds: int = 0):
        self.seconds = seconds

    def __call__(self, function):
        def wrapper(*args, **kwargs):
            time.sleep(self.seconds)
            return function(*args, **kwargs)

        return wrapper


class Interval:
    def __init__(self, seconds: int = 0):
        self.seconds = seconds

    def __call__(self, function):
        def wrapper(*args, **kwargs):
            while self.seconds:
                time.sleep(self.seconds)
                yield function(*args, **kwargs)

        return wrapper


class RunTill:
    def __init__(self, seconds: int = 0, timeout: int = 0):
        self.seconds = seconds
        self.timeout = timeout

    def __call__(self, function):
        stamp = lambda: (dt.datetime.timestamp(dt.datetime.now()))
        target_time = self.timeout + stamp()

        def wrapper(*args, **kwargs):
            while self.seconds:
                time.sleep(self.seconds)
                yield function(*args, **kwargs)
                if stamp() >= target_time:
                    break

        return wrapper

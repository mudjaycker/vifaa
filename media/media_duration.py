from pathlib import Path
import multiprocessing.pool as pool
from os import cpu_count
import subprocess
import time
import json
from typing import TypedDict


class T_DURATION(TypedDict):
    weeks: int
    days: int
    hours: int
    minutes: int
    seconds: int



class MDuration:
    def __init__(self, path: str = "."):
        self._extensions = ["mkv", "mp4", "m4a", "avi", "mpeg", "mp3", "webm"]
        self.founds = self.getFiles(path)

    def length(self, filename):
        try:
            result = subprocess.run(
                [
                    "ffprobe",
                    "-v",
                    "error",
                    "-show_entries",
                    "format=duration",
                    "-of",
                    "default=noprint_wrappers=1:nokey=1",
                    filename,
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
            )
            return float(result.stdout)
        except:
            return 0.0

    def getFiles(self, path: str):
        p = Path(path).resolve()
        find = lambda x: list(p.glob(f"**/*.{x}"))
        founds = []
        for f in self._extensions:
            founds += find(f)
        return founds

    def get_durations(
        self,
    ) -> tuple[T_DURATION, str]:
        threads = cpu_count() * 2
        s_hour = 3600
        s_day = s_hour * 24
        s_week = s_day * 7
        with pool.ThreadPool(threads) as th:
            res = th.map(self.length, self.founds)
        seconds = sum(res)
        durations = {
            "weeks": int(seconds // s_week),
            "days": int(seconds // s_day) % 7,
            "hours": int(seconds // s_hour) % 24,  # hours
            "minutes": int(seconds // 60) % 60,  # minutes
            "seconds": int(seconds % 60),  # seconds
        }
        return durations, json.dumps(durations, indent=2)


if __name__ == "__main__":
    b = time.perf_counter()
    path = "/home/maryimana/"
    x = MDuration(path)
    durations = x.get_durations()
    print(durations[1])
    e = time.perf_counter()
    took = (
        f"{int((e - b) // 60)}:{int((e-b) % 60)}"
        if (e - b) > 60
        else f"{round(e - b, 2)} seconds"
    )
    print(f"took: {took}")

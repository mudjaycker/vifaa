from pathlib import Path
import multiprocessing.pool as pool
from os import cpu_count
import subprocess
import time
import json
import typing as t


class T_DURATION(t.TypedDict):
    total_files: int
    total_size_gbytes: float
    weeks: int
    days: int
    hours: int
    minutes: int
    seconds: int
# class Test(t.)


class MDuration:
    _extensions = ["mkv", "mp4", "m4a", "avi", "mpeg", "mp3", "webm"]

    def __init__(self, path_str: str = "."):
        self.getFiles(path_str)

    def length(self, file: Path):
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
                    file,
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
            )
            return float(result.stdout)
        except:
            return 0.0

    def getFiles(self, path_str: str):
        p = Path(path_str).resolve()
        find = lambda x=".": list(p.glob(f"**/*.{x}"))
        founds: list[Path] = []

        for f in self._extensions:
            founds += find(f)
        

        self.founds = founds
        self.files_number = len(self.founds)
        self.total_size = sum([f.stat().st_size for f in self.founds])

    def get_durations(
        self,
    ) -> tuple[T_DURATION, str]:

        if cpus := cpu_count():
            threads = cpus * 2
        else:
            threads = 1

        s_hour = 3600
        s_day = s_hour * 24
        s_week = s_day * 7

        with pool.ThreadPool(threads) as th:
            res = th.map(self.length, self.founds)
        seconds = sum(res)

        durations: T_DURATION = {
            "total_size_gbytes": self.total_size,
            "total_files": self.files_number,
            "weeks": int(seconds // s_week),
            "days": int(seconds // s_day) % 7,
            "hours": int(seconds // s_hour) % 24,  # hours
            "minutes": int(seconds // 60) % 60,  # minutes
            "seconds": int(seconds % 60),  # seconds
        }
        return durations, json.dumps(durations, indent=4)


if __name__ == "__main__":
    b = time.perf_counter()
    path = "/home/maryimana/Downloads/"
    x = MDuration(path)
    durations = x.get_durations()
    print(durations[1])
    e = time.perf_counter()
    took = (
        f"{int((e - b) // 60)}:{int((e-b) % 60)}"
        if (e - b) > 60
        else f"{round(e - b, 4)} seconds"
    )
    print(f"took: {took}")

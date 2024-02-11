from pathlib import Path
import multiprocessing.pool as pool
from os import cpu_count
import subprocess
import time

class MDuration:
    def __init__(self, path:str="."):
        self.founds = self.getFiles(path)
        
    def length(self, filename):
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


    def getFiles(self, path: str):
        p = Path(path).resolve()
        extensions = ["mkv", "mp4", "m4a", "avi", "mpeg", "mp3", "webm"]
        find = lambda x: list(p.glob(f"**/*.{x}"))
        founds = []
        for f in extensions:
            founds += find(f)
        return founds
    
    
    def get_durations(self,) -> tuple[float, list[int]]:
        threads = cpu_count() * 2
        with pool.ThreadPool(threads) as th:
            res = th.map(self.length, self.founds)
        seconds = sum(res)
        durations = [
            int(seconds // 3600), #hours
            int((seconds / 60) % 60), #minutes
            int(seconds % 60 )#seconds
        ]
        return seconds, durations
    

# if __name__ == '__main__':
    # b = time.perf_counter()
    # path = "/media/maryimana/DISK 2/Schoolside/C/"
    # x = MDuration(path)
    # durations = x.get_durations()
    # print(durations[1])
    # e = time.perf_counter()
    # print(f"took: {e-b} seconds")
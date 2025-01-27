import time
from threading import Thread, Event
from queue import Queue


shared_bool = Event()
q = Queue()


def worker1(shared_bool):
    while True:
        if shared_bool.is_set():
            print("value is True, quitting", q.get_nowait())
            return
        else:
            print("value is False th1")
        time.sleep(1)


def worker2(shared_bool):
    q.put(983)
    print("th2")
    time.sleep(2.5)
    shared_bool.set()


t1 = Thread(target=worker1, args=(shared_bool,))
t2 = Thread(target=worker2, args=(shared_bool,))
t1.start()
t2.start()
t1.join()
t2.join()

import typing as t


class flist[T](list[T]):
    def __init__(self, args: t.Iterable[T] = [], limit: int = -1):
        args = list(args)
        self.limit = limit
        if len(args) > limit and limit > -1:
            raise Exception("Oh Oh")

        super().__init__(args)

    def append(self, object: T) -> None:
        if len(self) + 1 > self.limit and self.limit > -1:
            raise Exception("Oh yah")

        super().append(object)

    def __iadd__(self, value: t.Iterable[T]):
        value = list(value)
        if len(self) + len(value) > self.limit and self.limit > -1:
            raise Exception("Oh iadd")
        return super().__iadd__(value)


x = flist(
    [
        2,
        1
    ],
    4,
)
# x += [2, 3, 4]
# x.append(2)
print((x))

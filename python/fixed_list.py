import typing as t


class flist[T](list[T]):
    def __init__(self, args: t.Iterable[T] = [], limit: int = -1):
        self.args = list(args)
        self.limit = limit
        self.s = "s" if self.limit > 1 else ""
        if len(self.args) > self.limit and self.limit > -1:
            raise OverflowError(
                f"From initialisation, flist Cannot have more than {self.limit} item{self.s}"
            )

        super().__init__(args)

    def append(self, object: T) -> None:
        if len(self) + 1 > self.limit and self.limit > -1:
            raise OverflowError(
                f"From append methode, flist Cannot have more than {self.limit} item{self.s}"
            )

        super().append(object)

    def append_l(self, object: T):
        self.reverse()
        self.append(object)
        self.reverse()
        # x = [object] + self
        # self = flist(x, self.limit)

    def pop_l(self):
        self.reverse()
        self.pop()
        self.reverse()

    def __iadd__(self, value: t.Iterable[T]):
        value = list(value)
        temp = len(self) + len(value)
        if temp > self.limit and self.limit > -1:
            raise OverflowError(
                f"From addition, flist Cannot have more than {self.limit} item{self.s}"
            )
        return super().__iadd__(value)

    def __imul__(self, value: t.SupportsIndex):
        temp = len(self) * int(value)
        if temp > self.limit and self.limit > -1:
            raise OverflowError(
                f"From multiplication, flist Cannot have more than {self.limit} item{self.s}"
            )
        return super().__imul__(value)

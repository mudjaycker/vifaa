from rangi import rangi

class rangi2:
    __text: str = ""

    def __init__(self, text: str):
        self.__text = text

    def __str__(self):
        return self.__text

    @property
    def cyan(self):
        self.__text = rangi.cyan(self.__text)
        return self

    @property
    def cyan2(self):
        self.__text = rangi.cyan2(self.__text)
        return self

    @property
    def purple2(self):
        self.__text = rangi.purple2(self.__text)
        return self

    @property
    def italic(self):
        self.__text = rangi.italic(self.__text)
        return self

    @property
    def red(self):
        self.__text = rangi.red(self.__text)
        return self

    @property
    def red2(self):
        self.__text = rangi.red2(self.__text)
        return self

    @property
    def yellow(self):
        self.__text = rangi.yellow(self.__text)
        return self

    @property
    def yellow2(self):
        self.__text = rangi.yellow2(self.__text)
        return self

    @property
    def underline(self):
        self.__text = rangi.underline(self.__text)
        return self

    @property
    def underline2(self):
        self.__text = rangi.underline2(self.__text)
        return self

    @property
    def bgwhite(self):
        self.__text = rangi.bgwhite(self.__text)
        return self

    @property
    def bgwhite2(self):
        self.__text = rangi.bgwhite2(self.__text)
        return self

    @property
    def bgblue(self):
        self.__text = rangi.bgblue(self.__text)
        return self

    @property
    def bgyellow(self):
        self.__text = rangi.bgyellow(self.__text)
        return self

    @property
    def bgred(self):
        self.__text = rangi.bgred(self.__text)
        return self

    @property
    def bggreen(self):
        self.__text = rangi.bggreen(self.__text)
        return self

    @property
    def bold(self):
        self.__text = rangi.bold(self.__text)
        return self

    @property
    def green(self):
        self.__text = rangi.green(self.__text)
        return self

    @property
    def dunderline(self):
        self.__text = rangi.dunderline(self.__text)
        return self

    @property
    def crossline(self):
        self.__text = rangi.crossline(self.__text)
        return self

    @property
    def invisible(self):
        self.__text = rangi.invisible(self.__text)
        return self

    @property
    def blink(self):
        self.__text = rangi.blink(self.__text)
        return self

    @property
    def blink2(self):
        self.__text = rangi.blink2(self.__text)
        return self

    @property
    def lite(self):
        self.__text = rangi.lite(self.__text)
        return self

    @property
    def grey(self):
        self.__text = rangi.grey(self.__text)
        return self

    @property
    def grey2(self):
        self.__text = rangi.grey2(self.__text)
        return self

    @property
    def bgcyan(self):
        self.__text = rangi.bgcyan(self.__text)
        return self

    @property
    def bgpurple(self):
        self.__text = rangi.bgpurple(self.__text)
        return self

    @property
    def bggrey(self):
        self.__text = rangi.bggrey(self.__text)
        return self

    @property
    def bold2(self):
        self.__text = rangi.bold2(self.__text)
        return self

    @property
    def _(self):
        return self.__text


x = rangi2(" KO ").bold.bggreen.italic._
y = rangi2(" N ").bold.bgwhite2.italic._
z = rangi2(" GO ").bold.bgred.italic._


print(x + y + z)

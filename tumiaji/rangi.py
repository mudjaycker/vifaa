def style(value: int, text: str):
    return f"\033[{value}m{text}\033[0m"


class rangi:
    @classmethod
    def cyan2(cls, text: str):
        return style(96, text)

    @classmethod
    def purple2(cls, text: str):
        return style(95, text)

    @classmethod
    def blue2(cls, text: str):
        return style(94, text)

    @classmethod
    def yellow2(cls, text: str):
        return style(93, text)

    @classmethod
    def green2(cls, text: str):
        return style(92, text)

    @classmethod
    def red2(cls, text: str):
        return style(91, text)

    @classmethod
    def grey2(cls, text: str):
        return style(91, text)

    @classmethod
    def underline2(cls, text: str):
        return style(52, text)

    @classmethod
    def bgwhite2(cls, text: str):
        return style(47, text)

    @classmethod
    def bgcyan(cls, text: str):
        return style(46, text)

    @classmethod
    def bgpurple(cls, text: str):
        return style(45, text)

    @classmethod
    def bgblue(cls, text: str):
        return style(44, text)

    @classmethod
    def bgyellow(cls, text: str):
        return style(43, text)

    @classmethod
    def bggreen(cls, text: str):
        return style(42, text)

    @classmethod
    def bgred(cls, text: str):
        return style(41, text)

    @classmethod
    def bggrey(cls, text: str):
        return style(40, text)

    @classmethod
    def bold2(cls, text: str):
        return style(37, text)

    @classmethod
    def cyan(cls, text: str):
        return style(36, text)

    @classmethod
    def purple(cls, text: str):
        return style(35, text)

    @classmethod
    def blue(cls, text: str):
        return style(34, text)

    @classmethod
    def yellow(cls, text: str):
        return style(33, text)

    @classmethod
    def green(cls, text: str):
        return style(32, text)

    @classmethod
    def red(cls, text: str):
        return style(31, text)

    @classmethod
    def grey(cls, text: str):
        return style(30, text)

    @classmethod
    def dunderline(cls, text: str):
        return style(21, text)

    @classmethod
    def crossline(cls, text: str):
        return style(9, text)

    @classmethod
    def invisible(cls, text: str):
        return style(8, text)

    @classmethod
    def bgwhite(cls, text: str):
        return style(7, text)

    @classmethod
    def blink2(cls, text: str):
        return style(6, text)

    @classmethod
    def blink(cls, text: str):
        return style(5, text)

    @classmethod
    def underline(cls, text: str):
        return style(4, text)

    @classmethod
    def italic(cls, text: str):
        return style(3, text)

    @classmethod
    def lite(cls, text: str):
        return style(2, text)

    @classmethod
    def bold(cls, text: str):
        return style(1, text)

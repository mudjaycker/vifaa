import orjson
import string
import typing as t
from dataclasses import dataclass
from functools import lru_cache
import time
from typing_extensions import LiteralString

T_DicoType = t.TypedDict("T_DicoType", {"mot": str, "définitions": t.List[str]})
DICO_FOLDER: t.Final[str] = "./dico/"
ACCENTS_MAP: t.Final[t.Dict[str, str]] = {
    "àâa": "a",
    "òôo": "o",
    "ìíïi": "i",
    "èêéëe": "e",
    "ûùüu": "u",
}
ACCENTUEDS: t.Final[str] = "èêéëàâòôìíïûùüaoieu"

x: LiteralString = f"test"
x = f"e {ACCENTUEDS}"

class json:
    @classmethod
    def dumps(cls, obj: t.Any):
        result = orjson.dumps(obj)
        return result.decode()

    @classmethod
    def loads(cls, chars: str):
        return orjson.loads(chars)


def csv2list(filename: str):

    def rereplace(chars: str):
        return chars.replace("[", "").replace("]", "").replace('"', "")

    with open(filename, "r") as f:
        data = f.read()

    formated = [rereplace(i).split(",") for i in data.split("\n")][1:]

    return formated


def tojson(data: t.List[t.List[str]]):
    dico_list: t.List[T_DicoType] = []

    for i in data:
        dico: T_DicoType = {"mot": i[0], "définitions": "".join(i[1:]).split(".")}
        dico_list.append(dico)

    return dico_list


def write_json(filename: str, data: t.List[T_DicoType]):
    with open(filename, "w") as f:
        j = json.dumps(data)
        f.write(j)


def main():
    alpha = string.ascii_lowercase
    jsoned = tojson(csv2list("./dico.csv"))
    tempo: t.Dict[str, t.List[T_DicoType]] = {}

    @lru_cache
    def get_accentueds(value: str) -> str:  # type: ignore
        for k, v in ACCENTS_MAP.items():
            if value.lower() in k.lower():
                return v

    def alphabetise(target: str, obj: t.List[T_DicoType]):
        return filter(lambda j: j["mot"].lower().startswith(target), obj)

    for a in alpha:
        if data := [i for i in alphabetise(a, jsoned)]:
            tempo |= {a: data}

    for a in ACCENTUEDS:
        normalized = get_accentueds(a)
        if data := [i for i in alphabetise(a, jsoned)]:
            tempo[normalized].extend(data)

    for fname, values in tempo.items():
        for value in values:

            len(value["définitions"]) > 1 and value["définitions"].pop()  # type: ignore

            for i, v in enumerate(value["définitions"]):
                v += "."

                if v.startswith("'") or v.startswith(" "):
                    value["définitions"][i] = v.replace("'", "").strip()

        write_json(DICO_FOLDER + fname + ".json", values)


@dataclass
class Dico:
    mot: str
    définitions: t.List[str]

    def __init__(self, dico: T_DicoType):
        data: T_DicoType = dico
        self.mot = data["mot"]
        self.définitions = data["définitions"]



def get_dico(filename: str):
    with open(filename, "r") as f:
        jsoned: t.List[T_DicoType] = json.loads(f.read())

    result = (Dico(i) for i in jsoned)
    return result


if __name__ == "__main__":
    b = time.perf_counter()
    main()
    # for i in get_dico("dico/a.json"):
    # print(i.définitions)
    # break
    print(f"{time.perf_counter()-b} seconds")

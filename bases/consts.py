from string import ascii_uppercase
from typing import Dict

numbers_map: Dict[int, str] = {i: str(i) for i in range(10)} | {
    k + 10: v for k, v in enumerate(ascii_uppercase)
}

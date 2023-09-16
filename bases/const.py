from string import ascii_uppercase
numbers_map = (
                {i: str(i) for i in range(10)} |
                {k + 10: v for k, v in enumerate(ascii_uppercase)}
            )
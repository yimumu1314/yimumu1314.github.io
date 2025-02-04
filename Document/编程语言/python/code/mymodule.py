# -*- coding:UTF-8 -*-
"""mymodule.py

This module provides a simple example demonstrating how to document Python code
according to the Google Python Style Guide, with complete English descriptions.
It includes a function `add` and a class `Calculator` for basic arithmetic operations.

Example:
    ```python
    # To add two integers:
    result = add(2, 3)
    print(result)
    ```
"""

def add(a: int, b: int) -> int:
    """Add two integers.

    Args:
        a (int): The first integer.
        b (int): The second integer.

    Returns:
        int: The sum of the two integers.
    """
    return a + b


class Calculator:
    """A simple calculator class for basic arithmetic operations.

    This class provides methods for multiplication and division.
    """

    def multiply(self, x: float, y: float) -> float:
        """Multiply two numbers.

        Args:
            x (float): The first multiplier.
            y (float): The second multiplier.

        Returns:
            float: The product of the two numbers.
        """
        return x * y

    def divide(self, numerator: float, denominator: float) -> float:
        """Divide the numerator by the denominator.

        Args:
            numerator (float): The dividend.
            denominator (float): The divisor.

        Returns:
            float: The quotient of the numerator divided by the denominator.

        Raises:
            ZeroDivisionError: If the denominator is zero.
        """
        if denominator == 0:
            raise ZeroDivisionError("Denominator cannot be zero.")
        return numerator / denominator

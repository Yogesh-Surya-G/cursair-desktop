import sys
import traceback
from pynput.mouse import Controller
import time

try:
    print("Python script starting...")
    print(f"Python version: {sys.version}")
    print(f"Python executable: {sys.executable}")
    print(f"Arguments received: {sys.argv}")

    if len(sys.argv) != 2:
        print("Usage: python scroll.py <distance>")
        sys.exit(1)

    mouse = Controller()
    distance = int(sys.argv[1])

    scroll_sensitivity = 0.5
    scroll_amount = int(distance * scroll_sensitivity)

    max_scroll = 10
    scroll_amount = max(-max_scroll, min(max_scroll, scroll_amount))

    if scroll_amount != 0:
        mouse.scroll(0, scroll_amount)

except Exception as e:
    print(f"Error occurred: {str(e)}")
    print("Traceback:")
    traceback.print_exc()
    sys.exit(1)


#!/usr/bin/env python3
"""
Standard Flask / Gunicorn WSGI entry point for Arrow Puzzle: Arena.
- Run directly: `python3 app.py` or `python3 server.py`
- Run with Flask CLI: `flask --app app run --host=0.0.0.0 --port=3000`
- Run with Gunicorn: `gunicorn -w 1 --threads 8 -b 0.0.0.0:3000 app:app`
"""

import os
import sys

_VENDOR_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "vendor_pkgs")
if os.path.isdir(_VENDOR_DIR) and _VENDOR_DIR not in sys.path:
    sys.path.append(_VENDOR_DIR)

from server import HOST, PORT, app, create_app

__all__ = ["app", "create_app"]

if __name__ == "__main__":
    print(f"Arrow Puzzle: Arena Flask Server listening on http://{HOST}:{PORT}", flush=True)
    app.run(host=HOST, port=PORT, threaded=True, debug=False, use_reloader=False)

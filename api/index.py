"""
Vercel Serverless Python WSGI Entry Point for Arrow Puzzle: Arena.
Vercel's @vercel/python runtime automatically discovers `app` in `api/index.py`
and routes `/api/*` requests here via `vercel.json`.
"""

import os
import sys

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from server import app  # noqa: E402

__all__ = ["app"]

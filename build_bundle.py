#!/usr/bin/env python3
"""
Bundles public/ assets into standalone arrow-escape-mobile.html
and audits all game files to ensure 100% pure English UI with zero Hindi/Hinglish text.
"""

import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

JS_FILES = [
    "public/js/shapes.js",
    "public/js/generator.js",
    "public/js/audio.js",
    "public/js/leaderboard.js",
    "public/js/app.js",
]

FORBIDDEN_HINGLISH = [
    r"\bbina galti\b",
    r"\bse kam me\b",
    r"\bla[a]?l arrows\b",
    r"\bkitne arrows\b",
    r"\baasaan\b",
    r"\bmushkil\b",
    r"\bhatao\b",
    r"\bbanao\b",
]


def read_text(rel_path):
    with open(os.path.join(BASE_DIR, rel_path), "r", encoding="utf-8") as f:
        return f.read()


def main():
    html = read_text("public/index.html")
    css = read_text("public/styles.css")
    combined_js = "\n;\n".join(read_text(p) for p in JS_FILES)

    bundled = re.sub(r'<link rel="icon"[^>]*/>', "", html)
    bundled = re.sub(r'<link rel="manifest" href="/manifest\.json[^"]*"\s*/>', "", bundled)
    bundled = re.sub(
        r'<link rel="stylesheet" href="/styles\.css[^"]*"\s*/>',
        lambda _: f"<style>\n{css}\n</style>",
        bundled,
    )
    bundled = re.sub(
        r'<script src="/js/shapes\.js[^"]*"></script>[\s\S]*?<script src="/js/app\.js[^"]*"></script>',
        lambda _: f"<script>\n{combined_js}\n</script>",
        bundled,
    )

    out_path = os.path.join(BASE_DIR, "arrow-escape-mobile.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(bundled)

    # Audit every source file + output bundle for Devanagari or Hinglish
    check_files = [
        "server.py",
        "app.py",
        "api/index.py",
        "public/index.html",
        "public/styles.css",
        "arrow-escape-mobile.html",
    ] + JS_FILES
    for rel in check_files:
        txt = read_text(rel)
        dev = re.findall(r"[\u0900-\u097F]+", txt)
        if dev:
            print(f"ERROR: Found Hindi characters in {rel}: {dev[:5]}", file=sys.stderr)
            sys.exit(1)
        for pat in FORBIDDEN_HINGLISH:
            m = re.search(pat, txt, flags=re.IGNORECASE)
            if m:
                print(f"ERROR: Found Hinglish phrase '{m.group(0)}' in {rel}", file=sys.stderr)
                sys.exit(1)

    size_kb = os.path.getsize(out_path) / 1024.0
    print(f"Bundle built successfully: arrow-escape-mobile.html ({size_kb:.1f} KB) — 0 Hindi/Hinglish strings!")


if __name__ == "__main__":
    main()

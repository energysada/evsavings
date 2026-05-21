#!/usr/bin/env python3
"""
Refresh AAA gas prices in index.html and sample/shared.js.

Scrapes https://gasprices.aaa.com/state-gas-price-averages/ — that page
embeds a machine-readable string of the form:
    AB,State Name,$4.038,https://...,#color;AB,...
plus a "National Average $4.555" headline.

Rewrites, in both files, the gas-price data blocks and every dependent
date stamp / constant. Validates before writing — if the scrape looks
wrong (too few states, implausible prices), it aborts without touching
anything and exits non-zero.

Run from anywhere; paths are resolved relative to this file.
"""
import re
import ssl
import sys
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
SHARED = ROOT / "sample" / "shared.js"
AAA_URL = "https://gasprices.aaa.com/state-gas-price-averages/"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# 50 states + DC + National — the set we expect to resolve.
EXPECTED_STATES = {
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
    "Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois",
    "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts",
    "Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
    "New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    "Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington",
    "West Virginia","Wisconsin","Wyoming",
}


def _ssl_context():
    """Prefer certifi's CA bundle; fall back to the system default."""
    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        return ssl.create_default_context()


def fetch_aaa():
    req = urllib.request.Request(AAA_URL, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=45, context=_ssl_context()) as r:
        return r.read().decode("utf-8", errors="replace")


def parse(html):
    """Return (national_price: float, prices: dict[state->float])."""
    m = re.search(r"National Average\s*\$([0-9]+\.[0-9]+)", html)
    if not m:
        raise ValueError("could not find National Average on AAA page")
    national = float(m.group(1))

    # Embedded data string: AB,State Name,$4.038,url,#color;
    prices = {}
    for ab, name, price in re.findall(
        r"\b([A-Z]{2}),([A-Za-z .'-]+?),\$([0-9]+\.[0-9]+),https?://", html):
        prices[name.strip()] = float(price)

    return national, prices


def validate(national, prices):
    missing = EXPECTED_STATES - set(prices)
    if missing:
        raise ValueError(f"missing {len(missing)} states from AAA scrape: {sorted(missing)}")
    if not (2.0 <= national <= 9.0):
        raise ValueError(f"national average {national} outside plausible range")
    for state, p in prices.items():
        if not (1.5 <= p <= 12.0):
            raise ValueError(f"{state} price {p} outside plausible range")


def build_index_array(national, prices):
    """JS array literal matching index.html's gasPrices format."""
    rows = [("National", national)]
    rows += sorted(prices.items(), key=lambda kv: kv[0])
    parts = [f'  {{state:"{s}",price:{p:.3f}}}' for s, p in rows]
    # 3 entries per line, like the original
    lines = []
    for i in range(0, len(parts), 3):
        lines.append(",".join(x.strip() for x in parts[i:i+3]))
    body = ",\n  ".join(lines)
    return "const gasPrices = [\n  " + body + "\n];"


def build_shared_object(national, prices):
    """JS object literal matching shared.js's gasPrices format."""
    rows = [("National", national)]
    rows += sorted(prices.items(), key=lambda kv: kv[0])
    parts = [f'"{s}":{p:.3f}' for s, p in rows]
    lines = []
    for i in range(0, len(parts), 5):
        lines.append(",".join(parts[i:i+5]))
    body = ",\n    ".join(lines)
    return "  const gasPrices = {\n    " + body + "\n  };"


def main():
    today = date.today()
    human = today.strftime("%B %-d, %Y")           # "May 20, 2026"
    short = today.strftime("%m/%d/%y")

    print(f"Fetching AAA ({AAA_URL}) ...")
    html = fetch_aaa()
    national, prices = parse(html)
    print(f"Parsed national=${national:.3f}, {len(prices)} states")
    validate(national, prices)
    print("Validation passed.")

    peak_ratio = 5.03 / national

    # ---- index.html ----
    idx = INDEX.read_text()
    before = idx

    idx = re.sub(
        r"// Gas prices: AAA state averages, updated [^\n]*\nconst gasPrices = \[.*?\n\];",
        f"// Gas prices: AAA state averages, updated {human}\n" + build_index_array(national, prices),
        idx, count=1, flags=re.DOTALL)

    idx = re.sub(
        r"const CURRENT_NATIONAL = [0-9.]+;",
        f"const CURRENT_NATIONAL = {national:.3f};", idx, count=1)

    idx = re.sub(
        r"// Peak 2022: scale all states by 5\.03/[0-9.]+ = [0-9.]+x \(national peak ratio\)",
        f"// Peak 2022: scale all states by 5.03/{national:.3f} = {peak_ratio:.3f}x (national peak ratio)",
        idx, count=1)

    idx = re.sub(
        r"📊 Today \(\$[0-9.]+ nat'l avg\)",
        f"\U0001F4CA Today (${national:.2f} nat'l avg)", idx, count=1)

    # Visible "last updated" badge in the e-gallon section.
    idx = re.sub(
        r'<span id="gas-updated-date">[^<]*</span>',
        f'<span id="gas-updated-date">{human}</span>', idx, count=1)

    idx = re.sub(
        r"AAA gas prices \([A-Z][a-z]+ [0-9]{1,2}, [0-9]{4}\)",
        f"AAA gas prices ({human})", idx, count=1)

    idx = re.sub(
        r"AAA state-level averages</a>, updated [A-Z][a-z]+ [0-9]{1,2}, [0-9]{4}\. "
        r"National average: \$[0-9.]+/gallon\.",
        f"AAA state-level averages</a>, updated {human}. "
        f"National average: ${national:.2f}/gallon.", idx, count=1)

    if idx == before:
        print("WARNING: index.html unchanged — anchors may have drifted", file=sys.stderr)
    INDEX.write_text(idx)
    print(f"Updated {INDEX}")

    # ---- sample/shared.js ----
    sh = SHARED.read_text()
    before = sh

    sh = re.sub(
        r"  // AAA state averages, updated [^\n]*\n  const gasPrices = \{.*?\n  \};",
        f"  // AAA state averages, updated {human}\n" + build_shared_object(national, prices),
        sh, count=1, flags=re.DOTALL)

    sh = re.sub(
        r"const PEAK_NATL = 5\.03, CURR_NATL = [0-9.]+;",
        f"const PEAK_NATL = 5.03, CURR_NATL = {national:.3f};", sh, count=1)

    if sh == before:
        print("WARNING: shared.js unchanged — anchors may have drifted", file=sys.stderr)
    SHARED.write_text(sh)
    print(f"Updated {SHARED}")

    print(f"Done. National ${national:.3f} as of {short}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)

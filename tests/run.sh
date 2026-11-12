#!/bin/sh
# Runs tests/test.html in headless Chrome with a throwaway profile.
# Phase 1 exercises the app. Phase 2 reloads it to check persistence.
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT
for PHASE in 1 2; do
  "$CHROME" --headless=new --user-data-dir="$PROFILE" --allow-file-access-from-files \
    --virtual-time-budget=3000 --dump-dom "file://$PWD/test.html?phase=$PHASE" 2>/dev/null \
    | sed -n '/<pre id="results">/,/<\/pre>/p' | sed 's/<[^>]*>//g;s/&lt;/</g;s/&gt;/>/g;s/^ *//'
done | tee /dev/stderr | grep -qv '^PASS' && exit 1 || exit 0

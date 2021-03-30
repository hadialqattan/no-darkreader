#!/bin/bash

set -e

FILENAME="nodarkreader"

if [[ ! -s "$FILENAME.js" ]]; then
    echo "$FILENAME.js is an empty file!"
    exit 1
fi

# minifying nodarkreader.js -> nodarkreader.min.js
curl -X POST -s --data-urlencode "input@$FILENAME.js" https://javascript-minifier.com/raw >"$FILENAME.min.js"

if [[ ! -s "$FILENAME.min.js" ]]; then
    echo "$FILENAME.min.js is an empty file!"
    exit 1
fi

echo "$FILENAME.js has minified successfully (please checkout $FILENAME.min.js)."

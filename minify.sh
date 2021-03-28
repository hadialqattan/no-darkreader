#!/bin/bash

set -e

FILENAME="nodarkreader"

# minifying nodarkreader.js -> nodarkreader.min.js
curl -X POST -s --data-urlencode "input@$FILENAME.js" https://javascript-minifier.com/raw >nodarkreader.min.js

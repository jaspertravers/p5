#! /bin/sh
# s is for start

NAME=$1

if [ ! $1 ]; then
  exit 1
fi

if [ ! -e "./sketches/$NAME/$NAME.js" ]; then # if the file does not exist
  echo "creating sketches/$NAME/$NAME.js"
  mkdir sketches/$NAME
  cp scripts/template.js sketches/$NAME/$NAME.js
  cp scripts/main.css sketches/$NAME/main.css
  sed -e "s/SED_TARGET/$NAME/g" scripts/template.html > sketches/$NAME/$NAME.html
fi # the file does exist and we want to start it

echo "starting"
echo "files at sketches/$NAME"
browser-sync start --browser chromium --server --files "./sketches/$NAME/$NAME.js" --index "./sketches/$NAME/$NAME.html"

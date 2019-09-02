#! /bin/sh
# s is for start

NAME=$1

if [ ! $1 ]; then
  exit 1
fi

if [ ! -e "./js/$NAME.js" ]; then # if the file does not exist
  echo "creating js/$NAME"
  cp template/template.js js/$NAME.js
  sed -e "s/SED_TARGET/$NAME/" template/template.html > html/$NAME.html
fi # the file does exist and we want to start it

echo "starting"
echo "file at js/$NAME"
browser-sync start --browser chromium --server --files "./js/$NAME.js" --index "./html/$NAME.html"

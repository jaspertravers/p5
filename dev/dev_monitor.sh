#! /bin/sh

# inotify monitor which reports function and class definition lines on filesave
# source: https://superuser.com/questions/181517/how-to-execute-a-command-whenever-a-file-changes
# as far as I can tell $filename and $1 are effectively the same thing

inotifywait -e close_write -m . |
while read -r directory events filename; do
  if [ "$filename" = $1 ]; then
    ./$2
  fi
done

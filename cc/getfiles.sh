cat paths.txt | while read p; do
  clean=$(python3 -c "import os; print(os.path.normpath('$p').lstrip('/'))")
  mkdir -p "$(dirname "$clean")"
  curl "https://cms-admin-uat.concung.com$p" -o "$clean" -x "http://192.168.12.142:8081" -k
done
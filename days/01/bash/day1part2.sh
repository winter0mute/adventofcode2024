#!/usr/bin/env bash

left_array=()
right_array=()
tempfile=$(mktemp)
counter=0

cat $1 | tr -s ' ' |cut -d' ' -f2 > "${tempfile}"

while read p; do
  IFS=' ' read -r var1 var2 <<< $p
  # echo "$var1-$var2"
  left_array+=("$var1")
  right_array+=("$var2")
done < $1


for i in "${left_array[@]}"; do
    counter=$((counter+(i*$(grep -c "$i" "${tempfile}"))))
    # echo "$(grep -c "$i" "${tempfile}")"
done

echo $counter

rm "${tempfile}"

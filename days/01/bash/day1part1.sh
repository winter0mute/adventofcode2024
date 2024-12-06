#!/usr/bin/env bash

left_array=()
right_array=()
distance=0

while read p; do
  IFS=' ' read -r var1 var2 <<< $p
  # echo "$var1-$var2"
  left_array+=("$var1")
  right_array+=("$var2")
done < $1

IFS=$'\n' sorted_left_array=($(sort -n <<<"${left_array[*]}"))
IFS=$'\n' sorted_right_array=($(sort -n <<<"${right_array[*]}"))

# echo "${sorted_left_array[@]}"
# echo "${sorted_right_array[@]}"

for i in "${!sorted_left_array[@]}"; do
    # printf "%s is in %s\n" "${sorted_left_array[i]}" "${sorted_right_array[i]}"
    if [[ "${sorted_left_array[i]}" -gt "${sorted_right_array[i]}" ]]; then
        distance=$((distance+$((sorted_left_array[i]-sorted_right_array[i]))))
        # echo "$((sorted_left_array[i]-sorted_right_array[i]))"
    else
        distance=$((distance+$((sorted_right_array[i]-sorted_left_array[i]))))
        # echo "$((sorted_right_array[i]-sorted_left_array[i]))"
    fi
done 

echo $distance

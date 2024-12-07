#!/usr/bin/env bash

left_array=()
right_array=()
distance=0
valid=0
safe_reports=0

while read p; do
    IFS=' ' read -r levels <<< $p
    echo "$levels"
    # num_of_reports_per_level=$(echo "$levels" | wc -w)
    IFS=' ' read -r -a array <<< "$levels"
    arraylength=$((${#array[@]}-1))
    # echo "$arraylength"

set -x

    for (( i=0; i<arraylength; i++ ));
        do
        valid=0
        # echo "index: $i, value: ${array[$i]}"
        echo "${array[$i]} - ${array[$i+1]}"
        echo "$((array[i] - array[i+1]))"
        if [[ ${array[$i]} -eq ${array[$i+1]} ]];then
            valid=1
            break
        elif ! [[ $((array[i+1] - array[i])) -le 3 ]];then
            valid=1
            break
        fi
    done
    # arraylength=${#levels[@]}
    # echo "$arraylength"
    # for i in ${levels[@]}
    #     do
    #     echo $i
    # done
    echo
    [[ $valid ]] && safe_reports=$((safe_reports+1))
done < $1


echo "Safe reports: ${safe_reports}"
exit

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

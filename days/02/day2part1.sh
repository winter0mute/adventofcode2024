#!/usr/bin/env bash

counter=0

while read -r p; do
    IFS=' ' read -r levels <<< $p
    # echo "$levels"
    IFS=' ' read -r -a array <<< "$levels"
    arraylength=$((${#array[@]}-1))
    # echo "$arraylength"

    valid=true
    if [[ ${array[0]} -lt ${array[1]} ]]; then
        isitasc=true
    else
        isitasc=false
    fi
    for (( i=0; i<arraylength; i++ )); do
        # echo "${array[$i]} - ${array[$i+1]}" 
        if [[ ${array[i]} -eq ${array[i+1]} ]]; then
            valid=false
            break
        fi

        if [[ $isitasc = true ]];then
            if [[ ${array[i]} -gt ${array[i+1]} ]] || [[ $((array[i+1] - array[i])) -gt 3 ]]; then
                valid=false
                break   
            fi        
        fi

        if [[ $isitasc = false ]];then
            if [[ ${array[i]} -lt ${array[i+1]} ]] || [[ $((array[i] - array[i+1])) -gt 3 ]]; then
                valid=false
                break
            fi            
        fi
    done
    # echo "valid: $valid"
    if [[ $valid = true ]]; then
        # echo asdf
        counter=$((counter+1))
    fi

done < $1

echo $counter

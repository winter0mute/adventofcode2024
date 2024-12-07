#sort by word count
awk '{print NF,$0}' input | sort -nt ' ' | cut -d' ' -f 2-

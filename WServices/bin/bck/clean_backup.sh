#!/bin/bash

maxtime=30*24*3600;
folder=/opt/Files/Backup/DB/*.sql;

for filename in $folder; do
	if [ $filename != "" ]; then
		modsecs=$(date --utc --reference=$filename +%s)
		nowsecs=$(date +%s)
		delta=$(($nowsecs - $modsecs))
		d2=$(($delta - $maxtime))
		if [ $d2 -gt 0  ]; then
			rm -f $filename
			echo "Remove $filename from $2 is $d2 seconds old"
		fi;
	fi;
done
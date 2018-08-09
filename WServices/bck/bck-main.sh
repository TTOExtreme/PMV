#!/bin/bash

interval=$((8*3600));

e1="./bck/create_backup.sh";
e2="./bck/clean_backup.sh";

while true; do
	$e1
	$e2
	sleep $interval;
done

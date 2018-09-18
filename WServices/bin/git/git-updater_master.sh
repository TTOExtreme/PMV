#!/bin/bash
clear
if [ "$1" != "" ]; then
	cd "$1"
	while [[ true -eq true ]]; do
		git remote update > /dev/null
		LOCAL=$(git rev-parse master)
		REMOTE=$(git rev-parse origin/master)
		if [[ $LOCAL = $REMOTE ]]; then
			echo "0"
		else
	    	echo "Changes"
			git clean -f
			git reset --hard
			git pull --force origin master
			systemctl restart pmv-wspv
		fi
		sleep 10;
	done
else
	echo "Please provide a local to mantain updated to";
	echo "use ./###.sh /foo/bar/";
fi;
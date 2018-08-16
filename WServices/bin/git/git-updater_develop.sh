#!/bin/bash
clear
if [ "$1" != "" ]; then
	cd "$1"
	while [[ true -eq true ]]; do
		git remote update > /dev/null
		LOCAL=$(git rev-parse @)
		REMOTE=$(git rev-parse origin/develop)
		if [[ $LOCAL = $REMOTE ]]; then
			echo "0"
		else
	    	echo "Changes"
			git pull --rebase origin develop
			systemctl restart pmv-wspv1
		fi
		sleep 1;
	done
else
	echo "Please provide a local to mantain updated to";
	echo "use ./###.sh /foo/bar/";
fi;
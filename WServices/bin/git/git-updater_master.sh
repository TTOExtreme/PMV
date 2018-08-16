#!/bin/bash
clear
if [ "$1" != "" ]; then
	cd "$1"
	while [[ true -eq true ]]; do
		git remote update > /dev/null
		LOCAL=$(git rev-parse master)
		REMOTE=$(git rev-parse origin/master)
		echo "REMOTE"
		echo $REMOTE
		echo "LOCAL"
		echo $LOCAL
		if [[ $LOCAL = $REMOTE ]]; then
			echo "0"
		else
	    	echo "Changes"
			git pull --pull --force origin master
			systemctl restart pmv-wspv
		fi
		sleep 1;
	done
else
	echo "Please provide a local to mantain updated to";
	echo "use ./###.sh /foo/bar/";
fi;
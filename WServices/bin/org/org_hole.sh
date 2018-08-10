#!/bin/bash
fl='/opt/Files/Holerite/ativos.txt'

while read p; do
	#dat=$(date +%Y-%m)
	d1=$(date +%S)
	d2=$(date +%N)
	d2=${d2:0:3}
	dat="2018-05.$d1$d2"
	m1=${p/.*/};
	m2='000000';
	m3=${m2:${#m1}}
	matric="$m3$m1"
	mkdir "/opt/Files/hole-files/$matric"
	fi="/opt/Files/hole-files/$matric/$dat.txt"
	echo "$p">$fi
	echo "$dat"
done <$fl
rm -f $fl

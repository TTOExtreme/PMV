#!/bin/bash
in='/opt/Files/Ponto/';
out='/opt/Files/web/Files/ponto/'

cd $in
for fil in *.PDF; do
	d1=$(date +%S)
	d2=$(date +%N)
	d2=${d2:0:3}
	s=$(echo -n $out$fil$d1$d2 | sha512sum)
	d=${s:32:16}

	A=${fil:0:6};
	b1=${fil:6};
	b2=${b1:4:2};
	b1=${b1:0:4};
	for fil1 in $out$A/$b1-$b2*.PDF; do
		echo "Remove: $fil1"
		rm -dI "$fil1";
	done;
	b="$b1-$b2.$d.PDF";
	mkdir $out$A;
	B="$out$A/$b";
	echo "Move: $B";
	mv $fil $B;
done;
#${A:0:5}
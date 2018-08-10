#!/bin/bash
out='/opt/Files/Ponto/';
in='/opt/Files/web/Files/ponto/'

cd $in
for fol in *;do
	cd $fol
	for fil in *.PDF; do

		A=${fil:0:4};
		b1=${fil:0:4};
		b2=${b1:1:2};
		b="$fol$b1$b2.PDF";
		B="$out$b";
		echo $B;
		mv $fil $B;
	done;
	cd ..
	rm -rf $fol
done;
#${A:0:5}
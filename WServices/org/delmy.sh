#!/bin/bash
out='/opt/Files/Ponto/';
in='/opt/Files/web/Files/ponto/'

cd $in
for fol in *;do
	cd $fol
	for fil in $1*; do
		if [$2 -eq 'show']; then
			echo $fil;
		fi
		if [$2 -eq 'del']; then
			#rm $fil;
		fi
	done;
	cd ..
	rm -rf $fol
done;
#${A:0:5}

#!/bin/bash

interval=5;

e1="/opt/WServices/org/org_ponto.sh";

while true; do
	$e1
	sleep $interval;
done

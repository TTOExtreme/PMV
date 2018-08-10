#!/bin/bash

dat=$(date +%Y-%m-%d-%H:%M:%S:%N)
f="/opt/Files/Backup/DB/$dat.sql"
echo "write to $f"
mysqldump -uroot -pti@pmv2018 --all-databases > $f

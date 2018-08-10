#!/bin/bash

case "$1" in 
start)
        if [ -e org/log/log3-org.log ]; then
                rm -f bcklog/log3-org.log
        fi
        if [ -e bcklog/log2-org.log ]; then
                mv org/log/log2-org.log org/log/log3-org.log
        fi
	if [ -e org/log/log1-org.log ]; then
		mv org/log/log1-org.log org/log/log2-org.log
	fi
        if [ -e org/log/log0-org.log ]; then
                mv org/log/log0-org.log org/log/log1-org.log
        fi

	 /opt/WServices/org/org-main.sh > org/log/log0-org.log &
	echo $!>/var/run/org-pmv.pid
   	;;
stop)
   	kill `cat /var/run/org-pmv.pid`
   	rm /var/run/org-pmv.pid
   	;;
restart)
   	$0 stop
   	$0 start
   	;;
status)
   	if [ -e /var/run/org-pmv.pid ]; then
      		echo auto-backup is running, pid=`cat /var/run/org-pmv.pid`, log=`cat /opt/WServices/org/log/log0-org.log`
   	else
      		echo auto-backup.sh is NOT running
      		exit 1
   	fi
   	;;
*)
   	echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 

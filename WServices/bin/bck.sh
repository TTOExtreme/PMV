#!/bin/bash

case "$1" in 
start)
        if [ -e bck/log/log3-bck.log ]; then
                rm -f bck/log/log3-bck.log
        fi
        if [ -e bck/log/log2-bck.log ]; then
                mv bck/log/log2-bck.log bck/log/log3-bck.log
        fi
	if [ -e bck/log/log1-bck.log ]; then
		mv bck/log/log1-bck.log bck/log/log2-bck.log
	fi
        if [ -e bck/log/log0-bck.log ]; then
                mv bck/log/log0-bck.log bck/log/log1-bck.log
        fi

	 /opt/WServices/bck/bck-main.sh > bck/log/log0-bck.log &
	echo $!>/var/run/bck-pmv.pid
   	;;
stop)
   	kill `cat /var/run/bck-pmv.pid`
   	rm /var/run/bck-pmv.pid
   	;;
restart)
   	$0 stop
   	$0 start
   	;;
status)
   	if [ -e /var/run/bck-pmv.pid ]; then
      		echo auto-backup is running, pid=`cat /var/run/bck-pmv.pid`, log=`cat /opt/WServices/bck/log/log0-bck.log`
   	else
      		echo auto-backup.sh is NOT running
      		exit 1
   	fi
   	;;
*)
   	echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 

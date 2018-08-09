#!/bin/bash

case "$1" in 
start)
        if [ -e  /opt/WS1/server/log3.log ]; then
                rm -f  /opt/WS1/server/log3.log
        fi
        if [ -e  /opt/WS1/server/log2.log ]; then
                mv  /opt/WS1/server/log2.log  /opt/WS1/server/log3.log
        fi
	if [ -e log1.log ]; then
		mv  /opt/WS1/server/log1.log  /opt/WS1/server/log2.log
	fi
        if [ -e log0.log ]; then
                mv  /opt/WS1/server/log0.log  /opt/WS1/server/log1.log
        fi

	node /opt/WS1/server/clustered.js >  /opt/WS1/server/log0.log &
	echo $!>/var/run/wspv1.pid
   	;;
stop)
   	kill `cat /var/run/wspv1.pid`
   	rm /var/run/wspv1.pid
   	;;
restart)
   	$0 stop
   	$0 start
   	;;
status)
   	if [ -e /var/run/wspv1.pid ]; then
      		echo wspv is running, pid=`cat /var/run/wspv1.pid`, log=`cat /opt/WS1/server/log0.log`
   	else
      		echo wspv.sh is NOT running
      		exit 1
   	fi
   	;;
*)
   	echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 

#!/bin/bash

case "$1" in 
start)
        if [ -e  /opt/PMV/WS/server/log3.log ]; then
                rm -f  /opt/PMV/WS/server/log3.log
        fi
        if [ -e  /opt/PMV/WS/server/log2.log ]; then
                mv  /opt/PMV/WS/server/log2.log  /opt/PMV/WS/server/log3.log
        fi
	if [ -e log1.log ]; then
		mv  /opt/PMV/WS/server/log1.log  /opt/PMV/WS/server/log2.log
	fi
        if [ -e log0.log ]; then
                mv  /opt/PMV/WS/server/log0.log  /opt/PMV/WS/server/log1.log
        fi

	node /opt/PMV/WS/server/clustered.js >  /opt/PMV/WS/server/log0.log &
	echo $!>/var/run/wspv.pid
   	;;
stop)
   	kill `cat /var/run/wspv.pid`
   	rm /var/run/wspv.pid
   	;;
restart)
   	$0 stop
   	$0 start
   	;;
status)
   	if [ -e /var/run/wspv.pid ]; then
      		echo wspv is running, pid=`cat /var/run/wspv.pid`, log=`cat /opt/PMV/WS/server/log0.log`
   	else
      		echo wspv.sh is NOT running
      		exit 1
   	fi
   	;;
*)
   	echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 

#!/bin/bash

case "$1" in 
start)
  git/git-updater_master.sh /opt/PMV/ > git/log/log-master.log &
  echo $!>/var/run/git-up-master.pid

  git/git-updater_develop.sh /opt/PMV-dev/ > git/log/log-developer.log &
  echo $!>/var/run/git-up-developer.pid

    ;;
stop)
    kill `cat /var/run/git-up-master.pid`
    rm /var/run/git-up-master.pid

    kill `cat /var/run/git-up-developer.pid`
    rm /var/run/git-up-developer.pid

    ;;
restart)
    $0 stop
    $0 start
    ;;
status)
    if [ -e /var/run/org-pmv.pid ]; then
          echo auto-update is running, 
          echo pid-master=`cat /var/run/git-up-master.pid` 
          echo pid-dev=`cat /var/run/git-up-developer.pid`
          echo log-master=`cat git/log/log-master`
          echo log-developer=`cat git/log/log-developer`
    else
          echo auto-update is NOT running
          exit 1
    fi
    ;;
*)
    echo "Usage: $0 {start|stop|status|restart}"
esac

exit 0 

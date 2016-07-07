#!/bin/sh
#-------------------------------------------------------------------------------------------------------------
#       系统运行参数
#-------------------------------------------------------------------------------------------------------------
PORT=9999
DIR=$(cd "$(dirname "$0")"; pwd)
APP_PATH=${DIR}/..
APP_MAIN=$APP_PATH/main/scripts/web-server.js
PID=0
if [ -n "$1" ]; then
	PORT=$1
fi
getPID(){
    #netstat=`netstat -nltp|awk '{ print $4  " " $7 }'|grep -E ":::$PORT|0.0.0.0:$PORT|127.0.0.1:$PORT}"|awk  '{print $2}'`
	psres=`ps -ef|awk '{print $2 " " $8 " " $9 " " $10}'|grep "$APP_MAIN_JS"|grep "node"|grep $PORT|awk '{print $1}'`
    if [ -n "$psres" ]; then
		#index=`expr index $netstat "/"`;
        PID=$psres;
    else
        PID=0
    fi
}

getServerStatus(){
    getPID
    echo "================================================================================================================"
    if [ $PID -ne 0 ]; then
        echo "$APP_MAIN is running(PID=$PID,PORT=$PORT)"
        echo "================================================================================================================"
    else
        echo "$APP_MAIN is not running"
        echo "================================================================================================================"
    fi
}
getServerStatus
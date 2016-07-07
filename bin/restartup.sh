#!/bin/sh
#-------------------------------------------------------------------------------------------------------------
#       系统配置检查
#-------------------------------------------------------------------------------------------------------------
echo --------------------PYTHON VERSION----------------------------                         
python --version
if [ $? -ne 0 ]; then
    echo 'FAIL TO  LOAD PYTHON'
	exit
fi
echo --------------------------------------------------------------
echo --------------------NODEJS VERSION----------------------------
node -v
if [ $? -ne 0 ]; then
    echo 'FAIL TO  LOAD NODEJS'
	exit
fi
#-------------------------------------------------------------------------------------------------------------
#       系统运行参数
#-------------------------------------------------------------------------------------------------------------
echo --------------------------------------------------------------
PORT=9999
DIR=$(cd "$(dirname "$0")"; pwd)
APP_PATH=${DIR}/..
APP_MAIN=${APP_PATH}/main/
APP_MAIN_JS=${APP_MAIN}scripts/web-server.js
APP_LOG=${APP_PATH}/log
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

shutdown(){
    getPID
    echo "================================================================================================================"
    if [ $PID -ne 0 ]; then
        echo -n "Stopping $APP_MAIN(PID=$PID,PORT=$PORT)..."
        kill $PID
        if [ $? -eq 0 ]; then
            echo "[Success]"
            echo "================================================================================================================"
        else
            echo "[Failed]"
            echo "================================================================================================================"
        fi
        getPID
        if [ $PID -ne 0 ]; then
            shutdown
        fi
    else
        echo "$APP_MAIN is not running"
        echo "================================================================================================================"
    fi
}

startup(){
    getPID
    echo "================================================================================================================"
    if [ $PID -ne 0 ]; then
        echo "$APP_MAIN_JS already started(PID=$PID,PORT=$PORT)"
        echo "================================================================================================================"
    else
        echo -n "Starting $APP_MAIN_JS"
         if [ ! -d "$APP_LOG" ]; then
            mkdir "$APP_LOG"
         fi
	cd $APP_MAIN
        nohup node $APP_MAIN_JS $PORT > $APP_LOG/nohup.log 2>&1  &
        for i in $(seq 5)
        do
        sleep 0.8
        echo -e  ".\c"
        done
        getPID
        if [ $PID -ne 0 ]; then
            echo "(PID=$PID,PORT=$PORT)...[Success]"
            echo "================================================================================================================"
        else
            echo "[Failed]"
            echo "================================================================================================================"
        fi
    fi
}
shutdown
startup

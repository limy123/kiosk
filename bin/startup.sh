#!/bin/sh
echo --------------------PYTHON VERSION----------------------------                         
python --version
echo --------------------------------------------------------------
echo --------------------NODEJS VERSION----------------------------
node -v
echo --------------------------------------------------------------
export PORT=9999
echo starting web-server.js in $PORT
cd /kiosk/main
LOG_PATH=../logs
if [ ! -x "$LOG_PATH" ]; then 
 mkdir "$LOG_PATH" 
fi 
nohup node scripts/web-server.js $PORT > $LOG_PATH/nohup.log 2>&1  &
cd ../bin
exit 

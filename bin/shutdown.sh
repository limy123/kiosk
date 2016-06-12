#!/bin/sh
PORT=9999
echo will kill the port $PORT
for i in `netstat -nltp|awk '{ print $4  " " $7 }'|grep -E ":::$PORT|0.0.0.0:$PORT|127.0.0.1:$PORT}"|awk  '{print $2}'`;
  do
    echo $i;
    index=`expr index $i "/"`;
    pid=${i:0:index-1};
    echo $pid;
    echo "kill the process named [${i:index}]";
    kill -9 $pid
  done;


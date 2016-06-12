echo --------------------PYTHON VERSION----------------------------                         
python --version
echo --------------------------------------------------------------
echo --------------------NODEJS VERSION----------------------------
node -v
echo --------------------------------------------------------------
set PORT=9999
echo starting web-server.js in %PORT%
cd ../main
node scripts/web-server.js %PORT% > ../logs/nohup.log 2>&1  &
cd ../bin
exit 
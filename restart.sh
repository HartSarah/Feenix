cd /home/vmuser/Feenix
git pull
pkill -f "node index.js"
cd src
npm install
node index.js &

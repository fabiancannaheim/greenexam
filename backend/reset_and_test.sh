#!/bin/bash

source .env

export MYSQL_PWD=$DB_PASS_ROOT

SQL_INIT_FILE="./db/init.sql"

# Drop, recreate the database and source init file
echo "Resetting database..."
mysql -u root -e "DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE $DB_NAME;"
mysql -u root $DB_NAME < $SQL_INIT_FILE
echo "Database reset successful!"
echo ""

echo "Start node server..."
node app.js &
NODE_PID=$!

# Give the server a moment to start
sleep 2

echo ""
echo "Running tests..."
npx jasmine

# Kill the Node server
kill -9 $NODE_PID
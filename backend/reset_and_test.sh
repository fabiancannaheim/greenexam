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

# Reset logs
echo ""
echo "Reset ./logs"

LOG_DIR="./logs"

if [ -d "$LOG_DIR" ]; then
    for file in "$LOG_DIR"/*; do
        if [ -f "$file" ]; then
            truncate -s 0 "$file"
        fi
    done
else
    echo "Directory does not exist: $LOG_DIR"
fi


# Delete all files in ./tmp except .gitkeep
echo ""
echo "Clean ./tmp..."

TMP_DIR="./tmp"

if [ -d "$TMP_DIR" ]; then
    find "$TMP_DIR" -type f -not -name '.gitkeep' -delete
else
    echo "Directory does not exist: $TMP_DIR"
fi

echo "Temporary files cleaned"
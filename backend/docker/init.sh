#!/bin/bash

# Check if a Docker image exists
image_exists() {
    docker image inspect "$1" > /dev/null 2>&1
    return $?
}

# Path to the directories containing the Dockerfiles
py_dockerfile_dir="python"
java_dockerfile_dir="java"

# Check for the Python execution image
if image_exists "pyexe"; then
    echo "Python execution image 'pyexe' already exists."    
else
    echo "Building Python execution image 'pyexe'..."
    docker build -t pyexe "$py_dockerfile_dir"
fi

# Check for the Java execution image
if image_exists "javaexe"; then
    echo "Java execution image 'javaexe' already exists."
else
    echo "Building Java execution image 'javaexe'..."
    docker build -t javaexe "$java_dockerfile_dir"
fi

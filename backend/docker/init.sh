#!/bin/bash

# Check if a Docker image exists
image_exists() {
    docker image inspect "$1" > /dev/null 2>&1
    return $?
}

# Path to the directories containing the Dockerfiles
py_dockerfile_dir="python"
java_dockerfile_dir="java"

py_autocomp_dockerfile_dir="./python_autocomp"

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

# Check for the Java execution image
if image_exists "pyautocomp"; then
    echo "Python autocompletion image 'pyautocomp' already exists."
else
    echo "Building Python autocompletion image 'pyautocomp'..."
    docker build -t pyautocomp "$py_autocomp_dockerfile_dir"
fi
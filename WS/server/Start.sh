#!/bin/bash

int_trap() {
    echo "restarting";
}
trap int_trap INT

for i in {1..10}; do
    clear
    node index.js
done

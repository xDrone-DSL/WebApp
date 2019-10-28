#!/bin/bash
docker build -t xdronedsl/webapp:latest .

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push USER/REPO
set -ex

# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=vivaconagua
# image name
IMAGE=bloob-frontend

docker build -t $USERNAME/$IMAGE:latest .


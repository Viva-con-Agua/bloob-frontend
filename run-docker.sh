docker stop bloob-frontend
docker rm bloob-frontend
docker run -d -it -p 30120:80 --name=bloob-frontend vivaconagua/bloob-frontend

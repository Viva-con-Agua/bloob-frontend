docker stop bloob-frontend
docker rm bloob-frontend
docker run -d -it -p 8085:80 --contextPath=bloob --name=bloob-frontend vivaconagua/bloob-frontend

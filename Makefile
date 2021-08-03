API_CONTAINER_NAME=api
CLIENT_CONTAINER_NAME=client

up:
	@docker-compose up -d

down: up
	@docker-compose down

migrate: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run migrate

test: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run test

api-run-dev: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run dev

api-run-lint: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run lint

api-run-format: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run format

api-run-test: up
	@docker-compose exec $(API_CONTAINER_NAME) npm run test

client-run-start: up
	@docker-compose exec $(CLIENT_CONTAINER_NAME) npm run start

client-run-lint: up
	@docker-compose exec $(CLIENT_CONTAINER_NAME) npm run lint

client-run-format: up
	@docker-compose exec $(CLIENT_CONTAINER_NAME) npm run format

client-run-test: up
	@docker-compose exec $(CLIENT_CONTAINER_NAME) npm run test
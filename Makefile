.PHONY: run-dev
run-dev: 
	npm install
	make compose
	sleep 1
	make migrate
	
.PHONY: compose
compose:
	docker-compose down && docker-compose up -d
	
.PHONY: migrate
migrate:
	docker exec app bash migrations/migrate.sh;

.PHONY: new-migration
new-migration:
	docker exec -w /app/migrations app goose create $(name) sql
	
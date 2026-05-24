.PHONY: frontend
up:
	docker compose up -d
down:
	docker compose down
reset: 
	docker compose down -v
spring:
	cd backend && ./mvnw spring-boot:run
restart: reset up spring
frontend:
	cd frontend && npm run dev

dev:
	(cd backend && ./mvnw spring-boot:run) & \
	(cd frontend && npm run dev)

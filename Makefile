up:
	docker compose up -d
down:
	docker compose down
reset: 
	docker compose down -v
spring:
	cd backend && ./mvnw spring-boot:run
restart: reset up spring

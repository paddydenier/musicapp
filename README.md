# BandMate

BandMate is a full-stack web application consisting of:

- a Spring Boot backend
- a frontend powered by Node.js
- Docker support for containerized development

---

# Requirements

Before starting, make sure you have installed:

- Java (recommended: Java 17+)
- Maven
- Node.js + npm
- Docker + Docker Compose
- `make`

---

# Project Structure

```text
BandMate/
├── backend/
├── frontend/
├── docker-compose.yml
├── Makefile
└── README.md
```

---

# Backend

Start the Spring Boot backend with the help of the Makefile:

```bash
make spring
```

This runs:

```bash
cd backend && ./mvnw spring-boot:run
```

---

# Frontend

Start the frontend development server with:

```bash
make frontend
```

This runs:

```bash
cd frontend && npm run dev
```

---

# Full Development Environment

Run both backend and frontend simultaneously:

```bash
make dev
```

---

# Docker Commands

Start all Docker services in detached mode:

```bash
make up
```

Stop all running containers:

```bash
make down
```

Stop and fully reset containers and volumes:

```bash
make reset
```

---

# Restart Everything

To fully restart the application stack:

```bash
make restart
```

---

# Available Make Commands

| Command | Description |
|---|---|
| `make up` | Start Docker containers |
| `make down` | Stop Docker containers |
| `make reset` | Remove containers and volumes |
| `make spring` | Run Spring Boot backend |
| `make frontend` | Run frontend dev server |
| `make dev` | Run backend and frontend together |
| `make restart` | Reset and restart everything |

---

# Development Notes

- Backend runs inside the `backend/` directory
- Frontend runs inside the `frontend/` directory
- Docker is used for local infrastructure/services
- The frontend uses Vite (`npm run dev`) for development

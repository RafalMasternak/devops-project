# DevOps Project

Projekt demonstracyjny integrujący Docker, Docker Compose i GitHub Actions.

## Technologie

- **Backend:** Node.js + Express
- **Baza danych:** PostgreSQL
- **Konteneryzacja:** Docker (multi-stage build)
- **Orkiestracja:** Docker Compose
- **CI/CD:** GitHub Actions

## Uruchomienie

### Docker Compose (zalecane)

```bash
docker compose up --build
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

### Lokalne uruchomienie (development)

```bash
npm install
npm run dev
```

## Endpointy API

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/health` | Health check |
| GET | `/tasks` | Lista wszystkich zadań |
| POST | `/tasks` | Dodaj nowe zadanie |
| DELETE | `/tasks/:id` | Usuń zadanie |

## Testowanie

```bash
npm test
```

## Linting

```bash
npm run lint
```

## CI/CD Pipeline

- **main branch:** Testy → Lint → Build Docker image
- **Pull requests:** Testy → Lint

## Struktura projektu

```
.
├── .github/workflows/    # GitHub Actions
│   ├── main.yml          # Pipeline dla main
│   └── pull-request.yml  # Pipeline dla PR
├── src/
│   ├── index.js          # Aplikacja Express
│   └── index.test.js     # Testy
├── Dockerfile            # Multi-stage build
├── docker-compose.yml    # Konfiguracja kontenerów
└── package.json
```

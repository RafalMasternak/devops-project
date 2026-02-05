# Sprawozdanie z Projektu DevOps

## Strona tytułowa

**Imię i nazwisko:** Rafał Masternak  
**Numer indeksu:** _[UZUPEŁNIJ]_  
**Kod kursu:** _[UZUPEŁNIJ]_  
**Data:** 05.02.2026  
**Temat projektu:** Środowisko DevOps z Docker, Docker Compose i GitHub Actions

---

## 1. Opis wykonanych działań

### 1.1. Aplikacja
Utworzono REST API w technologii **Node.js + Express** z następującymi funkcjonalnościami:
- Endpoint `/health` - sprawdzanie statusu aplikacji
- Endpoint `/tasks` (GET) - pobieranie listy zadań z bazy danych
- Endpoint `/tasks` (POST) - dodawanie nowych zadań
- Endpoint `/tasks/:id` (DELETE) - usuwanie zadań

Aplikacja wykorzystuje **PostgreSQL** jako bazę danych i automatycznie tworzy wymaganą tabelę przy starcie.

### 1.2. Konteneryzacja (Docker)
Utworzono **Dockerfile** z wykorzystaniem **multi-stage build**:
- **Stage 1 (builder):** Instalacja zależności produkcyjnych
- **Stage 2 (production):** Kopiowanie zależności, dodanie użytkownika nieprivilegowanego dla bezpieczeństwa

Uzasadnienie multi-stage build:
- Zmniejszenie rozmiaru końcowego obrazu
- Lepsza organizacja procesu budowania
- Zwiększone bezpieczeństwo (brak narzędzi buildowych w obrazie produkcyjnym)

### 1.3. Docker Compose
Skonfigurowano `docker-compose.yml` uruchamiający **2 kontenery**:
1. **api** - aplikacja Node.js
2. **db** - baza danych PostgreSQL

Konfiguracja zawiera:
- Healthcheck dla bazy danych
- Dependency między kontenerami (api czeka na db)
- Persistent volume dla danych PostgreSQL
- Zmienne środowiskowe dla konfiguracji

### 1.4. CI/CD (GitHub Actions)

#### Pipeline dla brancha `main` (`.github/workflows/main.yml`):
1. **Job test:**
   - Instalacja zależności
   - Uruchomienie lintera (ESLint)
   - Uruchomienie testów (Jest)

2. **Job build:**
   - Budowanie obrazu Docker
   - Testowanie uruchomienia kontenera
   - Weryfikacja endpointu `/health`

#### Pipeline dla Pull Requests (`.github/workflows/pull-request.yml`):
- Instalacja zależności
- Uruchomienie lintera
- Uruchomienie testów

**Uzasadnienie:** Różne pipeline'y pozwalają na optymalizację - PR nie budują obrazów Docker (szybszy feedback), a main dodatkowo weryfikuje konteneryzację.

### 1.5. Testy i jakość kodu
- **Jest** - framework do testów jednostkowych
- **ESLint** - linter zapewniający spójność kodu
- Testy pokrywają kluczowe endpointy API

---

## 2. Instrukcja uruchomienia projektu

### 2.1. Wymagania
- Docker Desktop (Windows/Mac) lub Docker Engine (Linux)
- Docker Compose
- Git

### 2.2. Klonowanie repozytorium
```bash
git clone https://github.com/RafalMasternak/devops-project.git
cd devops-project
```

### 2.3. Uruchomienie za pomocą Docker Compose (zalecane)
```bash
docker compose up --build
```

Po uruchomieniu aplikacja będzie dostępna pod adresem:
- **API:** http://localhost:3000
- **PostgreSQL:** localhost:5432

### 2.4. Testowanie API

#### Health check
```bash
curl http://localhost:3000/health
```

#### Dodanie zadania
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Pierwsze zadanie","description":"Opis zadania"}'
```

#### Pobranie listy zadań
```bash
curl http://localhost:3000/tasks
```

#### Usunięcie zadania
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### 2.5. Zatrzymanie aplikacji
```bash
docker compose down
```

Aby usunąć także dane z bazy:
```bash
docker compose down -v
```

### 2.6. Uruchomienie lokalne (development)
```bash
npm install
npm run dev
```

**Uwaga:** Wymaga lokalnie zainstalowanego PostgreSQL lub osobno uruchomionej bazy w Docker.

### 2.7. Uruchomienie testów
```bash
npm install
npm test
```

### 2.8. Uruchomienie lintera
```bash
npm install
npm run lint
```

---

## 3. Struktura projektu

```
devops-project/
├── .github/
│   └── workflows/
│       ├── main.yml           # Pipeline dla main branch
│       └── pull-request.yml   # Pipeline dla PR
├── src/
│   ├── index.js               # Główna aplikacja Express
│   └── index.test.js          # Testy jednostkowe
├── .eslintrc.json             # Konfiguracja ESLint
├── .gitignore                 # Ignorowane pliki
├── Dockerfile                 # Multi-stage build
├── docker-compose.yml         # Orkiestracja kontenerów
├── package.json               # Zależności Node.js
├── README.md                  # Dokumentacja projektu
└── SPRAWOZDANIE.md           # Niniejsze sprawozdanie
```

---

## 4. Spełnienie wymagań projektu

| Wymaganie | Spełnione | Lokalizacja |
|-----------|-----------|-------------|
| Aplikacja działa (API) | ✅ | `src/index.js` |
| Obraz Docker | ✅ | `Dockerfile` |
| Pipeline CI (testy/lint) | ✅ | `.github/workflows/` |
| Multi-stage build | ✅ | `Dockerfile` (2 stage) |
| Docker Compose | ✅ | `docker-compose.yml` |
| Oddzielne pipeline'y | ✅ | `main.yml` + `pull-request.yml` |
| Baza danych | ✅ | PostgreSQL |
| Co najmniej 2 kontenery | ✅ | api + db |

---

## 5. Podsumowanie

Projekt spełnia wszystkie wymagania na ocenę **4.0**:
- Funkcjonalne REST API z bazą danych PostgreSQL
- Pełna konteneryzacja z użyciem multi-stage build
- Orkiestracja dwóch kontenerów przez Docker Compose
- Zautomatyzowane pipeline'y CI/CD w GitHub Actions
- Testy jednostkowe i linting kodu

Link do repozytorium: https://github.com/RafalMasternak/devops-project

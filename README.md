# Boilerplate FastAPI + React + Vite + SQLAlchemy

Un boilerplate moderno y completo para iniciar proyectos full-stack con **FastAPI** (backend) y **React + Vite** (frontend). Incluye toda la configuración necesaria para desarrollo ágil, testing, linting, CI/CD y deployment.Un punto de partida moderno que combina **FastAPI** en el backend y **React + Vite** en el frontend.
Incluye configuración de pruebas, linters, gestión de entornos y scripts para acelerar el desarrollo.

## 🎯 Características principales
## Características principales

- **Backend FastAPI** estructurado en capas (`core`, `api`, `db`, `schemas`, `models`, `tests`).

- **Frontend React + Vite** con Hot Module Replacement (HMR), React Query para manejo de estado remoto, y Axios para HTTP.
- **Base de datos** con SQLAlchemy (async) + Alembic para migraciones versionadas.

- Configuración de CORS, logging, settings con `pydantic-settings` y ejemplo de endpoint de salud.

- **Estilos** con Tailwind CSS v3 preconfigurado.
- Frontend React con Vite, React Query y Axios listo para consumir el backend.

- **Linting & Formatting**: \- Persistencia de datos con **SQLAlchemy (asyncio)** y **Alembic** para migraciones.

  - Backend: Ruff (linting + formatting)
  - Frontend: ESLint + Prettier + JSDoc

- Compatibilidad con Docker Compose para levantar ambos servicios.

- **Testing**:
  - Backend: Pytest + pytest-asyncio + pytest-cov

## Requisitos previos

  - Frontend: Vitest + Testing Library
- **CI/CD**: GitHub Actions con linting, testing, coverage, y builds Docker.

- Python 3.11+

- **Pre-commit hooks** para garantizar calidad de código antes de commits.
- Node.js 20+

- **Rate limiting** (slowapi) y manejo de errores global en el backend.

## Coaxios — FastAPI (backend) + React + Vite (frontend)
# Boilerplate FastAPI + React + Vite + SQLAlchemy# Boilerplate FastAPI + React

 

Un boilerplate moderno y completo para iniciar proyectos full-stack con **FastAPI** (backend) y **React + Vite** (frontend). Incluye toda la configuración necesaria para desarrollo ágil, testing, linting, CI/CD y deployment.Un punto de partida moderno que combina **FastAPI** en el backend y **React + Vite** en el frontend.

Incluye configuración de pruebas, linters, gestión de entornos y scripts para acelerar el desarrollo.

## 🎯 Características principales

## Características principales

- **Backend FastAPI** estructurado en capas (`core`, `api`, `db`, `schemas`, `models`, `tests`).

- **Frontend React + Vite** con Hot Module Replacement (HMR), React Query para manejo de estado remoto, y Axios para HTTP.- Backend FastAPI estructurado en capas (`core`, `api`, `schemas`, `tests`).

- **Base de datos** con SQLAlchemy (async) + Alembic para migraciones versionadas.- Configuración de CORS, logging, settings con `pydantic-settings` y ejemplo de endpoint de salud.

- **Estilos** con Tailwind CSS v3 preconfigurado.- Frontend React con Vite, React Query y Axios listo para consumir el backend.

- **Linting & Formatting**: \- Persistencia de datos con **SQLAlchemy (asyncio)** y **Alembic** para migraciones.

  - Backend: Ruff (linting + formatting)- Tooling completo: ESLint + Prettier, Vitest + Testing Library, Pytest + HTTPX.

  - Frontend: ESLint + Prettier + JSDoc- Compatibilidad con Docker Compose para levantar ambos servicios.

- **Testing**:

  - Backend: Pytest + pytest-asyncio + pytest-cov## Requisitos previos

  - Frontend: Vitest + Testing Library

- **CI/CD**: GitHub Actions con linting, testing, coverage, y builds Docker.- Python 3.11+

- **Pre-commit hooks** para garantizar calidad de código antes de commits.- Node.js 20+

- **Rate limiting** (slowapi) y manejo de errores global en el backend.- npm 10+

# Coaxios — FastAPI (backend) + React + Vite (frontend)

Proyecto full-stack que combina un backend en FastAPI y un frontend en React con Vite.
Este repositorio contiene una plantilla lista para desarrollo local, pruebas, linting y despliegue con Docker.

Contenido rápido:

- Backend: FastAPI + SQLAlchemy (async) + Alembic
- Frontend: React + Vite, Tailwind CSS
- Testing: Pytest (backend), Vitest (frontend)
- Linting: Ruff (backend), ESLint + Prettier (frontend)
- Docker Compose para orquestar ambos servicios

## 🧩 Estructura del proyecto

```
. 
├── backend/        # Código y configuración del backend (FastAPI)
├── frontend/       # Código del frontend (React + Vite)
├── scripts/        # Scripts útiles para Windows
├── docker-compose.yml
├── Makefile
└── README.md
```

## ⚙️ Requisitos previos

- Python 3.11+
- Node.js 20+ (npm 10+)
- Git
- Docker (opcional)

## 🚀 Puesta en marcha (desarrollo)

Las instrucciones siguientes presuponen que estás en Windows PowerShell (pwsh). Adapta comandos para macOS/Linux si hace falta.

### 1) Backend (local)

```powershell
cd backend
python -m venv .venv
. .\.venv\Scripts\Activate.ps1   # activar virtualenv en PowerShell
pip install -r requirements.txt
# Aplicar migraciones (si corresponde)
.venv\Scripts\alembic upgrade head
# Iniciar servidor de desarrollo
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

La API quedará disponible en http://localhost:8000

También puedes usar Makefile si está configurado:

```powershell
cd backend
make dev-backend   # si el Makefile tiene este objetivo
```

### 2) Frontend (local)

```powershell
cd frontend
npm install
npm run dev
```

El frontend se sirve por defecto en http://localhost:5173 y puede tener proxy configurado hacia el backend para desarrollo.

### 3) Levantar todo con Docker Compose (opcional)

```powershell
docker compose up --build
```

Esto construye y levanta ambos servicios en contenedores.

## 🔐 Variables de entorno

Copiar los ejemplos de entorno y adaptarlos según tu entorno local:

- Backend: `backend/.env.example` → `backend/.env`
- Frontend: `frontend/.env.example` → `frontend/.env`

Revisa `backend/.env.example` para las variables esperadas (DATABASE_URL, BACKEND_CORS_ORIGINS, etc.).

## 🧪 Tests

Backend (ejecutar desde la carpeta `backend`):

```powershell
cd backend
pytest --cov=app --cov-report=html
```

Frontend (desde `frontend`):

```powershell
cd frontend
npm run test
```

Si hay un `Makefile` con objetivos `test` o `coverage`, puedes usar `make test` desde la raíz.

## 🧰 Linting y formato

Backend (Ruff):

```powershell
cd backend
ruff check .
ruff format .
```

Frontend (ESLint / Prettier):

```powershell
cd frontend
npm run lint
npm run format
```

## 📦 Docker

# Coaxios — FastAPI (backend) + React + Vite (frontend)

Proyecto full-stack que combina un backend en FastAPI y un frontend en React con Vite.
Este repositorio contiene una plantilla lista para desarrollo local, pruebas, linting y despliegue con Docker.

Contenido rápido:

- Backend: FastAPI + SQLAlchemy (async) + Alembic
- Frontend: React + Vite, Tailwind CSS
- Testing: Pytest (backend), Vitest (frontend)
- Linting: Ruff (backend), ESLint + Prettier (frontend)
- Docker Compose para orquestar ambos servicios

## 🧩 Estructura del proyecto

```
.
├── backend/        # Código y configuración del backend (FastAPI)
├── frontend/       # Código del frontend (React + Vite)
├── scripts/        # Scripts útiles para Windows
├── docker-compose.yml
├── Makefile
└── README.md
```

## ⚙️ Requisitos previos

- Python 3.11+
- Node.js 20+ (npm 10+)
- Git
- Docker (opcional)

## 🚀 Puesta en marcha (desarrollo)

Las instrucciones siguientes presuponen que estás en Windows PowerShell (pwsh). Adapta comandos para macOS/Linux si hace falta.

### 1) Backend (local)

```powershell
cd backend
python -m venv .venv
. .\.venv\Scripts\Activate.ps1   # activar virtualenv en PowerShell
pip install -r requirements.txt
# Aplicar migraciones (si corresponde)
.venv\Scripts\alembic upgrade head
# Iniciar servidor de desarrollo
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

La API quedará disponible en http://localhost:8000

También puedes usar Makefile si está configurado:

```powershell
cd backend
make dev-backend   # si el Makefile tiene este objetivo
```

### 2) Frontend (local)

```powershell
cd frontend
npm install
npm run dev
```

El frontend se sirve por defecto en http://localhost:5173 y puede tener proxy configurado hacia el backend para desarrollo.

### 3) Levantar todo con Docker Compose (opcional)

```powershell
docker compose up --build
```

Esto construye y levanta ambos servicios en contenedores.

## � Variables de entorno

Copiar los ejemplos de entorno y adaptarlos según tu entorno local:

- Backend: `backend/.env.example` → `backend/.env`
- Frontend: `frontend/.env.example` → `frontend/.env`

Revisa `backend/.env.example` para las variables esperadas (DATABASE_URL, BACKEND_CORS_ORIGINS, etc.).

## 🧪 Tests

Backend (ejecutar desde la carpeta `backend`):

```powershell
cd backend
pytest --cov=app --cov-report=html
```

Frontend (desde `frontend`):

```powershell
cd frontend
npm run test
```

Si hay un `Makefile` con objetivos `test` o `coverage`, puedes usar `make test` desde la raíz.

## 🧰 Linting y formato

Backend (Ruff):

```powershell
cd backend
ruff check .
ruff format .
```

Frontend (ESLint / Prettier):

```powershell
cd frontend
npm run lint
npm run format
```

## 📦 Docker

# Coaxios — FastAPI (backend) + React + Vite (frontend)

Proyecto full-stack que combina un backend en FastAPI y un frontend en React con Vite.
Este repositorio contiene una plantilla lista para desarrollo local, pruebas, linting y despliegue con Docker.

Contenido rápido:

- Backend: FastAPI + SQLAlchemy (async) + Alembic
- Frontend: React + Vite, Tailwind CSS
- Testing: Pytest (backend), Vitest (frontend)
- Linting: Ruff (backend), ESLint + Prettier (frontend)
- Docker Compose para orquestar ambos servicios

## 🧩 Estructura del proyecto

```
.
├── backend/        # Código y configuración del backend (FastAPI)
├── frontend/       # Código del frontend (React + Vite)
├── scripts/        # Scripts útiles para Windows
├── docker-compose.yml
├── Makefile
└── README.md
```

## ⚙️ Requisitos previos

- Python 3.11+
- Node.js 20+ (npm 10+)
- Git
- Docker (opcional)

## 🚀 Puesta en marcha (desarrollo)

Las instrucciones siguientes presuponen que estás en Windows PowerShell (pwsh). Adapta comandos para macOS/Linux si hace falta.

### 1) Backend (local)

```powershell
cd backend
python -m venv .venv
. .\.venv\Scripts\Activate.ps1   # activar virtualenv en PowerShell
pip install -r requirements.txt
# Aplicar migraciones (si corresponde)
.venv\Scripts\alembic upgrade head
# Iniciar servidor de desarrollo
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

La API quedará disponible en http://localhost:8000

También puedes usar Makefile si está configurado:

```powershell
cd backend
make dev-backend   # si el Makefile tiene este objetivo
```

### 2) Frontend (local)

```powershell
cd frontend
npm install
npm run dev
```

El frontend se sirve por defecto en http://localhost:5173 y puede tener proxy configurado hacia el backend para desarrollo.

### 3) Levantar todo con Docker Compose (opcional)

```powershell
docker compose up --build
```

Esto construye y levanta ambos servicios en contenedores.

## 🔐 Variables de entorno

Copiar los ejemplos de entorno y adaptarlos según tu entorno local:

- Backend: `backend/.env.example` → `backend/.env`
- Frontend: `frontend/.env.example` → `frontend/.env`

Revisa `backend/.env.example` para las variables esperadas (DATABASE_URL, BACKEND_CORS_ORIGINS, etc.).

## 🧪 Tests

Backend (ejecutar desde la carpeta `backend`):

```powershell
cd backend
pytest --cov=app --cov-report=html
```

Frontend (desde `frontend`):

```powershell
cd frontend
npm run test
```

Si hay un `Makefile` con objetivos `test` o `coverage`, puedes usar `make test` desde la raíz.

## 🧰 Linting y formato

Backend (Ruff):

```powershell
cd backend
ruff check .
ruff format .
```

Frontend (ESLint / Prettier):

```powershell
cd frontend
npm run lint
npm run format
```

## 📦 Docker

Hay `Dockerfile` en `backend/` y `frontend/` y un `docker-compose.yml` en la raíz para orquestar ambos servicios. Para pruebas de despliegue local:

```powershell
docker compose up --build
```

## 🛠️ Tareas recomendadas / próximos pasos

- Añadir o configurar autenticación (JWT / OAuth2) en `backend`.
- Añadir más tests e integrar coverage en CI.
- Configurar CI/CD (GitHub Actions) para pruebas, lint y build.

---

Si quieres que adapte el README para incluir ejemplos de comandos concretos (por ejemplo, targets del `Makefile` que uses), o que lo traduzca/acomode a otro idioma, dime y lo ajusto.

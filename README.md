# GitHub MCP Server

Servidor **MCP (Model Context Protocol)** desarrollado con **Node.js, TypeScript, Express, Zod y Octokit**, que permite a un agente de Inteligencia Artificial interactuar con GitHub mediante herramientas (*Tools*).

El proyecto utiliza **Streamable HTTP** para permitir la conexión con clientes MCP como **MCP Inspector** y Antigravity.

## Descripción

El objetivo del proyecto es conectar un agente de IA con GitHub para ejecutar operaciones reales mediante herramientas.

El servidor implementa cinco herramientas principales:

* `create_repository` — crea repositorios.
* `create_issue` — crea issues.
* `list_repositories` — lista repositorios.
* `create_commit` — crea o actualiza archivos mediante commits.
* `list_issues` — lista issues.

Los datos de entrada se validan mediante **Zod** y las operaciones sobre GitHub se realizan mediante **Octokit**.

## Tecnologías

* Node.js
* TypeScript
* Express
* Model Context Protocol (MCP)
* `@modelcontextprotocol/sdk`
* Octokit
* Zod
* Vitest
* Git
* GitHub API

## Arquitectura

```text
Usuario
   ↓
Antigravity / MCP Inspector
   ↓
Cliente MCP
   ↓ Streamable HTTP
GitHub MCP Server
   ↓
Tools + Zod
   ↓
Octokit
   ↓
GitHub API
```

El servidor funciona como intermediario entre el agente de IA y GitHub.

## Estructura

```text
Proyecto-M5-Agustin-Spataro/
│
├── src/
│   ├── app.ts
│   ├── mcp.ts
│   ├── types.ts
│   ├── errors/
│   │   └── index.ts
│   ├── github/
│   │   ├── client.ts
│   │   └── operations.ts
│   ├── schemas/
│   │   └── index.ts
│   ├── tools/
│   │   ├── create-commit.ts
│   │   ├── create-issue.ts
│   │   ├── create-repository.ts
│   │   ├── list-issues.ts
│   │   ├── list-repositories.ts
│   │   ├── validate.ts
│   │   └── index.ts
│   └── utils/
│       ├── logging.ts
│       └── retry.ts
│
├── tests/
│   ├── github.test.ts
│   ├── schemas.test.ts
│   └── tools.test.ts
│
├── server.ts
├── antigravity-mcp.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Configuración

Crear un archivo `.env`:

```env
GITHUB_TOKEN=tu_token_de_github
PORT=3000
```

El token de GitHub es privado y **no debe subirse al repositorio**.

El `.gitignore` incluye:

```text
node_modules/
dist/
.env
coverage/
```

## Instalación

Clonar el proyecto:

```bash
git clone https://github.com/spataro787/Proyecto-M5--Agustin-Spataro.git
cd Proyecto-M5--Agustin-Spataro
npm install
```

Crear `.env` a partir de `.env.example` y configurar el token de GitHub.

## Compilar

```bash
npm run build
```

La compilación genera los archivos JavaScript en `dist/`.

## Ejecutar

```bash
npm start
```

El servidor funciona por defecto en:

```text
http://localhost:3000
```

El endpoint MCP es:

```text
http://localhost:3000/mcp
```

## Health Check

Comprobar que el servidor está funcionando:

```bash
curl http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

## Herramientas

### `create_repository`

Crea un repositorio nuevo.

```json
{
  "name": "mi-repositorio",
  "description": "Repositorio creado mediante MCP",
  "private": false
}
```

### `create_issue`

Crea una issue.

```json
{
  "owner": "spataro787",
  "repo": "Proyecto-M5--Agustin-Spataro",
  "title": "Nueva issue",
  "body": "Descripción de la issue"
}
```

### `list_repositories`

Lista los repositorios del usuario autenticado.

```json
{}
```

También puede recibir opciones como:

```json
{
  "visibility": "all",
  "affiliation": "owner"
}
```

### `create_commit`

Crea o actualiza un archivo y realiza un commit.

```json
{
  "owner": "spataro787",
  "repo": "Proyecto-M5--Agustin-Spataro",
  "branch": "main",
  "path": "archivo.txt",
  "message": "Nuevo commit",
  "content": "Contenido del archivo"
}
```

### `list_issues`

Lista las issues de un repositorio.

```json
{
  "owner": "spataro787",
  "repo": "Proyecto-M5--Agustin-Spataro",
  "state": "open"
}
```

Estados disponibles:

```text
open
closed
all
```

## Endpoints HTTP

```text
GET  /health
POST /mcp
POST /tool/create_repository
POST /tool/create_issue
POST /tool/list_repositories
POST /tool/create_commit
POST /tool/list_issues
```

## Ejemplos con cURL

Listar repositorios:

```bash
curl -X POST http://localhost:3000/tool/list_repositories \
  -H "Content-Type: application/json" \
  -d "{}"
```

Listar issues:

```bash
curl -X POST http://localhost:3000/tool/list_issues \
  -H "Content-Type: application/json" \
  -d '{"owner":"spataro787","repo":"Proyecto-M5--Agustin-Spataro"}'
```

Crear una issue:

```bash
curl -X POST http://localhost:3000/tool/create_issue \
  -H "Content-Type: application/json" \
  -d '{"owner":"spataro787","repo":"Proyecto-M5--Agustin-Spataro","title":"Nueva prueba MCP","body":"Issue creada mediante GitHub MCP Server"}'
```

Crear un commit:

```bash
curl -X POST http://localhost:3000/tool/create_commit \
  -H "Content-Type: application/json" \
  -d '{"owner":"spataro787","repo":"Proyecto-M5--Agustin-Spataro","branch":"main","path":"mcp-test.txt","message":"Prueba create commit MCP","content":"Commit creado mediante GitHub MCP Server"}'
```

## MCP Inspector

Iniciar MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Configurar la conexión utilizando:

```text
Servidor: github-mcp-server
Transporte: Streamable HTTP
URL: http://localhost:3000/mcp
```

Una vez conectado deben aparecer las cinco herramientas:

```text
create_repository
create_issue
list_repositories
create_commit
list_issues
```

## Antigravity

El archivo `antigravity-mcp.json` contiene la configuración necesaria para conectar el servidor con un cliente MCP compatible.

Endpoint:

```text
http://localhost:3000/mcp
```

Transporte:

```text
streamable-http
```

## Validación

Los parámetros de entrada se validan utilizando **Zod** antes de ejecutar operaciones contra GitHub.

Esto permite detectar datos incorrectos antes de realizar la solicitud a la API.

Ejemplo de datos necesarios para `create_commit`:

```text
owner
repo
branch
path
message
content
```

## Manejo de errores

El proyecto contempla diferentes tipos de errores:

```text
ValidationError
AuthenticationError
GitHubAPIError
NetworkError
```

Permiten diferenciar problemas de:

* Validación.
* Autenticación.
* API de GitHub.
* Conexión de red.

## Testing

Las pruebas se realizan con **Vitest**.

Ejecutar:

```bash
npm test
```

Pruebas realizadas:

```text
github.test.ts
schemas.test.ts
tools.test.ts
```

Resultado:

```text
3 test files passed
15 tests passed
```

## Scripts

```bash
npm run build
npm start
npm run dev
npm test
npm run lint
```

* `npm run build` — compila TypeScript.
* `npm start` — inicia el servidor compilado.
* `npm run dev` — ejecuta el proyecto en desarrollo.
* `npm test` — ejecuta las pruebas.
* `npm run lint` — comprueba el código TypeScript.

## Flujo de funcionamiento

Ejemplo:

```text
Usuario:
"Crea un issue en mi repositorio"

        ↓

Agente de IA

        ↓

Identifica create_issue

        ↓

Cliente MCP

        ↓

GitHub MCP Server

        ↓

Zod valida los datos

        ↓

create_issue

        ↓

Octokit

        ↓

GitHub API

        ↓

Issue creada

        ↓

Resultado al agente

        ↓

Respuesta al usuario
```

## Pruebas realizadas

Durante el desarrollo se verificó:

```text
✓ GitHub Token
✓ Conexión con GitHub
✓ Octokit
✓ Express
✓ MCP SDK
✓ Streamable HTTP
✓ MCP Inspector
✓ /health
✓ /mcp
✓ create_repository
✓ create_issue
✓ list_repositories
✓ create_commit
✓ list_issues
✓ Validación Zod
✓ Manejo de errores
✓ Tests
✓ Build
```

También se comprobó la creación real de repositorios, issues y commits en GitHub.

## Problemas solucionados

Durante el desarrollo se solucionaron problemas relacionados con:

* Tokens de GitHub inválidos o expirados.
* Puerto `3000` ocupado.
* Conexión de MCP Inspector.
* Configuración de Streamable HTTP.
* Validación de parámetros de `create_commit`.
* Instalación del SDK de MCP.
* Compilación de TypeScript.
* Pruebas automatizadas.

Para comprobar qué proceso utiliza el puerto `3000` en Windows:

```bash
netstat -ano | findstr :3000
```

Para finalizar un proceso:

```bash
taskkill //PID NUMERO_PID //F
```

## Estado del proyecto

```text
✓ Node.js configurado
✓ TypeScript configurado
✓ Express funcionando
✓ Octokit funcionando
✓ Zod funcionando
✓ MCP SDK instalado
✓ GitHub conectado
✓ Streamable HTTP funcionando
✓ MCP Inspector funcionando
✓ 5 herramientas implementadas
✓ Tests aprobados
✓ Build aprobado
✓ Proyecto listo para demostración
```

## Objetivo del proyecto

El proyecto demuestra cómo utilizar **Model Context Protocol** para conectar un agente de Inteligencia Artificial con un servicio externo como GitHub.

La arquitectura permite que el agente solicite operaciones mediante lenguaje natural y que el servidor MCP transforme esas solicitudes en acciones concretas y validadas contra la API de GitHub.

## Conclusión

**GitHub MCP Server** es un servidor MCP desarrollado con Node.js y TypeScript que permite ejecutar operaciones reales de GitHub mediante herramientas.

Integra:

```text
Node.js
TypeScript
MCP
Express
Zod
Octokit
GitHub API
Vitest
```

El proyecto cuenta con cinco herramientas principales, validación de datos, manejo de errores, pruebas automatizadas, conexión mediante Streamable HTTP y compatibilidad con MCP Inspector y clientes MCP como Antigravity.

**Proyecto M5 — GitHub MCP Server**
**Desarrollado por Agustín Spataro**

# GitHub MCP Server

Servidor **MCP (Model Context Protocol)** desarrollado con **Node.js, TypeScript, Express, Zod y Octokit**, que permite a un agente de Inteligencia Artificial interactuar con GitHub mediante herramientas (*Tools*).

El proyecto utiliza **Streamable HTTP** para permitir la conexión con clientes MCP como **MCP Inspector** y **Antigravity**.

---

# 📌 Descripción

El objetivo del proyecto es conectar un agente de Inteligencia Artificial con GitHub para ejecutar operaciones reales mediante herramientas MCP.

El servidor funciona como intermediario entre el agente de IA y la API de GitHub.

En lugar de que el agente tenga que implementar directamente las operaciones de GitHub, puede utilizar las herramientas proporcionadas por este servidor.

El proyecto implementa cinco herramientas principales:

* `create_repository` — crea repositorios.
* `create_issue` — crea issues.
* `list_repositories` — lista repositorios.
* `create_commit` — crea o actualiza archivos mediante commits.
* `list_issues` — lista issues.

Los datos de entrada se validan mediante **Zod** y las operaciones sobre GitHub se realizan mediante **Octokit**.

---

# 🎯 ¿Por qué es útil?

Este proyecto permite automatizar tareas de GitHub utilizando lenguaje natural mediante un agente de Inteligencia Artificial.

## Casos de uso

### 1. Automatización de repositorios

Un agente puede solicitar la creación de un nuevo repositorio sin necesidad de realizar manualmente el proceso desde GitHub.

Ejemplo:

> "Creá un repositorio llamado proyecto-prueba."

---

### 2. Gestión de Issues

El agente puede crear y consultar issues de un repositorio.

Ejemplo:

> "Creá una issue indicando que hay un error en el login."

---

### 3. Consulta de repositorios

El agente puede consultar los repositorios disponibles en la cuenta autenticada.

Ejemplo:

> "Mostrame mis repositorios de GitHub."

---

### 4. Automatización de commits

El servidor permite crear o actualizar archivos dentro de un repositorio mediante commits.

Ejemplo:

> "Creá un archivo README.txt con el contenido indicado y hacé un commit."

---

### 5. Integración con agentes de IA

La principal utilidad del proyecto es permitir que un agente de IA utilice GitHub como una herramienta externa mediante el protocolo MCP.

---

# 🧰 Tecnologías utilizadas

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
* Streamable HTTP
* MCP Inspector
* Antigravity

---

# 💻 Requisitos del sistema

Antes de instalar el proyecto se recomienda contar con:

* **Node.js 18 o superior**
* **npm 9 o superior**
* Git
* Una cuenta de GitHub
* Un GitHub Personal Access Token
* Windows, Linux o macOS

Para comprobar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

# 🏗️ Arquitectura

La arquitectura general del proyecto es:

```text
┌───────────────────────┐
│       Usuario         │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Antigravity /         │
│ MCP Inspector         │
└───────────┬───────────┘
            │
            │ Streamable HTTP
            ▼
┌───────────────────────┐
│    MCP Client /       │
│    Agente de IA       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│   GitHub MCP Server   │
│      Node.js          │
│     TypeScript        │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│        Zod            │
│ Validación de inputs  │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│        Tools          │
│ create_repository     │
│ create_issue          │
│ list_repositories     │
│ create_commit         │
│ list_issues           │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       Octokit         │
│     GitHub Client     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│      GitHub API       │
└───────────────────────┘
```

---

# 📁 Estructura del proyecto

```text
Proyecto-M5-Agustin-Spataro/
│
├── src/
│   ├── app.ts
│   ├── mcp.ts
│   ├── types.ts
│   │
│   ├── errors/
│   │   └── index.ts
│   │
│   ├── github/
│   │   ├── client.ts
│   │   └── operations.ts
│   │
│   ├── schemas/
│   │   └── index.ts
│   │
│   ├── tools/
│   │   ├── create-commit.ts
│   │   ├── create-issue.ts
│   │   ├── create-repository.ts
│   │   ├── list-issues.ts
│   │   ├── list-repositories.ts
│   │   ├── validate.ts
│   │   └── index.ts
│   │
│   └── utils/
│       ├── logging.ts
│       └── retry.ts
│
├── tests/
│   ├── github.test.ts
│   ├── schemas.test.ts
│   ├── tools.test.ts
│   └── mcp.integration.test.ts
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

---

# 📂 Función de cada carpeta y archivo

## Archivos principales

### `server.ts`

Es el punto de entrada del servidor.

Se encarga de:

* cargar las variables de entorno;
* configurar el puerto;
* crear el servidor MCP;
* configurar **Streamable HTTP**;
* exponer el endpoint `/mcp`.

---

### `package.json`

Contiene:

* información del proyecto;
* dependencias;
* scripts;
* configuración de Node.js.

Entre sus dependencias se encuentran Express, Zod, Octokit y el SDK de MCP.

---

### `tsconfig.json`

Contiene la configuración del compilador TypeScript.

El proyecto utiliza:

* `target: ES2020`
* `module: NodeNext`
* `moduleResolution: NodeNext`
* `strict: true`
* `outDir: dist`

---

### `vitest.config.ts`

Configuración utilizada por Vitest para ejecutar las pruebas automatizadas.

---

### `antigravity-mcp.json`

Contiene la configuración utilizada para conectar el servidor MCP con Antigravity.

---

### `.env.example`

Archivo de ejemplo que muestra las variables de entorno necesarias sin incluir información privada.

---

### `.gitignore`

Evita subir archivos innecesarios o privados al repositorio.

Entre ellos:

```text
node_modules/
dist/
.env
coverage/
```

---

# 📂 `src/`

Contiene el código fuente principal de la aplicación.

---

## `src/app.ts`

Servidor Express.

Expone endpoints HTTP y permite ejecutar las herramientas mediante:

```text
POST /tool/:name
```

También gestiona errores personalizados.

---

## `src/mcp.ts`

Crea y registra el servidor MCP.

En este archivo se registran las cinco herramientas:

```text
create_repository
create_issue
list_repositories
create_commit
list_issues
```

También se definen los esquemas de entrada utilizados por las tools.

---

## `src/types.ts`

Contiene tipos e interfaces TypeScript utilizados en diferentes partes del proyecto.

---

# 📂 `src/errors/`

Contiene las clases de errores personalizados.

### `index.ts`

Define errores como:

* `ValidationError`
* `AuthenticationError`
* `GitHubAPIError`
* `NetworkError`

Esto permite diferenciar distintos tipos de problemas.

---

# 📂 `src/github/`

Contiene la integración con GitHub mediante Octokit.

### `client.ts`

Crea el cliente Octokit autenticado.

También gestiona:

* autenticación;
* reintentos;
* errores provenientes de GitHub.

### `operations.ts`

Contiene operaciones de alto nivel para GitHub, como:

* crear repositorios;
* crear issues;
* listar repositorios;
* crear commits;
* listar issues.

---

# 📂 `src/schemas/`

Contiene los esquemas de validación realizados con Zod.

### `index.ts`

Define los esquemas utilizados para validar los parámetros de las herramientas.

---

# 📂 `src/tools/`

Contiene las cinco herramientas principales.

### `create-repository.ts`

Crea un repositorio nuevo en GitHub.

### `create-issue.ts`

Crea una issue en un repositorio.

### `list-repositories.ts`

Lista los repositorios del usuario autenticado.

### `create-commit.ts`

Crea o actualiza un archivo mediante un commit.

### `list-issues.ts`

Lista las issues de un repositorio.

### `validate.ts`

Contiene funciones auxiliares para validar los datos recibidos.

### `index.ts`

Exporta las herramientas y utiliza un `toolMap` para asociar los nombres de las tools con sus funciones.

---

# 📂 `src/utils/`

Contiene funciones auxiliares.

### `logging.ts`

Permite realizar logging estructurado.

### `retry.ts`

Contiene la lógica para realizar reintentos ante fallos transitorios.

---

# 📂 `tests/`

Contiene las pruebas automatizadas del proyecto.

Actualmente se cuenta con **4 archivos de pruebas**:

### `github.test.ts`

Prueba el cliente y las operaciones relacionadas con GitHub.

### `schemas.test.ts`

Prueba los esquemas de validación Zod.

### `tools.test.ts`

Prueba las herramientas individuales.

### `mcp.integration.test.ts`

Realiza pruebas de integración relacionadas con el servidor MCP y sus herramientas.

El resultado más reciente de las pruebas fue:

```text
✓ tests/schemas.test.ts
✓ tests/tools.test.ts
✓ tests/mcp.integration.test.ts
✓ tests/github.test.ts

Test Files  4 passed (4)
Tests       17 passed (17)
```

Por lo tanto:

```text
4 test files passed
17 tests passed
0 tests failed
```

Esto demuestra que las pruebas automatizadas implementadas actualmente se ejecutan correctamente.

---

# 🔐 Configuración de GitHub

## 1. Crear un GitHub Personal Access Token

Para que el servidor pueda interactuar con GitHub se necesita un token de autenticación.

Pasos generales:

1. Ingresar a GitHub.
2. Abrir **Settings**.
3. Entrar en **Developer settings**.
4. Seleccionar **Personal access tokens**.
5. Crear un nuevo token.
6. Configurar los permisos necesarios.
7. Generar el token.
8. Copiarlo y guardarlo en un lugar seguro.

**El token solamente debe utilizarse de forma privada y nunca debe subirse a GitHub.**

---

# 🔑 Permisos del token

El token debe contar con permisos suficientes para realizar las operaciones implementadas por el servidor.

Para un token clásico, las operaciones que modifican repositorios pueden requerir permisos como:

```text
repo
```

Para repositorios públicos puede utilizarse el permiso correspondiente a repositorios públicos cuando sea suficiente.

> Los permisos exactos dependen del tipo de token utilizado y de las operaciones que se quieran realizar. Para un proyecto de desarrollo como este, se recomienda otorgar únicamente los permisos mínimos necesarios.

**No es necesario incluir permisos que el proyecto no utiliza.**

---

# ⚙️ Configuración del `.env`

Crear un archivo llamado:

```text
.env
```

en la raíz del proyecto.

Utilizar como referencia `.env.example`.

Contenido:

```env
GITHUB_TOKEN=tu_token_de_github
PORT=3000
```

### Variables

| Variable       | Tipo   | Descripción                         |
| -------------- | ------ | ----------------------------------- |
| `GITHUB_TOKEN` | string | Token de autenticación de GitHub    |
| `PORT`         | number | Puerto donde se ejecuta el servidor |

El archivo `.env` está incluido en `.gitignore` y **no debe subirse al repositorio**.

---

# 📄 `.env.example`

El proyecto incluye un archivo `.env.example`:

```env
# Token personal de GitHub
GITHUB_TOKEN=ghp_your_personal_access_token_here

# Puerto del servidor
PORT=3000
```

Nunca colocar un token real en `.env.example`.

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/spataro787/Proyecto-M5--Agustin-Spataro.git
```

Entrar en la carpeta:

```bash
cd Proyecto-M5--Agustin-Spataro
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar `.env`

Crear el archivo:

```text
.env
```

y agregar:

```env
GITHUB_TOKEN=tu_token_de_github
PORT=3000
```

---

# 🏗️ Compilar TypeScript

Ejecutar:

```bash
npm run build
```

Esto compila el código TypeScript y genera la carpeta:

```text
dist/
```

---

# ▶️ Ejecutar el servidor

Después de compilar:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

El endpoint MCP será:

```text
http://localhost:3000/mcp
```

---

# 🛠️ Desarrollo

Para trabajar durante el desarrollo:

```bash
npm run dev
```

---

# ❤️ Health Check

Para comprobar que el servidor está funcionando:

```bash
curl http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

---

# 🧰 Herramientas MCP

El servidor implementa cinco tools.

---

# 1. `create_repository`

### Descripción

Crea un nuevo repositorio en GitHub.

### Parámetros

| Parámetro     | Tipo    | Obligatorio | Descripción                         |
| ------------- | ------- | ----------- | ----------------------------------- |
| `name`        | string  | Sí          | Nombre del repositorio              |
| `description` | string  | No          | Descripción                         |
| `private`     | boolean | No          | Define si el repositorio es privado |

### Ejemplo

```json
{
  "name": "mi-repositorio",
  "description": "Repositorio creado mediante MCP",
  "private": false
}
```

### Prompt de ejemplo

> "Creá un repositorio público llamado mi-repositorio con la descripción Repositorio creado mediante MCP."

---

# 2. `create_issue`

### Descripción

Crea una issue dentro de un repositorio de GitHub.

### Parámetros

| Parámetro | Tipo   | Obligatorio | Descripción                        |
| --------- | ------ | ----------- | ---------------------------------- |
| `owner`   | string | Sí          | Usuario u organización propietaria |
| `repo`    | string | Sí          | Nombre del repositorio             |
| `title`   | string | Sí          | Título de la issue                 |
| `body`    | string | No          | Descripción de la issue            |

### Ejemplo

```json
{
  "owner": "spataro787",
  "repo": "Proyecto-M5--Agustin-Spataro",
  "title": "Nueva prueba MCP",
  "body": "Issue creada mediante GitHub MCP Server"
}
```

### Prompt de ejemplo

> "Creá una issue en Proyecto-M5--Agustin-Spataro con el título Error de login y explicá que el formulario no funciona."

---

# 3. `list_repositories`

### Descripción

Lista los repositorios disponibles para el usuario autenticado.

### Parámetros

| Parámetro     | Tipo   | Obligatorio | Descripción                    |
| ------------- | ------ | ----------- | ------------------------------ |
| `visibility`  | string | No          | Filtra la visibilidad          |
| `affiliation` | string | No          | Filtra la relación del usuario |

También puede utilizarse sin parámetros:

```json
{}
```

### Ejemplo

```json
{
  "visibility": "all",
  "affiliation": "owner"
}
```

### Prompt de ejemplo

> "Mostrame todos mis repositorios de GitHub."

---

# 4. `create_commit`

### Descripción

Crea o actualiza un archivo dentro de un repositorio y realiza un commit.

### Parámetros

| Parámetro | Tipo   | Obligatorio | Descripción                     |
| --------- | ------ | ----------- | ------------------------------- |
| `owner`   | string | Sí          | Propietario del repositorio     |
| `repo`    | string | Sí          | Nombre del repositorio          |
| `branch`  | string | Sí          | Rama donde se realiza el cambio |
| `path`    | string | Sí          | Ruta del archivo                |
| `message` | string | Sí          | Mensaje del commit              |
| `content` | string | Sí          | Contenido del archivo           |

### Ejemplo

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

### Prompt de ejemplo

> "Creá un archivo llamado prueba.txt en la rama main con el contenido Hola MCP y hacé un commit."

---

# 5. `list_issues`

### Descripción

Lista las issues de un repositorio.

### Parámetros

| Parámetro | Tipo   | Obligatorio | Descripción                 |
| --------- | ------ | ----------- | --------------------------- |
| `owner`   | string | Sí          | Propietario del repositorio |
| `repo`    | string | Sí          | Nombre del repositorio      |
| `state`   | string | No          | Estado de las issues        |

Estados disponibles:

```text
open
closed
all
```

### Ejemplo

```json
{
  "owner": "spataro787",
  "repo": "Proyecto-M5--Agustin-Spataro",
  "state": "open"
}
```

### Prompt de ejemplo

> "Mostrame las issues abiertas de mi repositorio Proyecto-M5--Agustin-Spataro."

---

# 📋 Resumen de Tools

| Tool                | Función                                      |
| ------------------- | -------------------------------------------- |
| `create_repository` | Crear repositorios                           |
| `create_issue`      | Crear issues                                 |
| `list_repositories` | Listar repositorios                          |
| `create_commit`     | Crear o actualizar archivos mediante commits |
| `list_issues`       | Listar issues                                |

---

# 🌐 Endpoints HTTP

El servidor expone los siguientes endpoints:

```text
GET  /health
POST /mcp

POST /tool/create_repository
POST /tool/create_issue
POST /tool/list_repositories
POST /tool/create_commit
POST /tool/list_issues
```

El endpoint principal para clientes MCP es:

```text
http://localhost:3000/mcp
```

---

# 🧪 Ejemplos de uso con cURL

## Listar repositorios

```bash
curl -X POST http://localhost:3000/tool/list_repositories ^
-H "Content-Type: application/json" ^
-d "{}"
```

---

## Crear repositorio

```bash
curl -X POST http://localhost:3000/tool/create_repository ^
-H "Content-Type: application/json" ^
-d "{\"name\":\"mcp-test-repository\",\"description\":\"Repositorio creado mediante MCP\",\"private\":false}"
```

---

## Crear issue

```bash
curl -X POST http://localhost:3000/tool/create_issue ^
-H "Content-Type: application/json" ^
-d "{\"owner\":\"spataro787\",\"repo\":\"Proyecto-M5--Agustin-Spataro\",\"title\":\"Nueva prueba MCP\",\"body\":\"Issue creada mediante GitHub MCP Server\"}"
```

---

## Listar issues

```bash
curl -X POST http://localhost:3000/tool/list_issues ^
-H "Content-Type: application/json" ^
-d "{\"owner\":\"spataro787\",\"repo\":\"Proyecto-M5--Agustin-Spataro\",\"state\":\"open\"}"
```

---

## Crear commit

```bash
curl -X POST http://localhost:3000/tool/create_commit ^
-H "Content-Type: application/json" ^
-d "{\"owner\":\"spataro787\",\"repo\":\"Proyecto-M5--Agustin-Spataro\",\"branch\":\"main\",\"path\":\"mcp-test.txt\",\"message\":\"Prueba create commit MCP\",\"content\":\"Commit creado mediante GitHub MCP Server\"}"
```

---

# 🤖 Ejemplos de prompts para agentes de IA

Los siguientes ejemplos muestran cómo podría utilizarse el servidor mediante lenguaje natural:

1. **Repositorios**

> "Mostrame mis repositorios de GitHub."

2. **Crear repositorio**

> "Creá un repositorio público llamado proyecto-prueba."

3. **Crear issue**

> "Creá una issue en Proyecto-M5--Agustin-Spataro titulada Error en autenticación."

4. **Consultar issues**

> "Mostrame las issues abiertas de Proyecto-M5--Agustin-Spataro."

5. **Crear archivo**

> "Creá un archivo prueba.txt con el contenido Hola desde MCP y hacé un commit en main."

6. **Consultar repositorios**

> "Listá todos los repositorios que pertenezcan a mi cuenta."

7. **Consultar issues cerradas**

> "Mostrame las issues cerradas del repositorio Proyecto-M5--Agustin-Spataro."

8. **Crear documentación**

> "Creá un archivo notas.txt con información sobre el proyecto y guardalo mediante un commit."

---

# 🔎 MCP Inspector

MCP Inspector permite comprobar que el servidor MCP expone correctamente sus herramientas.

Iniciar:

```bash
npx @modelcontextprotocol/inspector
```

El Inspector estará disponible en la dirección que indique la terminal.

Configurar la conexión:

```text
Servidor: github-mcp-server
Transporte: Streamable HTTP
URL: http://localhost:3000/mcp
```

Una vez conectado deberían aparecer:

```text
create_repository
create_issue
list_repositories
create_commit
list_issues
```

Desde el Inspector se pueden ejecutar las tools y comprobar sus parámetros y respuestas.

---

# 🚀 Configuración de Antigravity

El servidor puede conectarse a Antigravity utilizando el endpoint MCP.

El endpoint utilizado es:

```text
http://localhost:3000/mcp
```

El transporte utilizado es:

```text
Streamable HTTP
```

El proyecto incluye:

```text
antigravity-mcp.json
```

Este archivo contiene la configuración necesaria para identificar el servidor MCP.

## Pasos generales

1. Iniciar el servidor:

```bash
npm start
```

2. Comprobar:

```text
http://localhost:3000/health
```

3. Abrir Antigravity.

4. Agregar un servidor MCP.

5. Configurar el endpoint:

```text
http://localhost:3000/mcp
```

6. Seleccionar **Streamable HTTP** si Antigravity solicita el tipo de transporte.

7. Conectar el servidor.

8. Verificar que estén disponibles las cinco tools.

> Antigravity actúa como cliente/host desde el cual un agente de IA puede utilizar las herramientas proporcionadas por este MCP Server.

---

# 🔄 Flujo de funcionamiento

Ejemplo de una solicitud:

```text
Usuario
   ↓
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

---

# 🛡️ Validación con Zod

Los parámetros recibidos por las herramientas se validan mediante **Zod**.

Esto permite verificar que los datos tengan el formato esperado antes de realizar una operación contra GitHub.

Por ejemplo, `create_commit` necesita datos como:

```text
owner
repo
branch
path
message
content
```

Si falta un parámetro obligatorio o tiene un tipo incorrecto, la operación se rechaza antes de realizar la llamada correspondiente.

---

# ⚠️ Manejo de errores

El proyecto contempla diferentes tipos de errores:

```text
ValidationError
AuthenticationError
GitHubAPIError
NetworkError
```

Permiten diferenciar problemas relacionados con:

* validación de datos;
* autenticación;
* API de GitHub;
* conexión de red.

Esto permite devolver respuestas más claras y facilita el diagnóstico de problemas.

---

# 🔁 Reintentos

El proyecto incorpora lógica de reintentos para determinados fallos transitorios.

La lógica se encuentra principalmente en:

```text
src/utils/retry.ts
```

y se utiliza junto con el cliente de GitHub.

---

# 🧪 Testing

Las pruebas automatizadas se realizan utilizando **Vitest**.

Ejecutar:

```bash
npm test
```

Actualmente el proyecto cuenta con **4 archivos de pruebas**:

```text
tests/github.test.ts
tests/schemas.test.ts
tests/tools.test.ts
tests/mcp.integration.test.ts
```

Resultado verificado:

```text
RUN  v1.6.1

✓ tests/schemas.test.ts
✓ tests/tools.test.ts
✓ tests/mcp.integration.test.ts
✓ tests/github.test.ts

Test Files  4 passed (4)
Tests       17 passed (17)
```

Resultado final:

```text
4 archivos de test pasaron correctamente
17 tests pasaron correctamente
0 tests fallaron
```

Esto demuestra que las diferentes partes del proyecto cuentan con pruebas automatizadas y que actualmente se ejecutan correctamente.

---

# 🧹 TypeScript / Typecheck

Para comprobar que el código TypeScript no tenga errores de tipado:

```bash
npm run typecheck
```

Este comando utiliza TypeScript en modo de comprobación y no genera archivos de salida.

También se puede realizar la compilación completa mediante:

```bash
npm run build
```

---

# 📜 Scripts disponibles

```bash
npm run build
npm run dev
npm start
npm test
npm run typecheck
```

| Script              | Función                           |
| ------------------- | --------------------------------- |
| `npm run build`     | Compila TypeScript                |
| `npm run dev`       | Ejecuta el proyecto en desarrollo |
| `npm start`         | Inicia el servidor compilado      |
| `npm test`          | Ejecuta las pruebas de Vitest     |
| `npm run typecheck` | Comprueba los tipos de TypeScript |

---

# 🔧 Troubleshooting

## Error: `EADDRINUSE`

Significa que el puerto `3000` ya está siendo utilizado.

En Windows:

```bash
netstat -ano | findstr :3000
```

Después finalizar el proceso:

```bash
taskkill //PID NUMERO_PID //F
```

Luego volver a iniciar:

```bash
npm start
```

---

## Error 401 de GitHub

Generalmente indica un problema con el token.

Verificar:

* que `GITHUB_TOKEN` esté configurado;
* que el token sea válido;
* que no haya expirado;
* que tenga permisos suficientes.

Nunca colocar el token directamente dentro del código fuente.

---

## Error de validación

Si aparece un error indicando que falta un parámetro o que el tipo es incorrecto, revisar el esquema Zod correspondiente.

Por ejemplo, `create_commit` necesita:

```text
owner
repo
branch
path
message
content
```

---

## MCP Inspector no conecta

Verificar:

1. Que el servidor esté ejecutándose.
2. Que el puerto sea `3000`.
3. Que `/health` responda correctamente.
4. Que la URL configurada sea:

```text
http://localhost:3000/mcp
```

5. Que el transporte sea:

```text
Streamable HTTP
```

---

## Error durante `npm install`

Comprobar que Node.js y npm estén correctamente instalados:

```bash
node --version
npm --version
```

Después ejecutar:

```bash
npm install
```

---

## Error durante la compilación

Ejecutar:

```bash
npm run build
```

Si existen errores de TypeScript, revisar los archivos indicados por el compilador.

---

# 🔐 Seguridad

No subir nunca información sensible al repositorio.

Especialmente:

```text
.env
GitHub Tokens
API Keys
Contraseñas
Credenciales
```

El proyecto utiliza `.gitignore` para evitar subir el archivo `.env`.

El archivo que se debe compartir es:

```text
.env.example
```

sin valores reales.

---

# 📊 Pruebas realizadas

Durante el desarrollo se verificaron:

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
✓ Tests de integración MCP
✓ Build
✓ TypeScript
✓ Configuración de Antigravity
```

Las pruebas automatizadas más recientes dieron como resultado:

```text
4 test files passed
17 tests passed
0 tests failed
```

También se comprobó la interacción real con GitHub mediante repositorios, issues y commits durante las pruebas del proyecto.

---

# 🐛 Problemas solucionados durante el desarrollo

Durante el desarrollo se solucionaron problemas relacionados con:

* tokens de GitHub inválidos o expirados;
* puerto `3000` ocupado;
* conexión del MCP Inspector;
* configuración de Streamable HTTP;
* validación de parámetros de `create_commit`;
* instalación del SDK de MCP;
* configuración de TypeScript;
* compilación del proyecto;
* pruebas automatizadas;
* integración del servidor MCP.

Esto permitió validar el funcionamiento de los principales componentes del proyecto.

---

# 📈 Estado del proyecto

Actualmente el proyecto cuenta con:

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
✓ Validación de datos
✓ Manejo de errores
✓ Reintentos
✓ Tests automatizados
✓ 4 archivos de test
✓ 17 tests pasando
✓ Build funcionando
✓ TypeScript validado
✓ Configuración de Antigravity
✓ Proyecto preparado para demostración
```

---

# 🎓 Objetivo académico

El proyecto demuestra cómo utilizar **Model Context Protocol (MCP)** para conectar un agente de Inteligencia Artificial con un servicio externo como GitHub.

La arquitectura permite que el agente solicite operaciones mediante lenguaje natural y que el servidor MCP transforme esas solicitudes en acciones concretas y validadas contra la API de GitHub.

El proyecto integra conceptos de:

* APIs;
* Node.js;
* TypeScript;
* arquitectura de servidores;
* validación de datos;
* autenticación;
* testing;
* GitHub API;
* MCP;
* integración con agentes de Inteligencia Artificial.

---

# 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.

Esto permite utilizar, copiar, modificar y distribuir el proyecto respetando los términos establecidos por dicha licencia.

Se recomienda incluir un archivo:

```text
LICENSE
```

con el texto oficial de la licencia MIT.

---

# 👨‍💻 Autor

**Agustín Spataro**

Proyecto académico:

**M5 — GitHub MCP Server**

---

# 📌 Conclusión

**GitHub MCP Server** es un servidor MCP desarrollado con Node.js y TypeScript que permite ejecutar operaciones reales de GitHub mediante herramientas accesibles para agentes de Inteligencia Artificial.

El proyecto integra:

```text
Node.js
TypeScript
Express
Model Context Protocol
Zod
Octokit
GitHub API
Vitest
Streamable HTTP
MCP Inspector
Antigravity
```

El servidor cuenta con cinco herramientas principales:

```text
create_repository
create_issue
list_repositories
create_commit
list_issues
```

Además incorpora:

* validación mediante Zod;
* manejo de errores;
* reintentos;
* autenticación con GitHub;
* pruebas automatizadas;
* pruebas de integración MCP;
* compilación TypeScript;
* comunicación mediante Streamable HTTP;
* integración con MCP Inspector;
* configuración para Antigravity.

El resultado es un servidor que permite que un agente de IA interactúe con GitHub de manera estructurada, validada y automatizada.

Las pruebas actuales confirman:

```text
4 archivos de test
17 tests
17 tests exitosos
0 tests fallidos
```

---

**Proyecto M5 — GitHub MCP Server**

**Desarrollado por Agustín Spataro**

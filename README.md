# GitHub MCP Server

Servidor MCP en Node.js y TypeScript que expone herramientas para automatizar operaciones comunes de GitHub desde Antigravity.

## Descripción

Este proyecto implementa un MCP server que permite a un agente AI ejecutar operaciones de GitHub con comandos en lenguaje natural. Incluye validación de inputs con Zod, manejo robusto de errores, retries seguros, tests con Vitest y configuración para Antigravity.

## Estructura del proyecto

- `src/errors.ts`: define errores especializados (ValidationError, GitHubAPIError, AuthenticationError, NetworkError) y transforma errores técnicos en mensajes legibles.
- `src/schemas.ts`: valida parámetros de cada herramienta usando Zod. Incluye reglas específicas para nombres de repositorio y datos de GitHub.
- `src/githubClient.ts`: crea el cliente Octokit y maneja reintentos de red. Convierte errores HTTP en errores de aplicación claros.
- `src/tools.ts`: implementa las tools de GitHub: `create_repository`, `create_issue`, `list_repositories`, `create_commit`, `list_issues`.
- `src/app.ts`: expone un servidor Express con endpoints para cada tool y manejo de errores centralizado.
- `src/index.ts`: carga variables de entorno y arranca el servidor.
- `antigravity-mcp.json`: configuración de MCP para Antigravity.
- `test/`: tests unitarios con Vitest.

## Requerimientos

- Node.js 18+ compatible
- GitHub Personal Access Token con permisos `repo` para repositorios privados o públicos según necesidad

## Instalación

1. Clona el repositorio.
2. Copia `.env.example` a `.env`.
3. Agrega tu token en `GITHUB_TOKEN`.
4. Ejecuta:

```bash
npm install
npm run build
npm test
```

## Variables de entorno

- `GITHUB_TOKEN`: token de GitHub.
- `PORT`: puerto opcional (por defecto `3000`).

## Uso

Inicia el servidor:

```bash
npm run build
node dist/index.js
```

Endpoints principales:

- `POST /tool/create_repository`
- `POST /tool/create_issue`
- `POST /tool/list_repositories`
- `POST /tool/create_commit`
- `POST /tool/list_issues`

### Ejemplo: crear repositorio

```bash
curl -X POST http://localhost:3000/tool/create_repository \
  -H "Content-Type: application/json" \
  -d '{"name":"mi-repo","description":"Repo creado desde MCP"}'
```

### Ejemplo: crear issue

```bash
curl -X POST http://localhost:3000/tool/create_issue \
  -H "Content-Type: application/json" \
  -d '{"owner":"usuario","repo":"mi-repo","title":"Bug encontrado","body":"Detalles del problema"}'
```

## Documentación de tools

### create_repository
- Parámetros: `name`, `description`, `private`
- Valida nombre GitHub: 3-100 caracteres, solo alfanuméricos y guiones.
- Retorna URL y nombre completo del repositorio.

### create_issue
- Parámetros: `owner`, `repo`, `title`, `body`
- Crea un issue en el repositorio indicado.

### list_repositories
- Parámetros opcionales: `visibility`, `affiliation`
- Lista repositorios del usuario autenticado.

### create_commit
- Parámetros: `owner`, `repo`, `branch`, `path`, `message`, `content`
- Agrega o actualiza un archivo y hace commit.

### list_issues
- Parámetros: `owner`, `repo`, `state`
- Lista issues del repositorio.

## Configuración en Antigravity

Usa el archivo `antigravity-mcp.json` para registrar el servidor y las tools. Asegúrate de exponer:

- `server.url`: URL del servidor en ejecución
- `server.healthEndpoint`: `/health`
- `tools[]`: nombre, descripción, endpoint, método, schema de entrada

## Arquitectura

Antigravity (Host) → LLM (Client) → MCP Server → GitHub API.

1. El agente envía un comando en lenguaje natural.
2. Antigravity mapea el comando a una tool y llama el endpoint correspondiente.
3. El MCP server valida inputs, ejecuta la operación con Octokit y responde con datos claros.
4. Los errores se transforman para que el LLM pueda comunicarlos en lenguaje natural.

## Testing

- `npm test`: ejecuta pruebas unitarias con Vitest.

Cobertura de tests:
- Validación de schemas.
- Transformación de errores de GitHub.
- Tools con Octokit mockeado.
- Casos de entrada inválida y errores comunes.

## Presentación

Para la demostración en vivo, muestra:

1. `npm run build` y `node dist/index.js`.
2. Llamadas a `POST /tool/*` con `curl` o Postman.
3. Cómo se valida un input inválido y se devuelve un mensaje claro.
4. El `antigravity-mcp.json` y cómo Antigravity puede conectarse.
5. Tests corriendo y resultados verdes.

## Decisiones técnicas

- `Zod` para validación declarativa y errores claros.
- `Express` para endpoints HTTP simples.
- `Octokit` para integración oficial con GitHub.
- Errores especializados para separar validación, autenticación, API y red.
- `requestWithRetry` para retries controlados de rate limiting.

## Aprendizajes y desafíos

- Manejar errores de GitHub requiere traducir respuestas técnicas a mensajes útiles.
- La validación temprana evita llamadas innecesarias a la API y fallos difíciles de depurar.
- Mockear Octokit en tests facilita validar la lógica de herramientas sin llamadas reales.
- Configurar MCP en Antigravity exige un esquema claro de tools y salud del servidor.

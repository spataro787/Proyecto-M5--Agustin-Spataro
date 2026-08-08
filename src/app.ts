/**
 * Expone los endpoints HTTP del MCP server.
 * Recibe llamadas a tools, ejecuta la función correspondiente y maneja errores en JSON.
 */
import express from 'express';
import { toolMap } from './tools/index.js';
import { ValidationError, AuthenticationError, GitHubAPIError, NetworkError } from './errors/index.js';

const app = express();
app.use(express.json());

app.post('/tool/:name', async (req, res) => {
  const toolName = req.params.name as keyof typeof toolMap;
  const tool = toolMap[toolName];

  if (!tool) {
    return res.status(404).json({ error: `Tool ${toolName} no encontrada.` });
  }

  try {
    const result = await tool(req.body);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Tool error', { tool: toolName, message: error.message, stack: error.stack });

    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message, type: 'ValidationError' });
    }

    if (error instanceof AuthenticationError) {
      return res.status(401).json({ error: error.message, type: 'AuthenticationError' });
    }

    if (error instanceof GitHubAPIError) {
      return res.status(error.status ?? 500).json({ error: error.message, type: 'GitHubAPIError' });
    }

    if (error instanceof NetworkError) {
      return res.status(503).json({ error: error.message, type: 'NetworkError' });
    }

    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

app.get('/health', (_, res) => res.json({ status: 'ok' }));

export default app;

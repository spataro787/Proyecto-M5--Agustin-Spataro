import 'dotenv/config';
import app from './src/app.js';
import { createMcpServer } from './src/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

const port = Number(process.env.PORT ?? 3000);

app.post('/mcp', async (req, res) => {
  const mcpServer = createMcpServer();

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.on('close', () => {
    transport.close().catch(() => {});
    mcpServer.close().catch(() => {});
  });

  try {
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('MCP error:', error);

    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Error interno del servidor MCP.',
        },
        id: null,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`MCP server iniciado en http://localhost:${port}`);
  console.log(`MCP endpoint disponible en http://localhost:${port}/mcp`);
});
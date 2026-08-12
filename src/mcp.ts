import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { createRepository } from './tools/create-repository.js';
import { createIssue } from './tools/create-issue.js';
import { listRepositories } from './tools/list-repositories.js';
import { createCommit } from './tools/create-commit.js';
import { listIssues } from './tools/list-issues.js';

export function createMcpServer() {
  const server = new McpServer({
    name: 'github-mcp-server',
    version: '1.0.0',
  });

  server.registerTool(
    'create_repository',
    {
      description: 'Crea un nuevo repositorio GitHub para el usuario autenticado.',
      inputSchema: {
        name: z.string().min(3).max(100),
        description: z.string().max(1000).optional(),
        private: z.boolean().optional(),
      },
    },
    async (args) => {
      const result = await createRepository(args);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    'create_issue',
    {
      description: 'Abre un issue en un repositorio existente.',
      inputSchema: {
        owner: z.string().min(1),
        repo: z.string().min(3),
        title: z.string().min(1).max(250),
        body: z.string().max(5000).optional(),
      },
    },
    async (args) => {
      const result = await createIssue(args);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_repositories',
    {
      description: 'Lista repositorios del usuario autenticado.',
      inputSchema: {
        visibility: z.enum(['all', 'public', 'private']).optional(),
        affiliation: z.string().optional(),
      },
    },
    async (args) => {
      const result = await listRepositories(args);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    'create_commit',
    {
      description: 'Crea o actualiza un archivo en un repositorio y realiza un commit.',
      inputSchema: {
        owner: z.string().min(1),
        repo: z.string().min(3),
        branch: z.string().min(1),
        path: z.string().min(1),
        message: z.string().min(1),
        content: z.string().min(1).max(100000),
      },
    },
    async (args) => {
      const result = await createCommit(args);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    },
  );

  server.registerTool(
    'list_issues',
    {
      description: 'Lista issues de un repositorio específico.',
      inputSchema: {
        owner: z.string().min(1),
        repo: z.string().min(3),
        state: z.enum(['open', 'closed', 'all']).optional(),
      },
    },
    async (args) => {
      const result = await listIssues(args);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    },
  );

  return server;
}

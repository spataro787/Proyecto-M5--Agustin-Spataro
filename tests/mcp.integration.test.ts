import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';

vi.mock('../src/tools/list-repositories.js', () => ({
  listRepositories: vi.fn(),
}));

import { listRepositories } from '../src/tools/list-repositories.js';
import { createMcpServer } from '../src/mcp.js';

describe('MCP Integration Test', () => {
  let client: Client;

  beforeEach(async () => {
    vi.clearAllMocks();

    vi.mocked(listRepositories).mockResolvedValue([
      {
        name: 'mcp-test-repository',
        full_name: 'spataro787/mcp-test-repository',
        private: false,
        url: 'https://github.com/spataro787/mcp-test-repository',
      },
    ]);

    const server = createMcpServer();

    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();

    client = new Client(
      {
        name: 'mcp-integration-test-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      },
    );

    await server.connect(serverTransport);
    await client.connect(clientTransport);
  });

  it('debe registrar correctamente las tools MCP', async () => {
    const result = await client.listTools();

    const toolNames = result.tools.map((tool) => tool.name);

    expect(toolNames).toContain('create_repository');
    expect(toolNames).toContain('create_issue');
    expect(toolNames).toContain('list_repositories');
    expect(toolNames).toContain('create_commit');
    expect(toolNames).toContain('list_issues');
  });

  it('debe ejecutar list_repositories mediante MCP', async () => {
    const result = await client.callTool({
      name: 'list_repositories',
      arguments: {},
    });

    expect(result.content).toBeDefined();
    expect(result.content[0].type).toBe('text');

    const data = JSON.parse(
      result.content[0].type === 'text'
        ? result.content[0].text
        : '{}',
    );

    expect(data).toEqual([
      {
        name: 'mcp-test-repository',
        full_name: 'spataro787/mcp-test-repository',
        private: false,
        url: 'https://github.com/spataro787/mcp-test-repository',
      },
    ]);

    expect(listRepositories).toHaveBeenCalledWith({});
  });
});

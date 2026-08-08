import { listIssuesOperation } from '../github/operations.js';
import { listIssuesSchema } from '../schemas/index.js';
import type { ListIssuesInput } from '../schemas/index.js';
import { validate } from './validate.js';

export const listIssues = async (input: unknown) => {
  const data = validate<ListIssuesInput>(listIssuesSchema, input);
  return listIssuesOperation(data);
};

import { createIssueOperation } from '../github/operations.js';
import { createIssueSchema } from '../schemas/index.js';
import type { CreateIssueInput } from '../schemas/index.js';
import { validate } from './validate.js';

export const createIssue = async (input: unknown) => {
  const data = validate<CreateIssueInput>(createIssueSchema, input);
  return createIssueOperation(data);
};

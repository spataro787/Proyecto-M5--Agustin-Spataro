import { listRepositoriesOperation } from '../github/operations.js';
import { listReposSchema } from '../schemas/index.js';
import type { ListReposInput } from '../schemas/index.js';
import { validate } from './validate.js';

export const listRepositories = async (input: unknown) => {
  const data = validate<ListReposInput>(listReposSchema, input);
  return listRepositoriesOperation(data);
};

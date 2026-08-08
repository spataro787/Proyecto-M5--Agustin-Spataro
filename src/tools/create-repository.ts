import { createRepositoryOperation } from '../github/operations.js';
import { createRepoSchema } from '../schemas/index.js';
import type { CreateRepoInput } from '../schemas/index.js';
import { validate } from './validate.js';

export const createRepository = async (input: unknown) => {
  const data = validate<CreateRepoInput>(createRepoSchema, input);
  return createRepositoryOperation(data);
};

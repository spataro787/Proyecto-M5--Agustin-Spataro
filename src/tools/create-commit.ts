import { createCommitOperation } from '../github/operations.js';
import { createCommitSchema } from '../schemas/index.js';
import type { CreateCommitInput } from '../schemas/index.js';
import { validate } from './validate.js';

export const createCommit = async (input: unknown) => {
  const data = validate<CreateCommitInput>(createCommitSchema, input);
  return createCommitOperation(data);
};

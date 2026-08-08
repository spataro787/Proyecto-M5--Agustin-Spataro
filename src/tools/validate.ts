import { ValidationError } from '../errors/index.js';
import type { ZodTypeAny } from 'zod';

export const validate = <T>(schema: ZodTypeAny, payload: unknown): T => {
  try {
    return schema.parse(payload) as T;
  } catch (error: any) {
    const issues = error?.issues?.map((issue: any) => issue.message).join('; ') ?? 'Entrada inválida.';
    throw new ValidationError(issues, error?.issues);
  }
};

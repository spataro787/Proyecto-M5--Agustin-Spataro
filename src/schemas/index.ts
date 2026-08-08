/**
 * Define y exporta los schemas Zod para validar los parámetros de cada tool de GitHub.
 * Esto asegura que las entradas sean seguras y compatibles antes de llamar a la API.
 */
import { z } from 'zod';

export const repoNameSchema = z.string().min(3, 'El nombre del repositorio debe tener al menos 3 caracteres').max(100, 'El nombre del repositorio no puede exceder 100 caracteres').regex(/^[a-zA-Z0-9-]+$/, 'El nombre del repositorio sólo puede contener letras, números y guiones');

export const descriptionSchema = z.string().max(1000, 'La descripción no puede exceder 1000 caracteres').optional();

export const ownerSchema = z.string().min(1, 'El propietario es requerido').max(100, 'El propietario es demasiado largo');

export const repoSchema = z.object({
  owner: ownerSchema,
  repo: repoNameSchema
});

export const createRepoSchema = z.object({
  name: repoNameSchema,
  description: descriptionSchema,
  private: z.boolean().optional()
});

export const createIssueSchema = z.object({
  owner: ownerSchema,
  repo: repoNameSchema,
  title: z.string().min(1, 'El título del issue es requerido').max(250, 'El título del issue es demasiado largo'),
  body: z.string().min(1, 'El cuerpo del issue es requerido').max(5000, 'El cuerpo del issue es demasiado largo').optional()
});

export const listReposSchema = z.object({
  visibility: z.enum(['all', 'public', 'private']).optional(),
  affiliation: z.string().optional()
});

export const createCommitSchema = z.object({
  owner: ownerSchema,
  repo: repoNameSchema,
  branch: z.string().min(1, 'La rama es requerida'),
  path: z.string().min(1, 'La ruta del archivo es requerida'),
  message: z.string().min(1, 'El mensaje de commit es requerido'),
  content: z.string().min(1, 'El contenido es requerido').max(100000, 'El contenido es demasiado grande')
});

export const listIssuesSchema = z.object({
  owner: ownerSchema,
  repo: repoNameSchema,
  state: z.enum(['open', 'closed', 'all']).optional()
});

export type CreateRepoInput = z.infer<typeof createRepoSchema>;
export type CreateIssueInput = z.infer<typeof createIssueSchema>;
export type ListReposInput = z.infer<typeof listReposSchema>;
export type CreateCommitInput = z.infer<typeof createCommitSchema>;
export type ListIssuesInput = z.infer<typeof listIssuesSchema>;
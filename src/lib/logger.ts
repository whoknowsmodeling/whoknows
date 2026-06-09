import { logAdminAction } from './edge-data';

export async function logAction(
  action: string,
  entity: string,
  entityId?: string,
  details?: string,
  adminEmail: string = 'whoknowsmodeling@gmail.com'
) {
  try {
    await logAdminAction(action, entity, entityId, details, adminEmail);
  } catch (error) {
    console.error('Failed to create admin log:', error);
  }
}

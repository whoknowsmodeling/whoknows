import { db } from './db';

export async function logAction(
  action: string,
  entity: string,
  entityId?: string,
  details?: string,
  adminEmail: string = 'system@whoknowsmodels.com'
) {
  try {
    await db.adminLog.create({
      data: {
        action,
        entity,
        entityId,
        details,
        adminEmail,
      },
    });
  } catch (error) {
    console.error('Failed to create admin log:', error);
  }
}

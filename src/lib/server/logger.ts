import { prisma } from '$lib/server/prisma';

export async function logActivity(tenantId: number, userId: number | null | undefined, action: 'CREATE' | 'UPDATE' | 'DELETE', entity: string, details?: string) {
  try {
    await prisma.activityLog.create({
      data: {
        tenant_id: tenantId,
        user_id: userId || null,
        action,
        entity,
        details
      }
    });
  } catch (error) {
    console.error("Gagal menyimpan activity log:", error);
  }
}

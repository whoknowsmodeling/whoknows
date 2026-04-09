'use server';

import { getApplicationsList, getContactSubmissions } from "@/lib/edge-data";

/**
 * Server Action to fetch paginated applications for the Admin Dashboard.
 */
export async function fetchApplicationsAction(offset: number) {
  return await getApplicationsList(20, offset);
}

/**
 * Server Action to fetch paginated contacts for the Admin Dashboard.
 */
export async function fetchContactsAction(offset: number) {
  return await getContactSubmissions(20, offset);
}

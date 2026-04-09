'use server';

import { getApplicationsList, getContactSubmissions } from "@/lib/edge-data";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Server Action to fetch paginated applications for the Admin Dashboard.
 */
export async function fetchApplicationsAction(offset: number) {
  return await getApplicationsList(20, offset);
}

/**
 * Server Action to delete an application.
 */
export async function deleteApplicationAction(id: string) {
  const { error } = await supabaseAdmin.from('Application').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/applications');
}

/**
 * Server Action to fetch paginated contacts for the Admin Dashboard.
 */
export async function fetchContactsAction(offset: number) {
  return await getContactSubmissions(20, offset);
}

/**
 * Server Action to delete a contact message.
 */
export async function deleteContactAction(id: string) {
  const { error } = await supabaseAdmin.from('ContactSubmission').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/contacts');
}

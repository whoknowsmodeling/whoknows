import { db } from "@/lib/db";
import { format } from "date-fns";
import { 
  Mail, 
  Trash2, 
  Search,
  MessageSquare,
  User,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function deleteContact(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.contactSubmission.delete({
    where: { id }
  });
  revalidatePath('/admin/contacts');
}

export default async function ContactsPage() {
  const contacts = await db.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">Contact Messages</h1>
          <p className="text-neutral-500 mt-2">Inquiries and messages from the website contact form.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all group relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                      <User className="w-5 h-5 text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-white">{contact.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {contact.email}
                        </span>
                        <span>•</span>
                        <span>{format(new Date(contact.createdAt), "PPP")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4 border border-neutral-800/50">
                    <p className="text-xs uppercase tracking-widest text-neutral-600 font-bold mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" />
                      Subject: {contact.subject || "No Subject"}
                    </p>
                    <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors"
                  >
                    Reply <ExternalLink className="w-4 h-4" />
                  </a>
                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={contact.id} />
                    <Button 
                      type="submit"
                      variant="ghost" 
                      className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute top-0 right-0 w-1 h-full bg-neutral-800" />
            </div>
          ))
        ) : (
          <div className="py-24 text-center bg-neutral-900/20 border border-dashed border-neutral-800 rounded-xl">
            <Mail className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-400">No messages yet</h3>
            <p className="text-neutral-600">New inquiries from the contact form will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteApplicationAction } from '@/app/admin/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

interface ApplicationDeleteButtonProps {
  id: string;
  onDeleted?: () => void;
}

export function ApplicationDeleteButton({ id, onDeleted }: ApplicationDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteApplicationAction(id);
      toast.success('Application deleted successfully');
      if (onDeleted) onDeleted();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete application');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-neutral-500 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-full"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-neutral-900 border-neutral-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-serif">Delete Application?</AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-400">
            This action cannot be undone. This will permanently delete the application record and all associated photos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700 border-none"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete Permanently"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

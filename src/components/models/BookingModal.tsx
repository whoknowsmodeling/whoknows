'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MessageSquare, Phone, X, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  modelName: string;
}

export function BookingModal({ isOpen, onOpenChange, modelName }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      subject: `Booking Inquiry: ${modelName}`,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'booking', modelName }),
      });

      if (!response.ok) throw new Error('Failed to send inquiry');

      setIsSuccess(true);
      toast.success('Inquiry sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-none rounded-none max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-serif text-3xl uppercase tracking-tighter">
            Booking Inquiry
          </DialogTitle>
          <DialogDescription className="font-sans text-[11px] uppercase tracking-widest text-neutral-400">
            {modelName} — Available for booking
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 pt-2 overflow-y-auto">
          {isSuccess ? (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-300">
              <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="font-serif text-2xl mb-2">Message Sent</h3>
              <p className="text-neutral-500 text-sm mb-6">
                Thank you for your inquiry. Our team will contact you shortly regarding <strong>{modelName}</strong>.
              </p>
              <Button 
                onClick={() => {
                  setIsSuccess(false);
                  onOpenChange(false);
                }}
                className="bg-black text-white rounded-none uppercase tracking-widest text-[10px] px-8"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] uppercase tracking-widest text-neutral-400">Name</Label>
                  <Input id="name" {...register('name')} className="rounded-none border-neutral-100 focus:border-black transition-colors" />
                  {errors.name && <p className="text-[9px] text-red-500 uppercase">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-neutral-400">Email</Label>
                  <Input id="email" type="email" {...register('email')} className="rounded-none border-neutral-100 focus:border-black transition-colors" />
                  {errors.email && <p className="text-[9px] text-red-500 uppercase">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-neutral-400">Subject</Label>
                  <Input id="subject" {...register('subject')} className="rounded-none border-neutral-100 focus:border-black transition-colors" />
                  {errors.subject && <p className="text-[9px] text-red-500 uppercase">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[10px] uppercase tracking-widest text-neutral-400">Message</Label>
                  <Textarea id="message" rows={4} {...register('message')} className="rounded-none border-neutral-100 focus:border-black transition-colors resize-none" />
                  {errors.message && <p className="text-[9px] text-red-500 uppercase">{errors.message.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-neutral-800 rounded-none py-6 uppercase tracking-[0.2em] text-[10px] font-bold"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Booking Inquiry'}
                </Button>
              </form>

              {/* Direct Contact */}
              <div className="pt-6 border-t border-neutral-100">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4 text-center">Or contact us directly</p>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="mailto:whoknowsmodels@gmail.com"
                    className="flex flex-col items-center justify-center p-4 border border-neutral-100 hover:bg-neutral-50 transition-colors group"
                  >
                    <Mail className="w-5 h-5 mb-2 text-neutral-400 group-hover:text-black transition-colors" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">Email</span>
                  </a>
                  <a 
                    href="https://wa.me/6285721288138"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 border border-neutral-100 hover:bg-neutral-50 transition-colors group"
                  >
                    <Phone className="w-5 h-5 mb-2 text-neutral-400 group-hover:text-black transition-colors" />
                    <span className="text-[9px] uppercase tracking-widest font-bold">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

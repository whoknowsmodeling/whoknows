'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const applySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().min(1, 'Age is required'),
  height: z.string().min(1, 'Height is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  instagram: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().optional(),
});

type ApplyFormData = z.infer<typeof applySchema>;

interface FileUploadState {
  headshot: File | null;
  sideProfile: File | null;
  fullBody: File | null;
}

export function ApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileUploadState>({
    headshot: null,
    sideProfile: null,
    fullBody: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplyFormData>({
    resolver: zodResolver(applySchema),
  });

  const handleFileChange = (type: keyof FileUploadState, file: File | null) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const onSubmit = async (data: ApplyFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (files.headshot) formData.append('headshot', files.headshot);
      if (files.sideProfile) formData.append('sideProfile', files.sideProfile);
      if (files.fullBody) formData.append('fullBody', files.fullBody);

      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit application');
      }

      setIsSuccess(true);
      reset();
      setFiles({ headshot: null, sideProfile: null, fullBody: null });
      toast.success('Application submitted!', {
        description: 'We\'ll review it and get back to you within 5–7 business days.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
      toast.error('Submission failed', { description: message });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
        role="status"
        aria-live="polite"
      >
        <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" aria-hidden="true" />
        <h3 className="font-serif text-2xl font-medium mb-2">Application Submitted!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for your interest in WhoKnows Models. Our team will review your application
          and get back to you within 5-7 business days.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Submit Another Application
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate aria-label="Model application form">
      {/* Global Error Message */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm font-medium">{submitError}</p>
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="font-serif text-xl font-medium border-b pb-2">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              {...register('fullName')}
              className={cn(errors.fullName && 'border-red-500')}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-sm text-red-500" role="alert">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              min="16"
              max="60"
              {...register('age')}
              className={cn(errors.age && 'border-red-500')}
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'age-error' : undefined}
            />
            {errors.age && (
              <p id="age-error" className="text-sm text-red-500" role="alert">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height *</Label>
            <Input
              id="height"
              placeholder="e.g., 5'9&quot; or 175cm"
              {...register('height')}
              className={cn(errors.height && 'border-red-500')}
              aria-invalid={!!errors.height}
              aria-describedby={errors.height ? 'height-error' : undefined}
            />
            {errors.height && (
              <p id="height-error" className="text-sm text-red-500" role="alert">{errors.height.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram Handle</Label>
            <Input
              id="instagram"
              placeholder="@whoknows.models"
              {...register('instagram')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              {...register('city')}
              className={cn(errors.city && 'border-red-500')}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? 'city-error' : undefined}
            />
            {errors.city && (
              <p id="city-error" className="text-sm text-red-500" role="alert">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              {...register('country')}
              className={cn(errors.country && 'border-red-500')}
              aria-invalid={!!errors.country}
              aria-describedby={errors.country ? 'country-error' : undefined}
            />
            {errors.country && (
              <p id="country-error" className="text-sm text-red-500" role="alert">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-6">
        <h3 className="font-serif text-xl font-medium border-b pb-2">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className={cn(errors.email && 'border-red-500')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500" role="alert">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              {...register('phone')}
              className={cn(errors.phone && 'border-red-500')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-red-500" role="alert">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Photo Uploads */}
      <div className="space-y-6">
        <h3 className="font-serif text-xl font-medium border-b pb-2">Photos</h3>
        <p className="text-sm text-neutral-600">
          Please upload clear, well-lit photos. No professional photos required — simple snapshots work great.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: 'headshot' as const, label: 'Headshot', desc: 'Close-up of your face' },
            { key: 'sideProfile' as const, label: 'Side Profile', desc: 'Profile view of your face' },
            { key: 'fullBody' as const, label: 'Full Body', desc: 'Standing full body shot' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`file-${key}`}>{label}</Label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(key, e.target.files?.[0] || null)}
                  className="hidden"
                  id={`file-${key}`}
                  aria-label={`Upload ${label} photo`}
                />
                <label
                  htmlFor={`file-${key}`}
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-black transition-colors focus-within:border-black focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                >
                  {files[key] ? (
                    <div className="text-center p-4">
                      <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" aria-hidden="true" />
                      <p className="text-sm font-medium truncate">{files[key]?.name}</p>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="w-8 h-8 mx-auto text-neutral-400 mb-2" aria-hidden="true" />
                      <p className="text-sm text-neutral-600">{desc}</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          placeholder="Tell us about yourself, your experience, and why you want to join WhoKnows Models..."
          rows={4}
          {...register('message')}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black hover:bg-neutral-800 text-white py-6 text-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-label={isSubmitting ? 'Submitting application, please wait' : 'Submit model application'}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
    </form>
  );
}

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function DashboardResetPasswordPage() {
  const { updatePassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const result = await updatePassword(data.password);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      form.reset();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-lg">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground text-sm mt-1">Update your account password</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          {success && (
            <div className="bg-primary/10 border border-primary/20 text-primary rounded-lg p-3 text-sm mb-6">
              Password updated successfully!
            </div>
          )}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-6">
              {error}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Min. 6 characters" data-testid="input-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" data-testid="input-confirm-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="rounded-full" disabled={form.formState.isSubmitting} data-testid="button-submit">
                {form.formState.isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
}

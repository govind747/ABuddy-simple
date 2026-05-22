import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Compass, Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const { updatePassword } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setLocation('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TRAVEL</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Set new password</h1>
            <p className="text-muted-foreground text-sm mt-1">Choose a strong new password for your account</p>
          </div>

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
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" data-testid="input-password" {...field} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
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
              <Button type="submit" className="w-full rounded-full h-11" disabled={form.formState.isSubmitting} data-testid="button-submit">
                {form.formState.isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

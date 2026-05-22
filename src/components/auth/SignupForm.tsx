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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export function SignupForm() {
  const { signUp } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const result = await signUp(data.email, data.password, data.name);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => setLocation('/login'), 3000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
        <div className="w-full max-w-md text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Check your email</h2>
          <p className="text-muted-foreground text-sm">We sent a confirmation link to your email. Click it to activate your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Compass className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TRAVEL</span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-muted-foreground text-sm mt-1">Start your adventure today</p>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" data-testid="input-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" data-testid="input-email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} placeholder="Min. 6 characters" data-testid="input-password" {...field} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
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
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" data-testid="input-confirm-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-full h-11" disabled={form.formState.isSubmitting} data-testid="button-submit">
                {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline" data-testid="link-login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

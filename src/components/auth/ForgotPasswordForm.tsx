import { useState } from 'react';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Compass, ArrowLeft, Mail } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type FormData = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const result = await resetPassword(data.email);
    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
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
            {sent ? (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
                <p className="text-muted-foreground text-sm mt-2">
                  We sent a password reset link to your email address. Check your inbox and follow the instructions.
                </p>
                <Link href="/login" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-6 hover:underline">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to login
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-foreground">Forgot password?</h1>
                <p className="text-muted-foreground text-sm mt-1">Enter your email and we will send you a reset link</p>
              </>
            )}
          </div>

          {!sent && (
            <>
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 text-sm mb-6">
                  {error}
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  <Button type="submit" className="w-full rounded-full h-11" disabled={form.formState.isSubmitting} data-testid="button-submit">
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              </Form>

              <div className="text-center mt-6">
                <Link href="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground" data-testid="link-back-login">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

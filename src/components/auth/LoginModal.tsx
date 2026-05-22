import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Eye, EyeOff, Compass, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

type Mode = 'login' | 'signup' | 'forgot';

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { signIn, signUp, resetPassword } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function resetState() {
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setName('');
    setShowPw(false);
  }

  function switchMode(m: Mode) {
    resetState();
    setMode(m);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const { error: err } = await signIn(email, password);
        if (err) throw err;
        onClose();
      } else if (mode === 'signup') {
        const { error: err } = await signUp(email, password, name);
        if (err) throw err;
        setSuccess('Account created! Check your email to verify.');
      } else {
        const { error: err } = await resetPassword(email);
        if (err) throw err;
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-3xl bg-background rounded-2xl shadow-2xl overflow-hidden flex"
          >
            {/* Left panel — image */}
            <div className="hidden md:flex md:w-5/12 relative flex-col justify-end p-8"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Compass className="h-6 w-6 text-white" />
                  <span className="text-white font-bold text-lg">TRAVEL</span>
                </div>
                <h2 className="text-white text-2xl font-bold leading-snug mb-2">
                  Your next adventure starts here
                </h2>
                <p className="text-white/70 text-sm">
                  Discover the world's most breathtaking destinations, handpicked for you.
                </p>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 p-8 flex flex-col justify-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create account' : 'Reset password'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === 'login' ? 'Sign in to your account to continue' : mode === 'signup' ? 'Start your travel journey today' : 'We\'ll send you a reset link'}
                </p>
              </div>

              {error && (
                <div className="mb-4 px-3 py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="pl-9 rounded-xl" />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="pl-9 rounded-xl" />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="pl-9 pr-10 rounded-xl" />
                      <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" onClick={() => switchMode('forgot')} className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full rounded-full h-11 font-semibold">
                  {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {mode === 'login' ? (
                  <>Don't have an account?{' '}<button onClick={() => switchMode('signup')} className="text-primary font-semibold hover:underline">Sign up</button></>
                ) : mode === 'signup' ? (
                  <>Already have an account?{' '}<button onClick={() => switchMode('login')} className="text-primary font-semibold hover:underline">Sign in</button></>
                ) : (
                  <button onClick={() => switchMode('login')} className="text-primary font-semibold hover:underline">← Back to login</button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

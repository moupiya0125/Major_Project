import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      await login(data.token);
      toast({ title: t('auth.loginSuccessTitle'), description: t('auth.loginSuccessDesc') });
      navigate('/');
    } catch (err: any) {
      toast({ variant: "destructive", title: t('auth.errorTitle'), description: err.response?.data?.message || t('auth.loginErrorDesc') });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('auth.loginTitle')}</CardTitle>
          <CardDescription>{t('auth.loginDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('auth.emailLabel')}</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>{t('auth.loginBtn')}</Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('auth.noAccount')}{' '}
            <Link to="/signup" className="underline">
              {t('auth.signupLink')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
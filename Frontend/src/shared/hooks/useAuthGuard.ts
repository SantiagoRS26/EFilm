import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/store/AuthContext';

export const useAuthGuard = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);
};

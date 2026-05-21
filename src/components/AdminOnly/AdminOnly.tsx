// components/AdminOnly.tsx
import { getSession } from '@/actions/auth';
import type { ReactNode } from 'react';

type AdminOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode; // Что показывать не-админам (опционально)
};

export async function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const session = await getSession();

  if (!session) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
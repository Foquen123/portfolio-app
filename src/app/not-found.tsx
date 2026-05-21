import { redirect } from 'next/navigation';

export default function NotFoundPage() {
  redirect('/');
  return <div>not found</div>;
}

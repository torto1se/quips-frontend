import { Sidebar } from '@/components/layout/Sidebar/Sidebar';
import { getCurrentUser } from '@/lib/auth-server';

export async function SidebarServer() {
  const user = await getCurrentUser();
  return <Sidebar user={user} />;
}

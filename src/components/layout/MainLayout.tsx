import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#F8FAFB] overflow-hidden">
      <AppSidebar />
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

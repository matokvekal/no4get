import { Outlet } from 'react-router-dom';
import '@/styles/global.css';

export function AuthLayout() {
  return (
    <div className="flex-col items-center justify-center" style={{ minHeight: '100dvh', background: 'var(--surface)' }}>
      <Outlet />
    </div>
  );
}

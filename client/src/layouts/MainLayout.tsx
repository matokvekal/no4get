import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/TopBar/TopBar.tsx';
import { BottomNav } from '@/components/BottomNav/BottomNav.tsx';
import { BurgerMenu } from '@/components/BurgerMenu/BurgerMenu.tsx';
import { ManagePeople } from '@/components/ManagePeople/ManagePeople.tsx';

export function MainLayout() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--background)' }}>
      <TopBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <BottomNav />
      <BurgerMenu />
      <ManagePeople />
    </div>
  );
}

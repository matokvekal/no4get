import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import { useAuth } from '@/core/auth/index.ts';
import { usePeopleStore, useUIStore } from '@/stores/index.ts';
import './TopBar.css';

export function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { people } = usePeopleStore();
  const { openBurgerMenu } = useUIStore();

  const giftMatch = useMatch('/gifts/:personId');
  const isDetail = !!giftMatch || location.pathname === '/add-friend';

  let subtitle: string | null = null;
  if (giftMatch) {
    const person = people.find((p) => p.id === giftMatch.params.personId);
    if (person) subtitle = `Curating for ${person.name}`;
  }

  const avatar = user?.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.id}`;

  return (
    <header className="topbar">
      <div className="topbar__left">
        {isDetail ? (
          <button className="topbar__icon-btn" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
        ) : (
          <button className="topbar__icon-btn" onClick={openBurgerMenu}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <div>
          <span className="topbar__logo">No4Get</span>
          {subtitle && <span className="topbar__subtitle">{subtitle}</span>}
        </div>
      </div>

      <div className="topbar__avatar">
        <img src={avatar} alt={user?.name ?? 'profile'} />
      </div>
    </header>
  );
}

import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

const tabs = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/people', icon: 'group', label: 'People' },
  { path: '/basket', icon: 'shopping_basket', label: 'Basket' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            className={`bottom-nav__tab${active ? ' bottom-nav__tab--active' : ''}`}
            onClick={() => { if (!active) navigate(tab.path); }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: active ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
            >
              {tab.icon}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

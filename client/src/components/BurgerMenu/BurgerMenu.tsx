import { useUIStore } from '@/stores/index.ts';
import './BurgerMenu.css';

const MENU_ITEMS = [
  { icon: 'group', label: 'Manage People', action: 'managePeople' },
  { icon: 'home', label: 'Home', action: 'home' },
  { icon: 'shopping_basket', label: 'Basket', action: 'basket' },
];

export function BurgerMenu() {
  const { showBurgerMenu, closeBurgerMenu, openManagePeople } = useUIStore();

  if (!showBurgerMenu) return null;

  const handleItem = (action: string) => {
    if (action === 'managePeople') { openManagePeople(); return; }
    closeBurgerMenu();
  };

  return (
    <>
      <div className="burger-backdrop" onClick={closeBurgerMenu} />
      <div className="burger-sheet">
        <div className="burger-sheet__handle" />
        <p className="burger-sheet__title">Menu</p>
        <nav className="burger-sheet__nav">
          {MENU_ITEMS.map((item) => (
            <button key={item.action} className="burger-sheet__item" onClick={() => handleItem(item.action)}>
              <span className="material-symbols-outlined burger-sheet__item-icon">{item.icon}</span>
              <span className="burger-sheet__item-label">{item.label}</span>
              <span className="material-symbols-outlined burger-sheet__item-arrow">chevron_right</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/core/auth/index.ts';
import { usePeopleStore, useOrderStore } from '@/stores/index.ts';
import { GreetingSection } from './components/GreetingSection.tsx';
import { PriorityBento } from './components/PriorityBento.tsx';
import { UpcomingSection } from './components/UpcomingSection.tsx';
import './HomePage.css';

export function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loadPeople, getUpcoming } = usePeopleStore();
  const { orders, loadOrders } = useOrderStore();

  useEffect(() => {
    loadPeople();
    loadOrders();
  }, [loadPeople, loadOrders]);

  const upcoming = getUpcoming(20);
  const next = upcoming[0];
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const lastGiftForNext = next
    ? (orders
        .filter(o => o.personId === next.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] ?? null)
    : null;

  return (
    <div className="home">
      <main className="home__main">
        <GreetingSection name={firstName} />

        {next ? (
          <PriorityBento person={next} lastGift={lastGiftForNext} />
        ) : (
          <div className="home__empty">
            <div className="home__empty-icon">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <h3 className="home__empty-title">Your Circle is Quiet</h3>
            <p className="home__empty-sub">
              Start by adding the people who matter most.
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/add-friend')}>
              Add Someone
            </button>
          </div>
        )}

        <UpcomingSection
          people={upcoming}
          onLoadMore={loadPeople}
          onCardClick={(id) => navigate(`/gifts/${id}`)}
        />
      </main>
    </div>
  );
}

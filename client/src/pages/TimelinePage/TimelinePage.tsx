import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore, usePeopleStore } from '@/stores/index.ts';
import type { Order, Person } from '@/core/types/index.ts';
import './TimelinePage.css';

function dotClass(index: number) {
  if (index === 0) return 'timeline__entry-dot timeline__entry-dot--recent';
  if (index === 1) return 'timeline__entry-dot timeline__entry-dot--mid';
  return 'timeline__entry-dot timeline__entry-dot--older';
}

function formatEntryDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDaysShort(days: number) {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
}

function HistoryEntry({ order, index }: { order: Order; index: number }) {
  const reversed = index % 2 !== 0;
  return (
    <div className="timeline__entry">
      <div className={dotClass(index)} />
      <div className="timeline__entry-card">
        <div className="timeline__entry-header">
          <span className="timeline__entry-date">{formatEntryDate(order.date)}</span>
          <h3 className="timeline__entry-title">{order.giftName} for {order.personName}</h3>
        </div>
        <div className={`timeline__entry-body${reversed ? ' timeline__entry-body--reversed' : ''}`}>
          <img
            className="timeline__entry-img"
            src={order.giftImage}
            alt={order.giftName}
          />
          <div className="timeline__entry-meta">
            <div className="timeline__entry-top-row">
              <span className="timeline__entry-badge">{order.status === 'delivered' ? 'Delivered' : 'Pending'}</span>
              <span className="timeline__entry-price">${order.price}</span>
            </div>
            <p className="timeline__entry-note">"{order.giftName} — a curated selection."</p>
            <div className="timeline__entry-sent">
              <span className="material-symbols-outlined">favorite</span>
              Sent to {order.personName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ person, onFindGift }: { person: Person; onFindGift: () => void }) {
  const avatar = person.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${person.id}`;
  const eventLabel = person.eventLabel ?? person.eventType;
  const eventDate = new Date(person.nextEventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="circle__contact-row">
      <div className="circle__contact-identity">
        <div className="circle__contact-avatar">
          <img src={avatar} alt={person.name} />
        </div>
        <div>
          <p className="circle__contact-name">{person.name}</p>
          <p className="circle__contact-role">{person.relation ?? 'Contact'}</p>
        </div>
      </div>

      <div className="circle__contact-tags">
        <span className="circle__contact-tag">{eventLabel}</span>
      </div>

      <div className="circle__contact-action">
        <div className="circle__contact-event">
          <p className="circle__contact-event-label">Next Event</p>
          <p className="circle__contact-event-value">{eventDate} · {formatDaysShort(person.daysUntil)}</p>
        </div>
        <button className="circle__contact-find" onClick={onFindGift}>
          Find Gift
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}

export function TimelinePage() {
  const navigate = useNavigate();
  const { orders, loadOrders, loading: ordersLoading } = useOrderStore();
  const { people, loadPeople } = usePeopleStore();

  useEffect(() => {
    loadOrders();
    loadPeople();
  }, [loadOrders, loadPeople]);

  const past = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcoming = [...people].sort((a, b) => a.daysUntil - b.daysUntil);
  const next = upcoming[0];

  return (
    <div style={{ background: 'var(--background)', minHeight: '100dvh' }}>
      <main className="timeline__main">

        {/* ── History of Meaningful Moments ── */}
        <section>
          <div className="timeline__section-intro">
            <span className="label-caps">Digital Archive</span>
            <h2>History of Meaningful Moments</h2>
            <p>A chronological record of every heart you've touched.</p>
          </div>

          {ordersLoading && <p className="timeline__empty">Loading…</p>}

          {!ordersLoading && past.length === 0 && (
            <p className="timeline__empty">No gifts yet — start gifting to build your archive.</p>
          )}

          {past.length > 0 && (
            <>
              <div className="timeline__track">
                <div className="timeline__line" />
                {past.map((o, i) => (
                  <HistoryEntry key={o.id} order={o} index={i} />
                ))}
              </div>

              <div className="timeline__view-all">
                <button className="timeline__view-all-btn">
                  <span>View Full History</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </>
          )}
        </section>

        {/* ── Your Circle ── */}
        <section>
          <div className="timeline__section-intro">
            <span className="label-caps">Social Curations</span>
            <h2>Your Circle</h2>
          </div>

          {/* Priority + Stats grid */}
          {next && (
            <div className="circle__priority-grid">
              <div className="circle__priority-card">
                <div>
                  <div className="circle__priority-top">
                    <span className="circle__priority-icon">
                      <span className="material-symbols-outlined">priority_high</span>
                    </span>
                    <span className="circle__priority-tag">Priority Event</span>
                  </div>
                  <h3 className="circle__priority-title">
                    {next.name}'s {next.eventLabel ?? next.eventType} requires a selection.
                  </h3>
                  <p className="circle__priority-sub">
                    {formatDaysShort(next.daysUntil)} — {new Date(next.nextEventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.
                  </p>
                </div>
                <button className="circle__priority-cta" onClick={() => navigate(`/gifts/${next.id}`)}>
                  View Curated Options
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <div className="circle__priority-deco">
                  <svg viewBox="0 0 100 100" fill="currentColor" style={{ color: 'var(--primary)', width: '100%', height: '100%' }}>
                    <circle cx="100" cy="50" r="50" />
                    <circle cx="100" cy="50" r="30" />
                  </svg>
                </div>
              </div>

              <div className="circle__stats">
                <div className="circle__stat-card circle__stat-card--primary">
                  <span className="circle__stat-number">{String(people.length).padStart(2, '0')}</span>
                  <span className="circle__stat-label">Total People</span>
                </div>
                <div className="circle__stat-card circle__stat-card--tertiary">
                  <span className="circle__stat-number">{String(upcoming.filter(p => p.daysUntil <= 30).length).padStart(2, '0')}</span>
                  <span className="circle__stat-label">Events This Month</span>
                </div>
              </div>
            </div>
          )}

          {/* Contacts list */}
          <div className="circle__contacts">
            <div className="circle__contacts-header">
              <span className="label-caps">Active Contacts</span>
              <span className="material-symbols-outlined" style={{ color: 'var(--outline)', cursor: 'pointer', fontSize: '1.25rem' }}>tune</span>
            </div>

            {upcoming.length === 0 && (
              <p className="timeline__empty">Add people to build your circle.</p>
            )}

            {upcoming.map((p) => (
              <ContactRow key={p.id} person={p} onFindGift={() => navigate(`/gifts/${p.id}`)} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

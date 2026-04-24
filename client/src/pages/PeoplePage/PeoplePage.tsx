import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeopleStore, useUIStore } from '@/stores/index.ts';
import { useOrderStore } from '@/stores/orderStore.ts';
import type { Order, Person } from '@/core/types/index.ts';
import './PeoplePage.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatEventDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function eventLabel(person: Person) {
  return person.eventLabel ?? person.eventType.charAt(0).toUpperCase() + person.eventType.slice(1);
}

function TimelineEntry({ order, index }: { order: Order; index: number }) {
  const isRight = index % 2 === 1;
  const dotShades = ['bg-slate-800', 'bg-slate-400', 'bg-slate-300'];
  const dotClass = dotShades[index % dotShades.length];

  return (
    <div className="tl-entry">
      <div className={`tl-entry__dot ${dotClass}`} />
      <div className={`tl-entry__card${isRight ? ' tl-entry__card--right' : ''}`}>
        <div className={`tl-entry__head${isRight ? ' tl-entry__head--right' : ''}`}>
          <span className="tl-entry__date">{formatDate(order.date)}</span>
          <h3 className="tl-entry__title">{order.giftName} for {order.personName}</h3>
        </div>
        <div className={`tl-entry__body${isRight ? ' tl-entry__body--right' : ''}`}>
          <img className="tl-entry__img" src={order.giftImage} alt={order.giftName} />
          <div className="tl-entry__meta">
            <div className="tl-entry__row-top">
              <span className={`tl-entry__badge tl-entry__badge--${order.status}`}>{order.status}</span>
              <span className="tl-entry__price">${order.price}</span>
            </div>
            <div className="tl-entry__sent">
              <span className="material-symbols-outlined">favorite</span>
              Sent to {order.personName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriorityCard({ person }: { person: Person }) {
  const navigate = useNavigate();
  const label = eventLabel(person);
  return (
    <div className="priority-card">
      <div className="priority-card__top">
        <div className="priority-card__flag">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
          <span>Priority Event</span>
        </div>
        <h3 className="priority-card__title">{person.name}'s {label} requires a selection.</h3>
        <p className="priority-card__sub">
          Event on {formatEventDate(person.nextEventDate)} — {person.daysUntil} days away.
          {person.daysUntil <= 7 ? ' Act now.' : ' Start curating soon.'}
        </p>
      </div>
      <button className="priority-card__btn" onClick={() => navigate(`/gifts/${person.id}`)}>
        View Curated Options
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
      <div className="priority-card__decor" aria-hidden />
    </div>
  );
}

function ContactRow({ person }: { person: Person }) {
  const navigate = useNavigate();
  const avatar = person.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${person.id}`;
  const label = eventLabel(person);
  const chips = person.tags ?? [
    ...(person.relation ? [person.relation] : []),
    label,
  ];

  return (
    <div className="contact-row">
      <div className="contact-row__identity">
        <div className="contact-row__avatar">
          <img src={avatar} alt={person.name} />
        </div>
        <div>
          <h5 className="contact-row__name">{person.name}</h5>
          <p className="contact-row__rel">{person.relation ?? 'Contact'}</p>
          <p className="contact-row__event-tag">{label} · {formatEventDate(person.nextEventDate)}</p>
        </div>
      </div>

      <div className="contact-row__center">
        <div className="contact-row__chips">
          {chips.map((chip) => (
            <span key={chip} className="contact-row__chip">{chip}</span>
          ))}
        </div>
        <button className="contact-row__find" onClick={() => navigate(`/gifts/${person.id}`)}>
          Find Gift
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="contact-row__event">
        <p className="contact-row__event-label">Next Event</p>
        <p className="contact-row__event-val">{label} · {formatEventDate(person.nextEventDate)}</p>
      </div>
    </div>
  );
}

export function PeoplePage() {
  const { people, loadPeople } = usePeopleStore();
  const {
    timelineOrders, timelineHasMore, timelineLoading, timelinePage,
    loadTimelinePage,
  } = useOrderStore();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const circleGridRef = useRef<HTMLDivElement>(null);
  const circleHeaderRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<'events' | 'name' | 'group'>('events');
  const { contactsPanel, toggleContactsPanel, closeContactsPanel } = useUIStore();
  const showSearch = contactsPanel === 'search';
  const showSortMenu = contactsPanel === 'sort';

  const byEvents = [...people].sort((a, b) => a.daysUntil - b.daysUntil);
  const sortedPeople = sortMode === 'name'
    ? [...people].sort((a, b) => a.name.localeCompare(b.name))
    : byEvents;

  const filteredPeople = sortedPeople.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedPeople = filteredPeople.reduce<Record<string, typeof filteredPeople>>((acc, p) => {
    const key = p.relation ?? 'Other';
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  const priorityPerson = byEvents[0] ?? null;
  const eventsThisMonth = people.filter((p) => p.daysUntil <= 30).length;

  useEffect(() => {
    loadPeople();
    if (timelinePage === 1 && timelineOrders.length === 0) {
      loadTimelinePage();
    }
  }, []);

  useEffect(() => {
    if (hasScrolled.current || !priorityPerson || timelineLoading || !circleHeaderRef.current) return;
    hasScrolled.current = true;

    const el = circleHeaderRef.current;
    const scrollToEl = () => el.scrollIntoView({ block: 'start', behavior: 'instant' });
    scrollToEl();

    const deadline = Date.now() + 1200;
    const ro = new ResizeObserver(() => {
      if (Date.now() > deadline) { ro.disconnect(); return; }
      scrollToEl();
    });
    const main = el.closest('.people-page__main');
    if (main) ro.observe(main);
    return () => ro.disconnect();
  }, [priorityPerson, timelineLoading]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadTimelinePage(); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [timelineHasMore, timelineLoading, loadTimelinePage]);

  return (
    <div className="people-page">
      <main className="people-page__main">

        {/* ── History of Meaningful Moments ─────── */}
        {(timelineOrders.length > 0 || timelineLoading) && (
          <section className="tl-section">
            <div className="tl-section__header">
              <span className="label-caps">Digital Archive</span>
              <h2 className="tl-section__title">History of Meaningful Moments</h2>
              <p className="tl-section__sub">A chronological record of every heart you've touched.</p>
            </div>

            <div className="tl-entries">
              <div className="tl-line" />
              {timelineOrders.map((order, i) => (
                <TimelineEntry key={order.id} order={order} index={i} />
              ))}
              {timelineHasMore && <div ref={sentinelRef} className="tl-sentinel" />}
              {timelineLoading && <p className="tl-loading">Loading more…</p>}
            </div>
          </section>
        )}

        {/* ── Your Circle ───────────────────────── */}
        <section className="circle-section">
          <div className="circle-section__header" ref={circleHeaderRef}>
            <span className="label-caps">Social Curations</span>
            <h2 className="circle-section__title">Your Circle</h2>
          </div>

          {priorityPerson && (
            <div className="circle-grid" ref={circleGridRef}>
              <PriorityCard person={priorityPerson} />
              <div className="circle-stats">
                <div className="stat-box stat-box--primary">
                  <span className="stat-box__num">{String(people.length).padStart(2, '0')}</span>
                  <span className="stat-box__label">Total People</span>
                </div>
                <div className="stat-box stat-box--tertiary">
                  <span className="stat-box__num">{String(eventsThisMonth).padStart(2, '0')}</span>
                  <span className="stat-box__label">Events This Month</span>
                </div>
              </div>
            </div>
          )}

          <div className="contacts-list">
            <div className="contacts-list__header">
              <span className="label-caps">Active Contacts</span>
              <div className="contacts-list__tools">
                <span
                  className={`material-symbols-outlined contacts-list__icon${showSearch ? ' contacts-list__icon--active' : ''}`}
                  onClick={() => { toggleContactsPanel('search'); setSearchQuery(''); }}
                >search</span>

                <div className="contacts-list__sort-wrap">
                  <span
                    className={`material-symbols-outlined contacts-list__icon${showSortMenu ? ' contacts-list__icon--active' : ''}`}
                    onClick={() => toggleContactsPanel('sort')}
                  >sort</span>
                  {showSortMenu && (
                    <div className="sort-menu">
                      {(['events', 'name', 'group'] as const).map((mode) => (
                        <button
                          key={mode}
                          className={`sort-menu__item${sortMode === mode ? ' sort-menu__item--active' : ''}`}
                          onClick={() => { setSortMode(mode); closeContactsPanel(); }}
                        >
                          {mode === 'events' ? 'Upcoming Events' : mode === 'name' ? 'Name' : 'Group'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="material-symbols-outlined contacts-list__icon">tune</span>
              </div>
            </div>

            {showSearch && (
              <div className="contacts-list__search">
                <span className="material-symbols-outlined">search</span>
                <input
                  type="text"
                  placeholder="Search by name…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {sortMode === 'group'
              ? Object.entries(groupedPeople).map(([group, members]) => (
                  <div key={group} className="contacts-group">
                    <span className="contacts-group__label">{group}</span>
                    {members.map((p) => <ContactRow key={p.id} person={p} />)}
                  </div>
                ))
              : filteredPeople.map((p) => <ContactRow key={p.id} person={p} />)
            }
          </div>
        </section>

      </main>
    </div>
  );
}

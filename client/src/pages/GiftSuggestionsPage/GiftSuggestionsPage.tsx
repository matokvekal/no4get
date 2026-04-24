import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useGiftsStore, usePeopleStore, useOrderStore } from '@/stores/index.ts';
import type { Gift, BasketItem } from '@/core/types/index.ts';
import './GiftSuggestionsPage.css';

const SLIDER_MIN = 50;
const SLIDER_MAX = 1000;

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function GiftCard({ gift, onAdd }: { gift: Gift; onAdd: () => void }) {
  return (
    <div className="gc-card">
      <div className="gc-card__img-wrap">
        <img src={gift.image} alt={gift.name} className="gc-card__img" />
      </div>
      <div className="gc-card__body">
        <span className="gc-card__cat">{gift.category}</span>
        <p className="gc-card__name">{gift.name}</p>
        <p className="gc-card__quote">"{gift.vibeTag ?? gift.description}"</p>
        <div className="gc-card__footer">
          <span className="gc-card__price">${gift.price}</span>
          <button className="gc-card__add" onClick={onAdd}>
            Add
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function GiftSuggestionsPage() {
  const { personId } = useParams<{ personId: string }>();
  const { gifts, messages, budget, loading, chatLoading, loadSuggestions, loadGiftsOnly, sendMessage, setBudget } = useGiftsStore();
  const { people } = usePeopleStore();
  const { addToBasket } = useOrderStore();

  const [input, setInput] = useState('');
  const [sliderVal, setSliderVal] = useState(budget);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevPersonId = useRef<string | null>(null);
  const budgetDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const person = people.find((p) => p.id === personId);

  useEffect(() => {
    if (!personId || personId === prevPersonId.current) return;
    prevPersonId.current = personId;
    setSliderVal(budget);
    loadSuggestions(personId, budget);
  }, [personId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    setBudget(val);
    if (budgetDebounce.current) clearTimeout(budgetDebounce.current);
    budgetDebounce.current = setTimeout(() => {
      if (personId) loadGiftsOnly(personId, val);
    }, 600);
  }, [personId, setBudget, loadGiftsOnly]);

  const handleAddToBasket = (gift: Gift) => {
    if (!person) return;
    const item: BasketItem = {
      giftId: gift.id,
      giftName: gift.name,
      giftImage: gift.image,
      price: gift.price,
      personId: person.id,
      personName: person.name,
    };
    addToBasket(item);
  };

  const handleSend = async () => {
    if (!input.trim() || !personId) return;
    const msg = input;
    setInput('');
    await sendMessage(personId, msg);
  };

  const sliderPercent = ((sliderVal - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

  return (
    <div className="chat-page">

      {/* ── Sticky top: gift cards → slider → divider */}
      <div className="chat-top">

        <div className="gift-section">
          <div className="gift-section__header">
            <h3 className="gift-section__title">Curator's Current Direction</h3>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--primary-dim)' }}>auto_awesome</span>
          </div>
          {loading ? (
            <p className="gift-section__loading">Finding gifts…</p>
          ) : (
            <div className="gift-section__scroll hide-scrollbar">
              {gifts.map((g) => (
                <GiftCard key={g.id} gift={g} onAdd={() => handleAddToBasket(g)} />
              ))}
              {gifts.length === 0 && <p className="gift-section__loading">No gifts in this range yet.</p>}
            </div>
          )}
        </div>

        <div className="budget-section">
          <div className="budget-section__labels">
            <span className="label-caps">Investment Range</span>
            <div className="budget-section__amount">
              <span className="budget-section__value">${sliderVal}</span>
              <span className="budget-section__currency">USD</span>
            </div>
          </div>
          <div className="budget-section__slider-wrap">
            <input
              type="range"
              className="budget-slider"
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={10}
              value={sliderVal}
              onChange={handleSliderChange}
              style={{ '--pct': `${sliderPercent}%` } as React.CSSProperties}
            />
            <div className="budget-slider__marks">
              <span>$50</span><span>$250</span><span>$500</span><span>$750</span><span>$1000+</span>
            </div>
          </div>
        </div>

        <div className="chat-divider" />
      </div>

      {/* ── Scrollable: chat messages only ──────── */}
      <div className="chat-scroll hide-scrollbar">
        <div className="chat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`chat-bubble chat-bubble--${m.role}`}>
              <div className="chat-bubble__text">{m.content}</div>
              <span className="chat-bubble__time">
                {m.role === 'assistant' ? 'Curator' : 'You'} · {formatTime(m.timestamp)}
              </span>
            </div>
          ))}
          {chatLoading && (
            <div className="chat-bubble chat-bubble--assistant">
              <div className="chat-bubble__text chat-bubble__text--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

      </div>

      {/* ── Fixed chat input above BottomNav ─────── */}
      <footer className="chat-input-bar">
        <div className="chat-input-bar__inner">
          <input
            className="chat-input-bar__field"
            placeholder="Describe their style…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="chat-input-bar__send"
            onClick={handleSend}
            disabled={chatLoading || !input.trim()}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

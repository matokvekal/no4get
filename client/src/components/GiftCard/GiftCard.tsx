import type { Gift } from '@/core/types/index.ts';
import './GiftCard.css';

interface Props {
  gift: Gift;
  onAdd?: () => void;
  selected?: boolean;
}

export function GiftCard({ gift, onAdd, selected }: Props) {
  return (
    <div className={`gift-card ${selected ? 'gift-card--selected' : ''}`}>
      <div className="gift-card__image">
        <img src={gift.image} alt={gift.name} />
        {gift.vibeTag && <span className="gift-card__vibe">{gift.vibeTag}</span>}
      </div>
      <div className="gift-card__body">
        <p className="gift-card__name">{gift.name}</p>
        <p className="gift-card__desc">{gift.description}</p>
        <div className="flex items-center justify-between" style={{ marginTop: 'auto' }}>
          <span className="gift-card__price">${gift.price}</span>
          {onAdd && (
            <button className="btn btn-primary gift-card__add" onClick={onAdd}>
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

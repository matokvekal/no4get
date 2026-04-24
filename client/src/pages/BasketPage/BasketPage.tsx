import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/index.ts';
import './BasketPage.css';

export function BasketPage() {
  const navigate = useNavigate();
  const { basket, removeFromBasket, checkout, basketTotal, loading } = useOrderStore();

  const handleCheckout = async () => {
    try {
      await checkout();
      navigate('/timeline');
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <div className="basket page">
      <header className="basket__header flex items-center gap-md">
        <button className="btn btn-ghost" style={{ padding: 'var(--space-sm)' }} onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="basket__title">Your Basket</h1>
      </header>

      <div className="basket__body flex-col gap-md">
        {basket.length === 0 ? (
          <div className="basket__empty flex-col items-center gap-lg text-center">
            <span style={{ fontSize: '3rem' }}>🛍️</span>
            <p style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '1.2rem' }}>Basket is empty</p>
            <button className="btn btn-ghost" onClick={() => navigate('/')}>Browse gifts</button>
          </div>
        ) : (
          <>
            {basket.map((item) => (
              <div key={item.giftId} className="basket__item flex items-center gap-md">
                <div className="basket__item-img">
                  <img src={item.giftImage} alt={item.giftName} />
                </div>
                <div className="flex-1">
                  <p className="basket__item-name">{item.giftName}</p>
                  <p className="basket__item-for">For {item.personName}</p>
                  <p className="basket__item-price">${item.price}</p>
                </div>
                <button className="btn btn-ghost" style={{ padding: 'var(--space-sm)', color: 'var(--error)' }} onClick={() => removeFromBasket(item.giftId)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}

            <div className="basket__summary">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="basket__total">${basketTotal()}</span>
              </div>
            </div>

            <button className="btn btn-primary w-full basket__pay-btn" onClick={handleCheckout} disabled={loading}>
              <span className="material-symbols-outlined">credit_card</span>
              {loading ? 'Processing…' : `Pay $${basketTotal()}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

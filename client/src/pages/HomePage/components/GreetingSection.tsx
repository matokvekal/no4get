import './GreetingSection.css';

function getDayLabel() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
}

function getGreetingWord() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

interface Props { name: string; }

export function GreetingSection({ name }: Props) {
  return (
    <section className="greeting">
      <span className="greeting__date">{getDayLabel()}</span>
      <h2 className="greeting__title">
        {getGreetingWord()}, <strong>{name}.</strong>
      </h2>
    </section>
  );
}

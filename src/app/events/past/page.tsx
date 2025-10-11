import Button from '@/shared/ui/Button';
import { Title } from '@/shared/ui/Typography';
import EventDetails from '@/widgets/EventDetails';

export default function PastEvent() {
  return (
    <EventDetails
      id="1"
      title="День программиста 2025"
      description="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
      coverUrl="/images/cover.png"
      date={new Date('2025-09-01')}
      fillColor="blue"
      caption=""
      before={
        <Button variant="white" size="primary">
          <Title level={5}>Обратная связь</Title>
        </Button>
      }
      after={
        <div className="flex flex-col gap-4">
          <Button variant="white" size="primary">
            <Title level={5}>Фотоальбом</Title>
          </Button>
          <Button variant="white" size="primary">
            <Title level={5}>Видеоотчёт</Title>
          </Button>
        </div>
      }
      status="Завершено"
      details={['03.08.2025', '500 человек', 'Спектр']}
    />
  );
}

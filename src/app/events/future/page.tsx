import Button from '@/shared/ui/Button';
import { Text, Title } from '@/shared/ui/Typography';
import EventDetails from '@/widgets/EventDetails';

export default function FutureEvent() {
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
          <Title level={5}>Зарегистрироваться</Title>
        </Button>
      }
      after={
        <Text className="text-white/70" level={1}>
          Конгресс-центр
        </Text>
      }
      status="20.11.2025"
    />
  );
}

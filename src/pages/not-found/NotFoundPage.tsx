import { NotFoundState } from '@/components/not-found/NotFoundState'

export function NotFoundPage() {
  return (
    <NotFoundState
      testId="not-found-page"
      title="Страница не найдена"
      description="Кажется, такой страницы у нас нет. Проверь адрес или вернись на главную."
    />
  )
}

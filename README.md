# СтудИУ

Сайт Студенческого совета факультета ИУ МГТУ им. Н.Э. Баумана.

## Стек

- **React 19**
- **Vite 7**
- **MobX**
- **Zod**

## Установка

```bash
bun install
```

## Разработка

```bash
cp .env.example .env   # укажи VITE_PROXY_TARGET, если бэкенд не на localhost:8000
npm run dev
```

Проксирует `/api` и `/media` на `http://localhost:8000`.

## Сборка

```bash
npm run build
```

## Переменные окружения

| Переменная | По умолчанию | Назначение |
|---|---|---|
| `VITE_PROXY_TARGET` | `http://localhost:8000` | цель dev-прокси |
| `VITE_API_BASE_URL` | пусто (тот же origin) | прямой baseURL API в обход прокси |
| `VITE_ENABLE_MOCKS` | `false` | мок-данные вместо реальных запросов |

## Тесты

```bash
npm test             # юнит-тесты (bun test)
npm run test:e2e     # Playwright: desktop + mobile
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

e2e идут на моках.

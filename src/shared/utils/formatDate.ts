export default function formatDate(date: string | Date | undefined): string {
    if (!date) return '';

    const d = new Date(date);

    if (isNaN(d.getTime())) return '';

    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(d);
}

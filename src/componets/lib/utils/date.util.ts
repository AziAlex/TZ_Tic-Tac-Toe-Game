export const formatDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // Явно получаем время в миллисекундах

  const seconds: number = Math.floor(diff / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} дня назад в ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  } else if (days === 1) {
    return `вчера в ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  } else {
    return `сегодня в ${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
  }
}
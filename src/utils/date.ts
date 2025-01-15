export function formatDisplayedDate(date: Date) {
  return date
    .toLocaleString('default', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/,/g, '');
}

export function msToHMS(ms: number) {
  let seconds = ms / 1000;
  // const hours = (seconds / 3600).toFixed(); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
  seconds = Math.floor(seconds % 60);

  return `
    ${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}
  `;
}

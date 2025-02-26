export function formatRuntime(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes > 0 && minutes}m`;
}

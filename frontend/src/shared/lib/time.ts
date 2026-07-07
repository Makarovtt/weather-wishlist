const STALE_THRESHOLD_MINUTES = 30;

export const formatDateTime = (isoString: string) =>
  new Date(isoString).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const isStale = (isoString: string) => {
  const diffMs = Date.now() - new Date(isoString).getTime();
  return diffMs > STALE_THRESHOLD_MINUTES * 60 * 1000;
};

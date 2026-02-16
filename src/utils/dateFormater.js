export const DayFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

export const TimeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "numeric",
});

export function formatEvent(date) {
  return `${DayFormatter.format(date)} à ${TimeFormatter.format(date)}`;
}

export default function dateFormater(date) {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
}

export default function dateFormater(date) {
    const dateObj = new Date(date);
  return (
    new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(dateObj)
  )
}
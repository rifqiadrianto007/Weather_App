export function getLocalDateTime(utcSeconds, timezoneOffset) {
  return new Date((utcSeconds + timezoneOffset) * 1000);
}

export function formatDay(date) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// night mode detection
export function isNightTime(date) {
  const hour = date.getHours();
  return hour >= 18 || hour < 6;
}
export function getHoursAndMinutesBetweenTimestamps(
  t1: number,
  t2: number
): { hours: number; minutes: number } {
  if (t1 < 1e11 && t2 < 1e11) {
    t1 *= 1000;
    t2 *= 1000;
  }
  const diffMs = Math.abs(t2 - t1);
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

export function calculatePayment(
  playerIndex: number,
  maxPlayers: number,
  totalValueToCollect: number,
  minPrice: number
): number {
  if (playerIndex < 1 || playerIndex > maxPlayers) {
    throw new Error("Invalid player index");
  }
  const maxPayment = (2 * totalValueToCollect) / maxPlayers - minPrice;
  const payment =
    minPrice + ((maxPayment - minPrice) * (playerIndex - 1)) / (maxPlayers - 1);
  return Math.floor(payment);
}

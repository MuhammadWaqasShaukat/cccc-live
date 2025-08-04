export function calculatePayment(
  startIndex: number,
  quantity: number,
  maxPlayers: number,
  totalValueToCollect: number,
  minPrice: number
): number {
  if (startIndex < 1 || startIndex + quantity - 1 > maxPlayers) {
    throw new Error("InvalidPlayerIndex");
  }

  const numerator = 2 * totalValueToCollect - 2 * minPrice * maxPlayers;
  const denominator = maxPlayers * (maxPlayers - 1);
  const d = (numerator + denominator / 2) / denominator;

  const a = minPrice + d * (startIndex - 1);

  const sum = (quantity * (2 * a + (quantity - 1) * d)) / 2;

  return sum / 1e9;
}

// export function calculatePayment(
//   playerIndex: number,
//   maxPlayers: number,
//   totalValueToCollect: number,
//   minPrice: number
// ): number {
//   if (playerIndex < 1 || playerIndex > maxPlayers) {
//     throw new Error("Invalid player index");
//   }
//   const maxPayment = (2 * totalValueToCollect) / maxPlayers - minPrice;
//   const payment =
//     minPrice + ((maxPayment - minPrice) * (playerIndex - 1)) / (maxPlayers - 1);
//   return Math.floor(payment);
// }

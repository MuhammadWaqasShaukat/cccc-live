export const NextCrackTime = ({
  nextCrackAvailabilty,
}: {
  nextCrackAvailabilty: number;
}) => {
  const now = Math.floor(Date.now() / 1000);
  const diffInSeconds = Math.abs(nextCrackAvailabilty - now);

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  return (
    <div className=" font-patrick-hand-sc inline-block text-2xl">
      {hours}
      <span className="text-lg">H</span> {minutes}
      <span className="text-lg">M</span>
    </div>
  );
};

const InfoText = ({ text }: { text: string }) => {
  return (
    <div className=" flex flex-row justify-start items-start font-patrick-hand text-white gap-4">
      <span className="font-patrick-hand">(!)</span>
      <span className=" capitalize">{text}</span>
    </div>
  );
};

export default InfoText;

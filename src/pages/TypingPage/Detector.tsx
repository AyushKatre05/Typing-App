interface PreviewProps {
  text: string;
  userInput: string;
}

const Detector = (props: PreviewProps) => {
  const { text, userInput } = props;
  const textArr = text.split("");
  return (
    <div className="px-3">
      {textArr.map((s, i) => {
        let hightlightColor = "";
        if (i < userInput.length) {
          const isCorrect = s === userInput[i];
          hightlightColor = isCorrect ? "bg-green-300" : "bg-red-300";
        }
        return (
          <span key={i} className={`${hightlightColor}`}>
            {s}
          </span>
        );
      })}
    </div>
  );
};

export default Detector;
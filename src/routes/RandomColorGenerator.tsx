import { useState } from "react";

const RandomColorGenerator: React.FC = () => {
  const [typeOfColor, setTypeOfColor] = useState<string>("hex");
  const [color, setColor] = useState<string | undefined>();

  const generateRandomHexColor = (): string => {
    const letters: string = "0123456789abcdef";
    let color: string = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const generateRandomRGBColor = (): string => {
    const numGenerator = (): number => Math.floor(Math.random() * 255);

    const r = numGenerator();
    const g = numGenerator();
    const b = numGenerator();

    return `rgb(${r},${g},${b})`;
  };

  const handleClick = (type: string): void => {
    setColor(type === "hex" ? generateRandomHexColor() : generateRandomRGBColor());
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='heading-2 mb-5'>Random Color Generator</h2>

      <div className='flex gap-4 '>
        <button className='btn-primary' onClick={() => handleClick("hex")}>
          Hex Color
        </button>

        <button className='btn-primary' onClick={() => handleClick("rgb")}>
          RGB Color
        </button>
      </div>

      <div
        className='w-[300px] h-[300px] border-2 border-solid border-white mt-5'
        style={{ backgroundColor: color }}
      ></div>

      {color && <p className='mt-4 text-xl'>Color: {color}</p>}
    </div>
  );
};
export default RandomColorGenerator;

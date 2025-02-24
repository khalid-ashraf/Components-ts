import { useState } from "react";

const RandomColorGenerator: React.FC = () => {
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
    <main
      className='flex flex-col justify-center items-center'
      role='main'
      aria-label='Random Color Generator'
    >
      <h1 className='heading-2 mb-5'>Random Color Generator</h1>

      <div className='flex gap-4' role='group' aria-label='Color format selection'>
        <button
          className='btn-primary'
          onClick={() => handleClick("hex")}
          aria-label='Generate Hex Color'
        >
          Generate Hex Color
        </button>

        <button
          className='btn-primary'
          onClick={() => handleClick("rgb")}
          aria-label='Generate RGB Color'
        >
          Generate RGB Color
        </button>
      </div>

      <div
        className='w-[300px] h-[300px] border-2 border-solid border-white mt-5'
        style={{ backgroundColor: color }}
        role='region'
        aria-label={`Color preview: ${color || "No color selected"}`}
      ></div>

      {color && (
        <div className='mt-4 text-xl' aria-live='polite'>
          <span className='sr-only'>Current color value:</span>
          <p>Color: {color}</p>
        </div>
      )}
    </main>
  );
};

export default RandomColorGenerator;

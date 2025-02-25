import { useState, useCallback, memo } from "react";

// Add type for color format
type ColorFormat = "hex" | "rgb";

// Memoized color button component
const ColorButton = memo(
  ({
    format,
    onClick,
    label,
  }: {
    format: ColorFormat;
    onClick: (format: ColorFormat) => void;
    label: string;
  }) => (
    <button
      className='btn-primary'
      onClick={() => onClick(format)}
      aria-label={`Generate ${label}`}
    >
      Generate {label}
    </button>
  )
);

ColorButton.displayName = "ColorButton";

const RandomColorGenerator: React.FC = () => {
  const [type, setType] = useState<ColorFormat>("hex");
  const [color, setColor] = useState<string>("");

  // Memoize color generation functions
  const generateRandomHexColor = useCallback((): string => {
    const letters = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }, []);

  const generateRandomRGBColor = useCallback((): string => {
    const numGenerator = () => Math.floor(Math.random() * 255);
    const [r, g, b] = Array.from({ length: 3 }, numGenerator);
    return `rgb(${r},${g},${b})`;
  }, []);

  // Memoize click handler
  const handleClick = useCallback(
    (format: ColorFormat): void => {
      setType(format);
      setColor(format === "hex" ? generateRandomHexColor() : generateRandomRGBColor());
    },
    [generateRandomHexColor, generateRandomRGBColor]
  );

  return (
    <main
      className='flex flex-col justify-center items-center'
      role='main'
      aria-label='Random Color Generator'
    >
      <h1 className='heading-2 mb-5'>Random Color Generator</h1>

      <div className='flex gap-4' role='group' aria-label='Color format selection'>
        <ColorButton format='hex' onClick={handleClick} label='Hex Color' />
        <ColorButton format='rgb' onClick={handleClick} label='RGB Color' />
      </div>

      <div
        className='w-[300px] h-[300px] border-2 border-solid border-white mt-5'
        style={{ backgroundColor: color }}
        role='region'
        aria-label={`Color preview: ${color || "No color selected"}`}
      />

      {color && (
        <div className='mt-4 text-xl' aria-live='polite'>
          <span className='sr-only'>Current color value:</span>
          <p>Color: {color}</p>
        </div>
      )}
    </main>
  );
};

export default memo(RandomColorGenerator);

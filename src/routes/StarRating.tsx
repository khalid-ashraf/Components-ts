import { useState } from "react";

type InputElement = {
  dataset: {
    id: number;
  };
} & HTMLInputElement;

const StarRating = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleChange = (e: React.MouseEvent<HTMLFieldSetElement>) => {
    const input = (e.target as HTMLElement).closest("input") as InputElement | null;

    if (!input?.dataset.id) return;

    setSelected(Number(input.dataset.id));
  };

  return (
    <div className='text-center'>
      <h2 className='heading-2 pb-4'>Star Rating</h2>

      <fieldset onChange={handleChange}>
        <legend>Rate from 1 - 5 stars</legend>

        {Array.from({ length: 5 }).map((_, id) => {
          const isHovered = hovered !== null && hovered >= id;
          const isSelected = selected !== null && selected >= id;
          const starValue = id + 1;

          return (
            <label key={id} className='relative p-2 cursor-pointer'>
              <input
                type='radio'
                name='rating'
                value={starValue}
                className='sr-only' // Hide input but keep it accessible
                defaultChecked={isSelected}
                data-id={id}
                aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
              />
              <i
                className={`fa-solid fa-star text-2xl ${
                  isHovered ? "text-yellow-200" : ""
                } ${isSelected ? "text-yellow-500" : ""}`}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                aria-hidden='true'
              />
            </label>
          );
        })}
      </fieldset>
    </div>
  );
};
export default StarRating;

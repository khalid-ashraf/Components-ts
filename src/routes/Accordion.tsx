import { useState, memo, useCallback, JSX } from "react";

type AccordionContentType = {
  question: string;
  answer: string;
};

// This is Button Element which extends HTML element but since we are adding a data-index attribute to our button element, we have to add dataset type to the button element interface.
type ButtonElement = {
  dataset: {
    index: string;
  };
} & HTMLButtonElement;

type AccordionItemProps = {
  accordionItem: AccordionContentType;
  accordionItemId: number;
  isOpen: boolean;
};

const accordionContent: AccordionContentType[] = [
  {
    question: "What are accordion components?",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia quod cum ab aperiam fugit esse dolorem amet totam et, necessitatibus iusto explicabo sed soluta unde nobis magnam libero facere hic?",
  },
  {
    question: "What are they?",
    answer:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti iure temporibus eius optio praesentium. Nesciunt animi amet quia sed hic, labore, omnis laborum, ut accusantium perspiciatis et quae adipisci excepturi!",
  },
  {
    question: "What is React?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci nobis quidem culpa numquam eius minima illo dolores odit modi, aliquid, nihil id veritatis illum! Totam saepe eius amet repellat reprehenderit?",
  },
  {
    question: "What is JSX?",
    answer:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae laboriosam expedita dolores ullam, quas blanditiis beatae numquam architecto ipsa natus perferendis consectetur, sit error dolor, soluta veniam doloribus debitis et?",
  },
];

const Accordion: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);

  // Using event delegation so that there are not multiple instances of handle click event listener.
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // element.closest('button') helps us find the closest ancestor of the clicked item which has the attribute we defined; in this case, is button.

    const button = (e.target as HTMLElement).closest("button") as ButtonElement | null;

    // element.closest can return null if the no ancestor is a button.
    if (!button?.dataset.index) return;

    const index = button.dataset.index;

    setSelected(+index);
  }, []);

  return (
    <div className='div-center'>
      <h2 className='heading-2'>Accordion</h2>

      <div className='flex flex-col w-[700px] gap-5' onClick={handleClick}>
        {accordionContent?.map((accordionItem, accordionItemId) => {
          const isOpen = accordionItemId === selected;

          return (
            <AccordionItem
              key={accordionItemId}
              accordionItem={accordionItem}
              accordionItemId={accordionItemId}
              isOpen={isOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;

// Accordion Item sub component
const AccordionItem = memo(
  ({ accordionItem, accordionItemId, isOpen }: AccordionItemProps): JSX.Element => {
    return (
      <div
        className='bg-[#5e503f] p-4'
        role='region'
        aria-labelledby={`accordion-header-${accordionItemId}`}
      >
        <button
          className='w-[100%] flex justify-between'
          disabled={isOpen}
          data-index={accordionItemId}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${accordionItemId}`}
          id={`accordion-header-${accordionItemId}`}
        >
          <h3 className='text-xl font-semibold pb-2'>{accordionItem.question}</h3>
          <span aria-hidden='true'>{isOpen ? "-" : "+"}</span>
        </button>

        {isOpen && (
          <div id={`accordion-content-${accordionItemId}`}>
            <p>{accordionItem.answer}</p>
          </div>
        )}
      </div>
    );
  }
);

// When using React.memo, React Dev Tools will not be able to see the component name. By Doing this, you can see the component name in React Dev Tools.
AccordionItem.displayName = "AccordionItem";

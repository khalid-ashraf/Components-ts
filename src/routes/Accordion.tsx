import { useState } from "react";

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

type AccordionItemProps = {
  accordionItem: AccordionContentType;
  accordionItemId: number;
  isOpen: boolean;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  accordionItem,
  accordionItemId,
  isOpen,
}) => {
  return (
    <div className='bg-[#5e503f] p-4' key={accordionItemId}>
      <button
        className='w-[100%] flex justify-between'
        disabled={isOpen}
        data-index={accordionItemId}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${accordionItemId}`}
      >
        <h3 className='text-xl font-semibold pb-2'>{accordionItem.question}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && <p>{accordionItem.answer}</p>}
    </div>
  );
};

const Accordion: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);

  // Using event delegation so that there are not multiple instances of handle click event listener.
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;

    // element.closest('button') helps us find the closest ancestor of the clicked item which has the attribute we defined; in this case, is button.
    const button = element.closest("button") as ButtonElement | null;

    // element.closest can return null if the no ancestor is a button.
    if (!button) return;

    const index = button.getAttribute("data-index");
    if (!index) return;

    setSelected(+index);
  };

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <h2 className='heading-2'>Accordion</h2>

      <div className='flex flex-col w-[700px] gap-5' onClick={handleClick}>
        {accordionContent.map((accordionItem, accordionItemId) => {
          const isOpen = accordionItemId === selected;

          return (
            <AccordionItem
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

/*
1. Create a component which has a state responsible to display the modal. State: IsOpen = false
2. Create a button which when clicked will change the isOpen to true.
3. Create a portal using createPortal hook in react and make sure it is conditionally rendered.
4. Make the portal component fixed, width and height to the screen size, and make sure to define top-0 and left-0.
5. You can have a portal content div and place it in the center using display: flex
*/

import { memo, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Portal: React.FC<PortalProps> = memo(({ setIsOpen }) => {
  return (
    <div className='fixed z-10 w-screen h-screen bg-green-300 opacity-50 top-0 left-0 text-black flex justify-center items-center'>
      <div
        onClick={() => setIsOpen(false)}
        className='h-[500px] w-[500px] bg-orange-300 grid place-items-center'
      >
        Click anywhere to close portal!
      </div>
    </div>
  );
});

const Modal = memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <h1 className='heading-2'>Modal</h1>

      <button onClick={() => setIsOpen((prev) => !prev)} className='btn-primary'>
        Click to open modal
      </button>

      {isOpen && createPortal(<Portal setIsOpen={setIsOpen} />, document.body)}
    </div>
  );
});

Portal.displayName = "Portal";
Modal.displayName = "Modal";

export default Modal;

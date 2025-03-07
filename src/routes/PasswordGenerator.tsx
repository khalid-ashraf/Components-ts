/**
 * 1. We have an input that sets the length of the password. Keep the range between 8 and 20. Input type range.
 * 2. We have 4 check boxes.
 *    - uppercase letters
 *    - lowercase letters
 *    - numbers
 *    - special char
 * 3. We have a text area which displays a randomized string value which will contain the chars based on the user input and they will be randomized.
 * 4. Have a clipboard icon-button which when clicked will copy the generated password.
 */

import { memo, useCallback, useState } from "react";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

const PasswordGenerator: React.FC = memo(() => {
  const [passwordLength, setPasswordLength] = useState(10);
  const [isLowercase, setIsLowercase] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);

  const generatePassword = useCallback(() => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isLowercase) charSet += lowercase;
    if (isNumbers) charSet += numbers;
    if (isSpecial) charSet += special;

    const generatedPassword = new Array(passwordLength)
      .fill("")
      .map(() => {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        return charSet[randomIndex];
      })
      .join("");

    return generatedPassword;
  }, [passwordLength, isLowercase, isNumbers, isSpecial]);

  const password = generatePassword();

  return (
    <div className='flex justify-center items-center flex-col gap-5'>
      <h1 className='heading-2'>Password Generator</h1>

      <form className='flex flex-col justify-center items-center'>
        <div className='flex flex-row gap-4'>
          <label htmlFor='password-length'>Password Length: </label>
          <input
            type='range'
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            min={MIN_PASSWORD_LENGTH}
            max={MAX_PASSWORD_LENGTH}
          />
          <input
            type='number'
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            className='w-16 bg-inherit text-white border rounded border-slate-600'
            min={MIN_PASSWORD_LENGTH}
            max={MAX_PASSWORD_LENGTH}
          />
        </div>

        <div className='checkboxes grid grid-cols-2 gap-4 mt-4'>
          <label htmlFor='uppercase-checkbox' className='cursor-pointer'>
            <input checked={true} id='uppercase-checkbox' type='checkbox' disabled /> Uppercase
            Characters
          </label>

          <label htmlFor='lowercase-checkbox' className='cursor-pointer '>
            <input
              checked={isLowercase}
              onChange={(e) => setIsLowercase(e.target.checked)}
              id='lowercase-checkbox'
              type='checkbox'
            />{" "}
            Lowercase Characters
          </label>

          <label htmlFor='numbers-checkbox' className='cursor-pointer'>
            <input
              checked={isNumbers}
              onChange={(e) => setIsNumbers(e.target.checked)}
              id='numbers-checkbox'
              type='checkbox'
            />{" "}
            Numbers
          </label>

          <label htmlFor='special-checkbox' className='cursor-pointer'>
            <input
              checked={isSpecial}
              onChange={(e) => setIsSpecial(e.target.checked)}
              id='special-checkbox'
              type='checkbox'
            />{" "}
            Special Characters
          </label>
        </div>
      </form>

      <div className='flex gap-5'>
        <input
          type='text'
          className='bg-inherit border border-slate-600 rounded font-xl w-[230px] p-2 text-center'
          value={password}
          readOnly
        />
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className='border rounded border-slate-600 p-2 flex justify-center items-center gap-2 active:border-transparent'
        >
          Copy
          <i className='fa-solid fa-clipboard' />
        </button>
      </div>
    </div>
  );
});

export default PasswordGenerator;

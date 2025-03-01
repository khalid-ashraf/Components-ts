import { Link } from "react-router";

import { ReactNode } from "react";

type ButtonLinkProps = {
  link: string;
  children: ReactNode;
};

const ButtonLink = ({ link, children }: ButtonLinkProps) => {
  return (
    <Link to={link}>
      <button className='btn-link'>{children}</button>
    </Link>
  );
};
export default ButtonLink;

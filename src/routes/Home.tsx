import { Link } from "react-router";

import ButtonLink from "../components/ButtonLink";

const Home: React.FC = () => {
  return (
    <div className='text-center p-8 flex flex-col items-center justify-center'>
      <h1 className='font-bold text-3xl pb-4'>Welcome to the Components GitHub Repo</h1>
      <p>
        This repository contains a collection of reusable React components built with TypeScript.
      </p>
      <p>These components are the basic react components asked commonly in interviews.</p>
      <p>Feel free to explore the components and use them to study or use in your projects.</p>
      <p>Check out the documentation for detailed usage instructions and examples.</p>

      <div className='flex gap-2 flex-wrap max-w-[700px] mt-5'>
        <ButtonLink link='/accordion'>Accordion</ButtonLink>

        <ButtonLink link='/image-slider'>Image Slider</ButtonLink>

        <ButtonLink link='/load-more'>Load More</ButtonLink>

        <ButtonLink link='/random-color-generator'>Random Color Generator</ButtonLink>

        <ButtonLink link='/star-rating'>Star Rating</ButtonLink>
      </div>
    </div>
  );
};

export default Home;

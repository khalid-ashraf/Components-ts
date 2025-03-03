import { JSX, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import {
  Accordion,
  Home,
  ImageSlider,
  LayoutRoute,
  LoadMore,
  RandomColorGenerator,
} from "./routes";
import StarRating from "./routes/StarRating";

const Loading = (): JSX.Element => {
  return <h1 className='text-center font-bold text-2xl'>Loading...</h1>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <LayoutRoute />
      </Suspense>
    ),
    children: [
      {
        path: "/accordion",
        element: <Accordion />,
      },
      {
        path: "/image-slider",
        element: <ImageSlider />,
      },
      {
        path: "/load-more",
        element: <LoadMore />,
      },
      {
        path: "/random-color-generator",
        element: <RandomColorGenerator />,
      },
      {
        path: "/star-rating",
        element: <StarRating />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

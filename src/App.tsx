import { JSX, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import {
  Accordion,
  Home,
  ImageSlider,
  InfiniteScroll,
  LayoutRoute,
  LoadMore,
  Modal,
  PasswordGenerator,
  RandomColorGenerator,
  RecursiveComponent,
  ScrollIndicator,
  Tabs,
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
    element: <LayoutRoute />,
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
        path: "/infinite-scroll",
        element: <InfiniteScroll />,
      },
      {
        path: "/load-more",
        element: <LoadMore />,
      },
      {
        path: "/modal",
        element: <Modal />,
      },
      {
        path: "/password-generator",
        element: <PasswordGenerator />,
      },
      {
        path: "/random-color-generator",
        element: <RandomColorGenerator />,
      },
      {
        path: "/recursive-component",
        element: <RecursiveComponent />,
      },
      {
        path: "/star-rating",
        element: <StarRating />,
      },
      {
        path: "/scroll-indicator",
        element: <ScrollIndicator />,
      },
      {
        path: "/tabs",
        element: <Tabs />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

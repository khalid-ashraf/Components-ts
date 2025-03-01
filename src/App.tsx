import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { createBrowserRouter, BrowserRouter, RouterProvider } from "react-router";

import { Accordion, Home, ImageSlider, LayoutRoute, RandomColorGenerator } from "./routes";
import StarRating from "./routes/StarRating";

const Loading = () => {
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
        path: "/random-color-generator",
        element: <RandomColorGenerator />,
      },
      {
        path: "/star-rating",
        element: <StarRating />,
      },
      {
        path: "/image-slider",
        element: <ImageSlider />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

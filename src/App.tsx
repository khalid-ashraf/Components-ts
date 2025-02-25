import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router";

import { Accordion, Home, LayoutRoute, RandomColorGenerator } from "./routes";
import StarRating from "./routes/StarRating";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route
        element={
          <Suspense fallback={<Loading />}>
            <LayoutRoute />
          </Suspense>
        }
      >
        <Route path='/accordion' element={<Accordion />} />
        <Route path='/random-color-generator' element={<RandomColorGenerator />} />
        <Route path='/star-rating' element={<StarRating />} />
      </Route>
    </Routes>
  );
};

export default App;

const Loading = () => {
  return <h1 className='text-center font-bold text-2xl'>Loading...</h1>;
};

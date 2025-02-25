import { Suspense } from "react";
import { Route, Routes } from "react-router";

import { Accordion, Home, LayoutRoute, RandomColorGenerator } from "./routes";

const App = () => {
  return (
    <Suspense fallback={<h1 className='font-bold text-2xl'>Loading...</h1>}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<LayoutRoute />}>
          <Route path='/accordion' element={<Accordion />} />
          <Route path='/random-color-generator' element={<RandomColorGenerator />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

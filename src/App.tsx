import { Route, Routes } from "react-router";

import { Accordion, Home, LayoutRoute, RandomColorGenerator } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<LayoutRoute />}>
        <Route path='/accordion' element={<Accordion />} />
        <Route path='/random-color-generator' element={<RandomColorGenerator />} />
      </Route>
    </Routes>
  );
};

export default App;


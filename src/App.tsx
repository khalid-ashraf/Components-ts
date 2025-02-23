import { Route, Routes } from "react-router";

import { Accordion, Home, LayoutRoute } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route element={<LayoutRoute />}>
        <Route path='/accordion' element={<Accordion />} />
      </Route>
    </Routes>
  );
};

export default App;


import { lazy } from "react";

import Home from "./Home";

const Accordion = lazy(() => import("./Accordion"));
const LayoutRoute = lazy(() => import("./LayoutRoute"));
const RandomColorGenerator = lazy(() => import("./RandomColorGenerator"));

export { Accordion, Home, LayoutRoute, RandomColorGenerator };

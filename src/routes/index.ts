import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Accordion = lazy(() => import("./Accordion"));
const LayoutRoute = lazy(() => import("./LayoutRoute"));
const RandomColorGenerator = lazy(() => import("./RandomColorGenerator"));
const StarRating = lazy(() => import("./StarRating"));

export { Accordion, Home, LayoutRoute, RandomColorGenerator, StarRating };

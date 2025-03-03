import { lazy } from "react";

const Accordion = lazy(() => import("./Accordion"));
const Home = lazy(() => import("./Home"));
const ImageSlider = lazy(() => import("./ImageSlider"));
const LayoutRoute = lazy(() => import("./LayoutRoute"));
const LoadMore = lazy(() => import("./LoadMore"));
const RandomColorGenerator = lazy(() => import("./RandomColorGenerator"));
const StarRating = lazy(() => import("./StarRating"));

export { Accordion, Home, ImageSlider, LayoutRoute, LoadMore, RandomColorGenerator, StarRating };

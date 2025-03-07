import withLazyLoading from "../components/WithLazyLoading";

import LayoutRoute from "./LayoutRoute";

const Accordion = withLazyLoading(() => import("./Accordion"));
const Home = withLazyLoading(() => import("./Home"));
const ImageSlider = withLazyLoading(() => import("./ImageSlider"));
const InfiniteScroll = withLazyLoading(() => import("./InfiniteScroll"));
const LoadMore = withLazyLoading(() => import("./LoadMore"));
const Modal = withLazyLoading(() => import("./Modal"));
const PasswordGenerator = withLazyLoading(() => import("./PasswordGenerator.tsx"));
const RandomColorGenerator = withLazyLoading(() => import("./RandomColorGenerator"));
const RecursiveComponent = withLazyLoading(() => import("./RecursiveComponent"));
const StarRating = withLazyLoading(() => import("./StarRating"));
const ScrollIndicator = withLazyLoading(() => import("./ScrollIndicator"));
const Tabs = withLazyLoading(() => import("./Tabs.tsx"));

export {
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
  StarRating,
  ScrollIndicator,
  Tabs,
};

import {
  Advisor,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Blend,
  Bluetooth,
  Bookmark,
  BookmarkAdded,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Checkmark,
  Close,
  Comment,
  Delete,
  Delivery,
  DisplaySettings,
  Favorite,
  FavoriteFilled,
  FermentMode,
  Home,
  Info,
  SlowCooking,
  SousVide,
  TemperatureHigh,
  Time,
  Timer,
  Tutorial,
  Wifi,
} from "@vorwerk/fibre-react";

const componentMapping = new Map([
  ['advisor', <Advisor key="advisor" />],
  ['arrow-down', <ArrowDown key="arrow-down" />],
  ['arrow-left', <ArrowLeft key="arrow-left" />],
  ['arrow-right', <ArrowRight key="arrow-right" />],
  ['arrow-up', <ArrowUp key="arrow-up" />],
  ['blend', <Blend key="blend" />],
  ['bluetooth', <Bluetooth key="bluetooth" />],
  ['bookmark', <Bookmark key="bookmark" />],
  ['bookmark-added', <BookmarkAdded key="bookmark-added" />],
  ['caret-down', <CaretDown key="caret-down" />],
  ['caret-left', <CaretLeft key="caret-left" />],
  ['caret-right', <CaretRight key="caret-right" />],
  ['caret-up', <CaretUp key="caret-up" />],
  ['checkmark', <Checkmark key="checkmark" />],
  ['close', <Close key="close" />],
  ['comment', <Comment key="comment" />],
  ['delete', <Delete key="delete" />],
  ['delivery', <Delivery key="delivery" />],
  ['display-settings', <DisplaySettings key="display-settings" />],
  ['favorite', <Favorite key="favorite" />],
  ['favorite-filled', <FavoriteFilled key="favorite-filled" />],
  ['ferment-mode', <FermentMode key="ferment-mode" />],
  ['home', <Home key="home" />],
  ['info', <Info key="info" />],
  ['none', <> </>],
  ['slow-cooking', <SlowCooking key="slow-cooking" />],
  ['sous-vide', <SousVide key="sous-vide" />],
  ['temperature-high', <TemperatureHigh key="temperature-high" />],
  ['time', <Time key="time" />],
  ['timer', <Timer key="timer" />],
  ['tutorial', <Tutorial key="tutorial" />],
  ['wifi', <Wifi key="wifi" />],
]);

export default function IconRenderer(props: {
  data: {
    name: string;
  };
}) {
  const IconComponent = componentMapping.get(props.data.name);

  return IconComponent || <p>Icon not found</p>;
}
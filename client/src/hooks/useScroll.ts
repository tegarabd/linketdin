export const useScroll = () => {
  const makeWindowScrollable = () => {
    document.documentElement.style.setProperty("overflow-y", "auto");
  };

  const makeWindowUnscrollable = () => {
    document.documentElement.style.setProperty("overflow-y", "hidden");
  };

  return { makeWindowScrollable, makeWindowUnscrollable };
};

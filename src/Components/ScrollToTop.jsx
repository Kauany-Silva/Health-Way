import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop=() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // sempre volta pro topo quando a rota mudar
  }, [pathname]);

  return null;
}

export {ScrollToTop};
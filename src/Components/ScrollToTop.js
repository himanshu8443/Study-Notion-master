import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



const ScrollToTop = () => {
    const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ pathname]);

  return null; // Render nothing, as this is a utility component
};

export default ScrollToTop;
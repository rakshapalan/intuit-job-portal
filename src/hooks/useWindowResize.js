import { useState, useEffect } from "react";

const useWindowResize = (filterRef) => {
  const [filterWidth, setFilterWidth] = useState(0);

  useEffect(() => {
    if (filterRef.current) {
      setFilterWidth(filterRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (filterRef.current) {
        setFilterWidth(filterRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { filterWidth };
};

export default useWindowResize;

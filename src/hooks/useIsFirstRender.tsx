import { useEffect, useState } from "react";

export const useIsFirstRender = () => {
  const [renderTimes, setRenderTimes] = useState(0)

  useEffect(() => {
    if (renderTimes <= 2) {
      setRenderTimes(prevRenderTimes => prevRenderTimes++)
      return
    }
    
  }, [renderTimes]);

  return renderTimes <= 2;
};

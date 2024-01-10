import React, {
    useState,
    useMemo,
    useEffect,
    useRef,
    useCallback } from
    "https://esm.sh/react@18";
    import ReactDOM from "https://esm.sh/react-dom@18";
    import { useControls } from "https://esm.sh/leva@0.9.35";
    import { createNoise3D } from "https://esm.sh/simplex-noise@4.0.1";
    
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    const getCol = () => {
      const min = 0;
      const max = 360;
      const excludeMin = 50;
      const excludeMax = 180;
      // Cut greens
      const range = Math.random() * (max - (excludeMax - excludeMin));
      if (range > excludeMin) return excludeMax + range;
      return range;
    };
    
    const rand = (min, max) => min + Math.random(max - min);
    
    const opt = {
      size: 2,
      cols: 300,
      rows: 300,
      speed: 2,
      rot: 2 };
    
    
    
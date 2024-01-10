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
    
    
    
      const Canvas = () => {
        const $canvas = useRef();
        const $ctx = useRef();
        const $bg = useRef();
        const mouse = useRef({ x: window.innerWidth * .5, y: window.innerHeight * .5, prevX: 0, prevY: 0, speed: 0 });
        const win = useRef({ w: 0, h: 0 });
      
        const grid = useRef([]);
        const line = useRef([]);
        const rafID = useRef();
        const noise = createNoise3D();
      }      


      const lines = () => {
        const $c = $ctx.current;
        $c.globalCompositeOperation = 'screen';
        $c.lineWidth = 1;
        line.current.forEach((l, i) => {
          l.forEach(({ x, y }) => {
            const x1 = x - (win.current.w - opt.size * opt.cols) * .5;
            const y1 = y - (win.current.h - opt.size * opt.rows) * .5;
    
            if (x1 > 0 && x1 < opt.size * opt.cols && y1 > 0 && y1 < opt.size * opt.rows) {
    
              $c.save();
              $c.beginPath();
              $c.translate(x, y);
              const id = getCell(x1, y1);
              $c.moveTo(0, 0);
    
    
              const { rot } = grid.current[id + (i % 3 * Math.random() > .5 ? 1 : -1)];
              const newX = Math.sin(rot + Math.PI * .5) * opt.speed;
              const newY = Math.cos(rot - Math.PI * .5) * opt.speed;
              $c.lineTo(newX, newY);
              $c.stroke();
              $c.restore();
    
              if (!l.drawed) {
                line.current.push([{
                  x: x + newX, y: y + newY }]);
    
                l.drawed = true;
              }
            }
          });
        });
      };
    

      const draw = () => {
        const $c = $ctx.current;
        if (!$c) return;
        $c.clearRect(0, 0, win.current.w, win.current.h);
    
        // debug()
        lines();
    
        rafID.current = requestAnimationFrame(draw);
      };
    
     
      const getCell = (x, y) => {
        const id = Math.floor(y / opt.size) * opt.rows + Math.floor(x / opt.size);
        return id;
      }; 
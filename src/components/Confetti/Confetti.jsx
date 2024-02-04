import React, { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

export default function Confetti() {
 const refAnimationInstance = useRef(null);
 const getInstance = useCallback(instance => {
   refAnimationInstance.current = instance;
 }, []);

 const makeShot = useCallback((particleRatio, opts) => {
   refAnimationInstance.current &&
     refAnimationInstance.current({
       ...opts,
       origin: { y: 0.7 },
       particleCount: Math.floor(200 * particleRatio)
     });
 }, []);

 useEffect(() => fire(), []);

 const fire = useCallback(() => {
   makeShot(0.25, {
     spread: 26,
     startVelocity: 55
   });
   makeShot(0.2, {
     spread: 60
   });
   makeShot(0.35, {
     spread: 100,
     decay: 0.91,
     scalar: 0.8
   });
   makeShot(0.1, {
     spread: 120,
     startVelocity: 25,
     decay: 0.92,
     scalar: 1.2
   });
   makeShot(0.1, {
     spread: 120,
     startVelocity: 45
   });
 }, [makeShot]);

 return (
   <ReactCanvasConfetti
     refConfetti={getInstance}
     style={{
       position: 'absolute',
       pointerEvents: 'none',
       width: '100%',
       height: '100vh',
        top: '0px !important',
       zIndex: "100"
      /* left: '30vw !important'*/
     }}
   />
 );
}

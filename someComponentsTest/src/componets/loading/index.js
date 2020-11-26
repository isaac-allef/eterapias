// import ellipsisAnimationGreen from './img/ellipsis-animation-green.svg';
// import ellipsisAnimationBw from './img/ellipsis-animation-bw.svg';
// import ellipsisAnimation from './img/ellipsis-animation.svg';
// import reloadAnimation from './img/reload-animation.svg';
// import reloadStatic from './img/reload-static.svg';

import dualBallAnimation from './img/dual-ball-animation.svg';

import './style.css';

export default function Loading() {
  return (
    <div className="loading-container">
        <img src={dualBallAnimation} className="loading-image" alt="loading" />

        {/* <img src={ellipsisAnimationGreen} className="loading-image" alt="loading" />
        <img src={ellipsisAnimationBw} className="loading-image" alt="loading" />
        <img src={ellipsisAnimation} className="loading-image" alt="loading" />
        <img src={reloadAnimation} className="loading-image" alt="loading" />
        <img src={reloadStatic} className="loading-image" className="loading-image-static" alt="loading" /> */}
    </div>
  );
}

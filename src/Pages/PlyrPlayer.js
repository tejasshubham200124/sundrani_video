import React, { useRef, useState, useEffect } from 'react';
import Plyr from 'plyr';

function PlyrPlayer(props) {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, props.options);
      setPlayer(player);
    }
  }, [videoRef, props.options]);

  useEffect(() => {
    if (player) {
      player.source = {
        type: 'video',
        sources: [
          {
            src: props.src,
            type: 'video/mp4'
          }
        ]
      };
    }
  }, [player, props.src]);

  return (
    <video ref={videoRef}>
      <source src={props.src} type="video/mp4" />
      
    </video>
  );
}

export default PlyrPlayer;

import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = ({ video, handleVideoEnd }) => {
  const videoRef = useRef(null);

  return (
    <div>
      <video
        poster={'https://storage.googleapis.com/gtv-videos-bucket/sample/' + video?.thumb}
        ref={videoRef}
        autoPlay
        controls
        width={'90%'}
        onEnded={() => { handleVideoEnd() }}
        src={video?.sources?.[0]}
      />
      <h3 className='font-bold text-3xl'>{video?.title}</h3>
      <p className='text-xl'>{video?.subtitle}</p>
    </div>
  );
};

export default VideoPlayer

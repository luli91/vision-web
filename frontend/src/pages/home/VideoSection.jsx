import React from 'react';
import videoFile from '../../assets/VideoSeaPicks.mp4';

const VideoSection = () => {
    return (
        <div className='py-16 px-4 bg-gray-100'>
            <h2 className='text-3xl font-semibold mb-6 text-center'>Descubre SeaPicks</h2>
            <div className='flex justify-center'>
            <video
                autoPlay
                muted
                loop
                className='w-full h-full object-cover'
                src={videoFile} 
            >
                    <source src="../../assets/VideoSeaPicks.mp4" type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
            </div>
        </div>
    );
};

export default VideoSection;

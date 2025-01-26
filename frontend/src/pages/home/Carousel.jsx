import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

import video1 from "../../assets/banner/banner_sea_picks.mp4";
import video2 from "../../assets/banner/banner_sea_picks_1.mp4";
import video3 from "../../assets/banner/banner_sea _picks_2.mp4";
import video4 from "../../assets/banner/banner_sea_picks_3.mp4";

const ImageCarousel = () => {
    const videoRefs = useRef([]);

    useEffect(() => {
        videoRefs.current.forEach(video => {
            video.play();
        });
    }, []);

    const addVideoRef = (video, index) => {
        if (video) {
            videoRefs.current[index] = video;
        }
    };

    return (
        <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
        >
            <SwiperSlide>
                <video ref={(video) => addVideoRef(video, 0)} autoPlay muted loop playsInline>
                    <source src={video1} type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
            </SwiperSlide>
            <SwiperSlide>
                <video ref={(video) => addVideoRef(video, 1)} autoPlay muted loop playsInline>
                    <source src={video2} type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
            </SwiperSlide>
            <SwiperSlide>
                <video ref={(video) => addVideoRef(video, 2)} autoPlay muted loop playsInline>
                    <source src={video3} type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
            </SwiperSlide>
            <SwiperSlide>
                <video ref={(video) => addVideoRef(video, 3)} autoPlay muted loop playsInline>
                    <source src={video4} type="video/mp4" />
                    Tu navegador no soporta el video.
                </video>
            </SwiperSlide>
        </Swiper>
    );
};

export default ImageCarousel;

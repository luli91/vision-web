// src/components/MovingBanner.jsx
import React from 'react';

const MovingBanner = () => {
    const text = "¡Envíos gratis a partir de $50.000!";
    const repeatedText = new Array(20).fill(text);

    return (
        <div className="w-full overflow-hidden bg-[#FFD700] h-8 flex items-center">
            <div className="animate-marquee flex whitespace-nowrap">
                {repeatedText.map((item, index) => (
                    <span key={index} className="mx-4 text-xs font-semibold text-black">{item}</span>
                ))}
            </div>
        </div>
    );
};

export default MovingBanner;




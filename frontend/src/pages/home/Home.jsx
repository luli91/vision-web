import React from 'react'
import Banner from '../home/Banner'
import TopSellers from '../home/TopSellers'
import NewSeason from '../home/NewSeason'
import LensInfo from '../home/LensInfo'
import ImageCarousel from '../home/Carousel'


const Home = () => {
    return (
        <>
            <ImageCarousel/>
            <Banner/>
            <TopSellers/>
            <NewSeason/>
            <LensInfo/>
        </>
    )
}

export default Home

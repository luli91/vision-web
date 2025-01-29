import React from 'react'
import Banner from '../home/Banner'
import TopSellers from '../home/TopSellers'
import NewSeason from '../home/NewSeason'
import ImageCarousel from '../home/Carousel'
import VideoSection from './VideoSection'
import CategoriesGrid from './CategoriesGrid'


const Home = () => {
    return (
        <>
            <ImageCarousel/>
            <Banner/>
            <TopSellers/>
            <NewSeason/>
            <VideoSection/>
            <CategoriesGrid/>
        </>
    )
}

export default Home

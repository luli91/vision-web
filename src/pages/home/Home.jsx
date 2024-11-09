import React from 'react'
import Banner from '../home/Banner'
import TopSellers from '../home/TopSellers'
import NewSeason from '../home/NewSeason'
import LensInfo from '../home/LensInfo'
import Footer from '../../components/Footer'


const Home = () => {
    return (
        <>
            <Banner/>
            <TopSellers/>
            <NewSeason/>
            <LensInfo/>
            <Footer/>
        </>
    )
}

export default Home

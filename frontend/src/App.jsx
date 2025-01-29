import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import MovingBanner from './components/MovingBanner'; 

import './App.css';

function App() {
    return (
        <>
            <AuthProvider>
                <MovingBanner /> 
                <NavBar />
                <main className='min-h-screen max-w-screen mx-auto font-primary'>
                    <Outlet />
                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
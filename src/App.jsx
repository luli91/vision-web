import { Outlet } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <NavBar/>
    <main className='min-h-screen max-w-screen-2x1 mx-auto font-primary'>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default App

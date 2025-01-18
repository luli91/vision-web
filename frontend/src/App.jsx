import { Outlet } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <>
    <AuthProvider>
    <NavBar/>
    <main className='min-h-screen max-w-screen-2x1 mx-auto font-primary'>
      <Outlet/>
    </main>
    <Footer/>
    </AuthProvider>
    </>
  )
}

export default App

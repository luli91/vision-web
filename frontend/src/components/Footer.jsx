import React from 'react'
import footerLogo  from "../assets/optica-logo2.png"

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#E07B39] text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-64" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Servicios</a></li>
            <li><a href="#about" className="hover:text-primary">Acerca de nosotros</a></li>
            <li><a href="#contact" className="hover:text-primary">Contacto</a></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
           ¡Suscríbete a nuestro boletín para recibir las últimas actualizaciones, noticias y ofertas!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Ingresá tu e-mail"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
            Suscríbete
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Política de privacidad</a></li>
          <li><a href="#terms" className="hover:text-primary">Términos de servicio</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
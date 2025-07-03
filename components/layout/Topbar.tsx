import { FaEnvelope, FaPhoneAlt, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Topbar() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white text-xs md:text-sm flex justify-between items-center px-4 md:px-8 py-2.5 w-full">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span className="font-medium">Welcome to Crestly Construction</span>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-1 hover:text-yellow-200 transition-colors duration-200">
          <FaEnvelope className="text-yellow-400" />
          <span className="hidden sm:inline">enquiries@crestly.com</span>
        </div>
        <div className="flex items-center gap-1 hover:text-yellow-200 transition-colors duration-200">
          <FaPhoneAlt className="text-yellow-400" />
          <span className="hidden sm:inline">+263 77X XXX XXX</span>
        </div>
        <div className="flex gap-2 ml-2">
          <a href="#" aria-label="X (formerly Twitter)" className="hover:text-yellow-200 transition-colors duration-200 p-1">
            <FaXTwitter />
          </a>
          
          <a href="#" aria-label="Facebook" className="hover:text-yellow-200 transition-colors duration-200 p-1">
            <FaFacebookF />
          </a>
          
          <a href="#" aria-label="Instagram" className="hover:text-yellow-200 transition-colors duration-200 p-1">
            <FaInstagram />
          </a>
          
          <a href="#" aria-label="LinkedIn" className="hover:text-yellow-200 transition-colors duration-200 p-1">
            <FaLinkedinIn />
          </a>
          
          <a href="#" aria-label="YouTube" className="hover:text-yellow-200 transition-colors duration-200 p-1">
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
}

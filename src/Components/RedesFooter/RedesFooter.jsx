import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const RedesFooter = () => (
  <div className="flex justify-center gap-4 text-white mb-6">
    <a href="#" className="hover:text-green-400"><FaFacebookF size={20} /></a>
    <a href="#" className="hover:text-green-400"><FaTwitter size={20} /></a>
    <a href="#" className="hover:text-green-400"><FaInstagram size={20} /></a>
    <a href="#" className="hover:text-green-400"><FaLinkedin size={20} /></a>
  </div>
);
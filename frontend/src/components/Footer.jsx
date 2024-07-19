import React from "react";
import { Link } from "react-router-dom";
import { MdOutlinePolicy, MdContactMail } from "react-icons/md";
import { GoLog } from "react-icons/go";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer mt-4 bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="footer-column flex-grow mb-6">
          <div className="font-semibold text-lg footer-title mb-4">Info</div>
          <ul className="footer-menu-list">
            <li className="flex items-center py-3 text-sm">
              <span className="mr-2">
                <MdOutlinePolicy />
              </span>
              <Link>
                Privacy Policy
              </Link>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span className="mr-2">
                <GoLog />
              </span>
              <Link>Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="footer-column flex-grow mb-6">
          <div className="font-semibold text-lg footer-title mb-4">Contact Us</div>
          <ul className="footer-menu-list">
            <li className="flex items-center py-3 text-sm">
              <span className="mr-2">
                <MdContactMail />
              </span>
              <a href="mailto:athulrajk01@gmail.com">athulrajk01@gmail.com</a>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span className="mr-2">
                <MdContactMail />
              </span>
              <a href="tel:+123456789">+971 545404573</a>
            </li>
          </ul>
        </div>

        <div className="footer-column flex-grow mb-6">
          <div className="font-semibold text-lg footer-title mb-4">Follow Us</div>
          <ul className="footer-menu-list flex space-x-4">
            <li className="py-3 text-sm">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
            </li>
            <li className="py-3 text-sm">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
            </li>
            <li className="py-3 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4 text-sm">
        © {new Date().getFullYear()}. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

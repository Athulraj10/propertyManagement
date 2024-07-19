import React, { useEffect } from "react";
import { Home } from "../components/Home";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(()=>{
    const userData = localStorage.getItem('userData')
    if(!userData){
      navigate('/login')
    }
  })

  return (
      <div className="w-full bg-white">
        <Home />
        <Footer scrollToTop={scrollToTop} />
      </div>
  );
};

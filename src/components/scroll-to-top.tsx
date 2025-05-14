"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooter, setIsFooter] = useState(false);
  const phoneNumber = "02633679979";

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    
    // Check if we're at the footer
    const footer = document.querySelector('footer');
    if (footer) {
      const footerPosition = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the footer is visible in the viewport
      if (footerPosition.top < windowHeight - 120) {
        setIsFooter(true);
      } else {
        setIsFooter(false);
      }
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    // Initial check
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Dynamic positioning based on whether we're at the footer
  const positionClass = isFooter 
    ? "fixed bottom-20 sm:bottom-24 right-4 sm:right-8" 
    : "fixed bottom-8 right-4 sm:right-8";

  return (
    <div className={`${positionClass} z-50 flex flex-col gap-3`}>
      {/* Phone Button - Always visible */}
      <Button
        onClick={() => window.location.href = `tel:${phoneNumber.replace(/[-\s]/g, '')}`}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 relative group"
        aria-label="Gọi điện"
      >
        <Phone size={18} className="sm:size-20" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {phoneNumber}
        </span>
      </Button>

      {/* Email Button - Always visible */}
      <Button
        onClick={scrollToContact}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Liên hệ email"
      >
        <Mail size={18} className="sm:size-20" />
      </Button>

      {/* Scroll to Top Button - Only visible when scrolled */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="bg-[#396CB1] hover:bg-[#273572] text-white rounded-full shadow-lg w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Lên đầu trang"
        >
          <ArrowUp size={18} className="sm:size-20" />
        </Button>
      )}
    </div>
  );
} 
"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = "01-234-5678";

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
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

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      {/* Phone Button - Always visible */}
      <Button
        onClick={() => window.location.href = `tel:${phoneNumber.replace(/[-\s]/g, '')}`}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 relative group"
        aria-label="Gọi điện"
      >
        <Phone size={20} />
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {phoneNumber}
        </span>
      </Button>

      {/* Email Button - Always visible */}
      <Button
        onClick={scrollToContact}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Liên hệ email"
      >
        <Mail size={20} />
      </Button>

      {/* Scroll to Top Button - Only visible when scrolled */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="bg-[#396CB1] hover:bg-[#273572] text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Lên đầu trang"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
} 
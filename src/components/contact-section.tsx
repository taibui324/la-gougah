"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-primary text-center mb-12">
          <span className="relative inline-block">
            Liên hệ
            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-blue-500"></span>
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-medium text-primary mb-4">
              Gửi tin nhắn cho chúng tôi
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Hãy để lại thông tin của bạn, chúng tôi sẽ liên hệ trong thời gian
              sớm nhất.
            </p>
            <form className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Nội dung"
                  className="w-full h-32"
                />
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full hover:opacity-90 transition-opacity"
              >
                Gửi tin nhắn
              </Button>
            </form>
          </div>
          <div className="space-y-8">
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-md h-64 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580567147!2d106.69916121471856!3d10.771594992323586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc7%3A0x4db964d76bf6e18e!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1620120000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="La Gougah Factory Location"
              ></iframe>
            </div>
            
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-medium text-primary mb-6">Thông tin liên hệ</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hotline</p>
                    <p className="text-lg font-medium">+84 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium">contact@lagougah.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="text-lg font-medium">Khu Công Nghiệp XYZ, Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

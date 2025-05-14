"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Vui lòng điền đầy đủ thông tin: Họ tên, Email và Nội dung.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      /*
       * IMPORTANT: Set up EmailJS before using this form
       * 1. Sign up at https://www.emailjs.com/
       * 2. Create a service (Gmail, Outlook, etc.)
       * 3. Create an email template with these variables:
       *    - {{from_name}} - Sender's name
       *    - {{from_email}} - Sender's email
       *    - {{from_phone}} - Sender's phone (optional)
       *    - {{message}} - Message content
       *    - {{to_email}} - Recipient email
       * 4. Get your Service ID, Template ID, and Public Key
       * 5. Replace the values below with your IDs and Key
       */
      
      // EmailJS configuration
      const serviceId = 'service_eoevifd'; // Replace with your EmailJS service ID
      const templateId = 'template_dl7dkd8'; // Replace with your EmailJS template ID
      const publicKey = '5isW7RaQ9Tb9ckKXC'; // Replace with your EmailJS public key
      
      const templateParams = {
        to_email: 'marketing@lagougah.com',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {/* Success message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </div>
            )}
            
            {/* Error message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại của chúng tôi.
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  className="w-full"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  className="w-full"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Nội dung"
                  className="w-full h-32"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="default"
                className="w-full hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>
            </form>
          </div>
          <div className="space-y-8">
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-md h-64 w-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4400.542263058984!2d108.35317071106913!3d11.689377141642508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317147d317e26cfb%3A0x93a5056507c20274!2zQ8O0bmcgVHkgQ-G7lSBQaOG6p24gWHXhuqV0IE5o4bqtcCBLaOG6qXUgUXXDoCBU4bq3bmcgR2lhbmcgQW5oIEvhu7M!5e1!3m2!1svi!2s!4v1747233852455!5m2!1svi!2s"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="La Gougah - Thôn Phú Hòa, Xã Phú Hội, Huyện Đức Trọng, Tỉnh Lâm Đồng, Việt Nam"
              ></iframe>
              
              {/* Custom pin overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="w-2 h-2 bg-blue-600 rotate-45 -mt-1"></div>
                </div>
              </div>
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
                    <p className="text-lg font-medium">02633679979</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium">marketing@lagougah.com </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ</p>
                    <p className="text-lg font-medium">Thôn Phú Hòa, Xã Phú Hội, Huyện Đức Trọng, Tỉnh Lâm Đồng, Việt Nam</p>
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

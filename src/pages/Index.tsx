import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { AIChatbot } from "@/components/AIChatbot";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBookAppointment = () => {
    document.getElementById('appointment')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        onBookAppointment={handleBookAppointment}
        onOpenChat={handleOpenChat}
      />

      {/* Services Section */}
      <ServicesSection />

      {/* Appointment Booking */}
      <AppointmentBooking />

      {/* Contact & Footer */}
      <footer className="bg-gradient-to-br from-foreground to-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div className="animate-slide-up">
              <h3 className="text-2xl font-bold mb-6 text-primary-foreground">Elite Eye Care</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-secondary" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm opacity-90">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-secondary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm opacity-90">info@eliteeyecare.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-secondary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm opacity-90">123 Vision Street, Medical District</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-secondary" />
                Office Hours
              </h4>
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Emergency Only</span>
                </div>
                <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                  <p className="text-xs font-medium">24/7 Emergency Care Available</p>
                </div>
              </div>
            </div>

            {/* Services Quick Links */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Comprehensive Eye Exams</li>
                <li>• LASIK Surgery</li>
                <li>• Cataract Treatment</li>
                <li>• Retinal Specialist</li>
                <li>• Pediatric Eye Care</li>
                <li>• Emergency Eye Care</li>
              </ul>
            </div>

            {/* About */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                Elite Eye Care combines cutting-edge technology with compassionate care to provide 
                comprehensive vision solutions for patients of all ages.
              </p>
              <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                <p className="text-xs opacity-75">
                  © 2024 Elite Eye Care. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot 
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Floating Elements for Visual Interest */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="floating-element absolute top-1/4 left-5 w-3 h-3 bg-primary/10 rounded-full blur-sm"></div>
        <div className="floating-delayed absolute top-3/4 right-10 w-2 h-2 bg-secondary/15 rounded-full blur-sm"></div>
        <div className="floating-element absolute bottom-1/3 left-1/3 w-4 h-4 bg-accent/10 rounded-full blur-md"></div>
      </div>
    </div>
  );
};

export default Index;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles, Heart } from "lucide-react";

interface HeroSectionProps {
  onBookAppointment: () => void;
  onOpenChat: () => void;
}

export const HeroSection = ({ onBookAppointment, onOpenChat }: HeroSectionProps) => {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="floating-delayed absolute top-40 right-20 w-16 h-16 bg-secondary/20 rounded-full blur-lg"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-12 h-12 bg-primary-glow/15 rounded-full blur-md"></div>
        <div className="floating-delayed absolute top-60 left-3/4 w-8 h-8 bg-accent/30 rounded-full blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-slide-up">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center animate-pulse-medical">
                <Eye className="w-12 h-12 text-primary-foreground" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-secondary animate-float" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Elite Eye Care
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Advanced vision solutions with cutting-edge technology and compassionate care
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            From routine eye exams to complex surgeries, our expert team is dedicated to preserving and enhancing your vision
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={onBookAppointment}
              className="btn-medical group"
              size="lg"
            >
              Book Appointment
              <Heart className="ml-2 w-5 h-5 group-hover:animate-pulse" />
            </Button>
            
            <Button 
              onClick={onOpenChat}
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl"
              size="lg"
            >
              Chat with AI Assistant
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Animated Eye Graphic */}
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="w-32 h-32 relative animate-float">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow animate-pulse-medical"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
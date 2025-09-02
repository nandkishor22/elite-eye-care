import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Mail, Phone, FileText } from "lucide-react";
import { toast } from "sonner";

export const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Comprehensive Eye Exam",
    "LASIK Consultation",
    "Cataract Evaluation",
    "Retinal Specialist",
    "Pediatric Eye Care",
    "Emergency Eye Care",
    "Contact Lens Fitting",
    "Glaucoma Treatment"
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data for FormSubmit
      const form = new FormData();
      form.append('_subject', `New Appointment Booking - ${formData.name}`);
      form.append('_template', 'table');
      form.append('_captcha', 'false');
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('service', formData.service);
      form.append('date', formData.date);
      form.append('time', formData.time);
      form.append('message', formData.message);

      const response = await fetch('https://formsubmit.co/malinandkishor445@gmail.com', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        toast.success("Appointment request sent successfully! We'll confirm your appointment soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          message: ""
        });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error("Failed to send appointment request. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 bg-gradient-to-br from-accent/10 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Book Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Appointment</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Schedule your visit with our expert eye care team. We'll confirm your appointment within 24 hours.
            </p>
          </div>

          <div className="medical-card animate-fade-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center text-foreground font-medium">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-foreground font-medium">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-12"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center text-foreground font-medium">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    className="h-12"
                  />
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label className="flex items-center text-foreground font-medium">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    Service Required
                  </Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center text-foreground font-medium">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    Preferred Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="h-12"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label className="flex items-center text-foreground font-medium">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Preferred Time
                  </Label>
                  <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center text-foreground font-medium">
                  <FileText className="w-4 h-4 mr-2 text-primary" />
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please describe your symptoms or reason for visit..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-medical min-w-48"
                  size="lg"
                >
                  {isSubmitting ? "Sending..." : "Book Appointment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
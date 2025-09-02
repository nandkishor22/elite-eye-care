import { Eye, Microscope, Shield, Zap, Users, Heart } from "lucide-react";

const services = [
  {
    icon: Eye,
    title: "Comprehensive Eye Exams",
    description: "Complete vision assessments using state-of-the-art diagnostic equipment",
    features: ["Digital retinal imaging", "Glaucoma screening", "Vision correction planning"]
  },
  {
    icon: Zap,
    title: "LASIK Surgery",
    description: "Advanced laser vision correction for crystal-clear sight",
    features: ["Blade-free technology", "Custom wavefront mapping", "Quick recovery"]
  },
  {
    icon: Shield,
    title: "Cataract Treatment",
    description: "Premium intraocular lens implantation with precision techniques",
    features: ["Premium lens options", "Micro-incision surgery", "Same-day procedures"]
  },
  {
    icon: Microscope,
    title: "Retinal Specialist",
    description: "Expert care for complex retinal conditions and diseases",
    features: ["Diabetic retinopathy", "Macular degeneration", "Retinal detachment"]
  },
  {
    icon: Users,
    title: "Pediatric Eye Care",
    description: "Specialized vision care for children and adolescents",
    features: ["Early detection", "Amblyopia treatment", "Vision therapy"]
  },
  {
    icon: Heart,
    title: "Emergency Eye Care",
    description: "Immediate treatment for urgent eye conditions and injuries",
    features: ["24/7 availability", "Foreign body removal", "Trauma treatment"]
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-accent/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive eye care services delivered with precision, compassion, and cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.title}
                className="medical-card group animate-fade-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
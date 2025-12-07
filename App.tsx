
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ArrowRight, Check, Star, 
  Instagram, Twitter, Linkedin, Facebook, MapPin, 
  Phone, Mail, Palette, Globe, Smartphone, TrendingUp, 
  Film, Video, Clock, Users, Zap, Award, ExternalLink,
  Calendar, User, ArrowLeft, Briefcase
} from 'lucide-react';
import { SERVICES, PORTFOLIO, TESTIMONIALS, PRICING, TEAM, ABOUT_CONTENT, CONTACT_INFO } from './constants';
import { AIChat } from './components/AIChat';
import { SEO } from './components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem, Service } from './types';

// --- Router System ---

type ViewState = 'home' | 'service' | 'portfolio' | 'case-study' | 'about' | 'contact';

interface RouterContextType {
  view: ViewState;
  id: string | null;
  navigate: (view: ViewState, id?: string | null) => void;
}

const RouterContext = React.createContext<RouterContextType>({
  view: 'home',
  id: null,
  navigate: () => {},
});

// --- UI Components ---

const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'outline' | 'secondary'; className?: string; onClick?: () => void }> = ({ 
  children, variant = 'primary', className = '', onClick 
}) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";
  const variants = {
    primary: "bg-gradient-to-r from-electric-600 to-neon-blue hover:to-electric-400 text-white shadow-lg hover:shadow-electric-500/25 hover:-translate-y-1",
    outline: "border border-white/20 hover:bg-white/10 text-white hover:border-white/40",
    secondary: "bg-white text-slate-900 hover:bg-slate-200"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className={`h-1 w-20 bg-electric-500 mt-4 ${centered ? 'mx-auto' : ''} rounded-full`} />
  </div>
);

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = "",
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Navigation ---

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate } = React.useContext(RouterContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', action: () => navigate('home') },
    { label: 'Services', action: () => navigate('home') }, // Keeps simple for now, could scroll to ID
    { label: 'Portfolio', action: () => navigate('portfolio') },
    { label: 'About', action: () => navigate('about') },
    { label: 'Contact', action: () => navigate('contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-2xl font-display font-bold tracking-tighter flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('home')}
          aria-label="Go to Homepage"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-electric-400 to-neon-purple rounded-lg transform rotate-45" />
          Motion Decorator
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map(item => (
            <button 
              key={item.label} 
              onClick={item.action} 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Button variant="primary" className="!py-2 !px-6 text-sm" onClick={() => navigate('contact')}>Get Started</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map(item => (
                <button 
                  key={item.label} 
                  onClick={() => { item.action(); setIsMenuOpen(false); }}
                  className="text-lg font-medium text-slate-300 hover:text-electric-400 text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC = () => {
  const { navigate } = React.useContext(RouterContext);
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-electric-400 to-neon-purple rounded transform rotate-45" />
              Motion Decorator
            </h2>
            <p className="text-slate-500 max-w-sm">
              Your 360° Creative & Digital Growth Partner. We transform ideas into powerful visual experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-slate-500">
              {SERVICES.slice(0, 4).map(s => (
                <li key={s.id}>
                  <button onClick={() => navigate('service', s.id)} className="hover:text-electric-400 transition-colors text-left">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href={CONTACT_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-electric-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={CONTACT_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-electric-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={CONTACT_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-electric-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
               <a href={CONTACT_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-electric-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Motion Decorator. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

// 1. Service Detail Page
const ServicePage: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  const service = SERVICES.find(s => s.id === serviceId);
  const { navigate } = React.useContext(RouterContext);

  if (!service) return <div className="pt-32 text-center">Service not found</div>;

  const relatedProjects = PORTFOLIO.filter(p => service.relatedPortfolioIds?.includes(p.id));

  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title={`${service.title} Services`}
        description={service.heroSubtitle || service.description}
        keywords={[service.title, 'Digital Services', 'Motion Decorator', ...(service.features || [])]}
        image={service.image}
      />
      {/* Service Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeInSection className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-electric-500/10 rounded-xl mb-6">
               <Palette className="w-8 h-8 text-electric-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">{service.heroTitle || service.title}</h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">{service.heroSubtitle || service.description}</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => navigate('contact')}>Book Consultation</Button>
              <Button variant="outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({behavior: 'smooth'})}>View Work</Button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features & Deliverables */}
      <section className="py-20 bg-slate-900">
        <FadeInSection className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-bold mb-8">What We Deliver</h3>
            <ul className="space-y-4">
              {service.features?.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-electric-500 shrink-0" />
                  <span className="text-lg text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold mb-6">Standard Deliverables</h3>
            <div className="flex flex-wrap gap-3">
              {service.deliverables?.map((d, i) => (
                <span key={i} className="px-4 py-2 bg-slate-900 rounded-lg text-electric-300 border border-white/5 text-sm">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <SectionTitle title="Our Process" centered />
            <div className="grid md:grid-cols-4 gap-8">
              {service.process?.map((step, i) => (
                <div key={i} className="relative p-6 rounded-2xl bg-slate-900 border border-white/5">
                  <div className="text-4xl font-bold text-slate-800 mb-4 font-display">0{i + 1}</div>
                  <h4 className="text-xl font-bold mb-2 text-white">{step.title}</h4>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Related Portfolio */}
      {relatedProjects.length > 0 && (
        <section id="portfolio" className="py-20 bg-slate-900">
          <div className="container mx-auto px-6">
            <FadeInSection>
              <SectionTitle title="Featured Projects" centered />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => navigate('case-study', item.id)}
                    className="group cursor-pointer rounded-2xl overflow-hidden relative aspect-[4/3] bg-slate-800"
                  >
                    <img src={item.imageUrl} alt={`${item.title} - ${service.title} Project`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-electric-400 flex items-center gap-1">View Case Study <ArrowRight className="w-4 h-4" /></p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>
      )}
    </div>
  );
};

// 2. Detailed Case Study Page
const CaseStudyPage: React.FC<{ itemId: string }> = ({ itemId }) => {
  const item = PORTFOLIO.find(p => p.id === itemId);
  const { navigate } = React.useContext(RouterContext);

  if (!item) return <div className="pt-32 text-center">Project not found</div>;

  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title={`${item.title} - Case Study`}
        description={item.description}
        keywords={[item.title, item.category, 'Case Study', 'Motion Decorator', ...(item.tags || [])]}
        image={item.imageUrl}
      />
      <div className="container mx-auto px-6 mb-12">
        <button onClick={() => navigate('portfolio')} className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Portfolio
        </button>

        {/* Header */}
        <FadeInSection className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-electric-500 font-bold tracking-wider uppercase text-sm">{item.category}</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mt-2 mb-6">{item.title}</h1>
            <p className="text-xl text-slate-300 leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-4 mt-8 text-sm">
               {item.client && <div className="bg-slate-800 px-4 py-2 rounded-lg text-slate-300"><span className="text-slate-500 block text-xs uppercase">Client</span>{item.client}</div>}
               {item.year && <div className="bg-slate-800 px-4 py-2 rounded-lg text-slate-300"><span className="text-slate-500 block text-xs uppercase">Year</span>{item.year}</div>}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img src={item.imageUrl} alt={`${item.title} - ${item.category} Case Study Preview`} className="w-full h-full object-cover" />
          </div>
        </FadeInSection>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {(item.challenge || item.solution) && (
              <FadeInSection className="space-y-8" delay={0.2}>
                 <div className="p-8 bg-slate-900 rounded-3xl border border-white/5">
                   <h3 className="text-2xl font-bold mb-4 text-white">The Challenge</h3>
                   <p className="text-slate-400 leading-relaxed">{item.challenge || "To create a unique digital presence."}</p>
                 </div>
                 <div className="p-8 bg-slate-900 rounded-3xl border border-white/5">
                   <h3 className="text-2xl font-bold mb-4 text-white">Our Solution</h3>
                   <p className="text-slate-400 leading-relaxed">{item.solution || "We implemented a custom strategy."}</p>
                 </div>
              </FadeInSection>
            )}
            
            {/* Gallery */}
            {item.gallery && (
              <FadeInSection delay={0.3}>
                <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
                <div className="grid gap-6">
                  {item.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`${item.title} Gallery Image ${i + 1}`} className="rounded-2xl w-full border border-white/5" />
                  ))}
                </div>
              </FadeInSection>
            )}
          </div>

          <div className="space-y-8">
             {/* Results */}
             <FadeInSection delay={0.4}>
               {item.results && (
                 <div className="bg-gradient-to-br from-electric-600 to-neon-purple p-8 rounded-3xl text-white shadow-xl mb-8">
                   <h3 className="font-bold text-xl mb-6">Key Results</h3>
                   <div className="space-y-6">
                     {item.results.map((res, i) => (
                       <div key={i}>
                         <div className="text-4xl font-bold font-display">{res.value}</div>
                         <div className="text-white/80 text-sm uppercase tracking-wide">{res.label}</div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

               {/* Tech Stack */}
               {item.tags && (
                 <div className="bg-slate-900 p-8 rounded-3xl border border-white/5 mb-8">
                   <h3 className="font-bold mb-4">Tools & Tech</h3>
                   <div className="flex flex-wrap gap-2">
                     {item.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">{tag}</span>
                     ))}
                   </div>
                 </div>
               )}

               {/* CTA */}
               <div className="bg-slate-800 p-8 rounded-3xl border border-white/5 text-center">
                 <h3 className="font-bold mb-2">Want results like this?</h3>
                 <p className="text-sm text-slate-400 mb-6">Let's discuss your project.</p>
                 <Button className="w-full" onClick={() => navigate('contact')}>Start Project</Button>
               </div>
             </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. About Page
const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="About Us"
        description="Learn about Motion Decorator's 10+ years of experience in providing 360-degree digital and creative services."
        keywords={['About Motion Decorator', 'Digital Agency Team', 'Creative Agency Story']}
        image={TEAM[0].image}
      />
      <section className="container mx-auto px-6 py-12">
        <FadeInSection className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Our Story</h1>
           <div className="h-1 w-20 bg-electric-500 mx-auto rounded-full" />
        </FadeInSection>
        
        <FadeInSection className="max-w-4xl mx-auto text-center mb-20" delay={0.2}>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">{ABOUT_CONTENT.mission}</p>
          <p className="text-slate-400">{ABOUT_CONTENT.story}</p>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <SectionTitle title="Meet the Team" centered />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM.map((member, i) => (
               <div key={i} className="text-center group">
                 <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-800 group-hover:border-electric-500 transition-colors">
                   <img src={member.image} alt={`${member.name} - ${member.role} at Motion Decorator`} className="w-full h-full object-cover" />
                 </div>
                 <h3 className="text-xl font-bold text-white">{member.name}</h3>
                 <p className="text-electric-400 text-sm font-medium">{member.role}</p>
               </div>
            ))}
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

// 4. Portfolio Page (Main)
const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Web', 'Graphics', 'Social', 'Motion', 'Ads', 'Branding', 'IT'];
  const { navigate } = React.useContext(RouterContext);

  const filteredItems = filter === 'All' ? PORTFOLIO : PORTFOLIO.filter(item => item.category === filter);

  return (
    <div className="pt-24 min-h-screen bg-slate-950">
      <SEO 
        title="Our Portfolio"
        description="Explore Motion Decorator's portfolio of stunning web designs, branding, motion graphics, and digital marketing campaigns."
        keywords={['Portfolio', 'Web Design Examples', 'Branding Case Studies', 'Motion Graphics Portfolio']}
      />
      <div className="container mx-auto px-6 py-12">
        <FadeInSection className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Our Work</h1>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto">Explore our latest case studies and creative projects.</p>
           <div className="h-1 w-20 bg-electric-500 mx-auto rounded-full mt-4" />
        </FadeInSection>
        
        {/* Filters */}
        <FadeInSection className="flex flex-wrap justify-center gap-4 mb-16" delay={0.2}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-electric-600 text-white shadow-lg shadow-electric-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeInSection>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                onClick={() => navigate('case-study', item.id)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-electric-500/10 transition-shadow"
              >
                <img src={item.imageUrl} alt={`${item.title} - ${item.category} Portfolio Item`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-electric-400 text-sm font-medium mb-2">{item.category}</span>
                  <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                  <div className="mt-4 flex items-center text-xs font-bold text-white uppercase tracking-wider">
                      View Case Study <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// 5. Contact Page
const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen">
      <SEO 
        title="Contact Us"
        description="Get in touch with Motion Decorator for a free consultation on your next digital project."
        keywords={['Contact Motion Decorator', 'Hire Digital Agency', 'Web Design Quote']}
      />
      <div className="container mx-auto px-6 py-12">
        <FadeInSection className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Get In Touch</h1>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto">Let's build something amazing together.</p>
           <div className="h-1 w-20 bg-electric-500 mx-auto rounded-full mt-4" />
        </FadeInSection>

        <FadeInSection className="bg-slate-900 rounded-[3rem] p-8 md:p-16 border border-white/5 max-w-5xl mx-auto relative overflow-hidden" delay={0.2}>
           <div className="grid md:grid-cols-2 gap-12 relative z-10">
             <div>
                <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300">
                    <User className="text-electric-500" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Contact Person</div>
                      <div className="font-medium">{CONTACT_INFO.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <Mail className="text-electric-500" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Email</div>
                      <div className="font-medium">{CONTACT_INFO.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-slate-300">
                    <Phone className="text-electric-500 mt-1" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Phone</div>
                      <div className="font-medium">
                        {CONTACT_INFO.phones.map(phone => (
                          <div key={phone}>{phone}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <MapPin className="text-electric-500" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Location</div>
                      <div className="font-medium">{CONTACT_INFO.address}</div>
                    </div>
                  </div>
                </div>
             </div>
             <form className="space-y-4" onSubmit={e => e.preventDefault()}>
               <input type="text" placeholder="Name" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-electric-500 focus:outline-none" />
               <input type="email" placeholder="Email" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-electric-500 focus:outline-none" />
               <textarea rows={4} placeholder="Message" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-electric-500 focus:outline-none" />
               <Button className="w-full">Send Message</Button>
             </form>
           </div>
        </FadeInSection>
      </div>
    </div>
  );
};

// --- Home Components (Partial) ---

const Hero: React.FC = () => {
  const { navigate } = React.useContext(RouterContext);
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-500/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-electric-400 text-sm font-semibold mb-6">
            🚀 360° Digital Growth Partner
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            We Build Brands & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-neon-purple">
              Digital Experiences
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
            From branding to code, Motion Decorator delivers measurable results through creative innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate('contact')}>
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" onClick={() => navigate('portfolio')}>View Portfolio</Button>
          </div>
        </motion.div>
        
        {/* Abstract 3D shape simulation */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-electric-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
               <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
               <div className="absolute -bottom-8 left-20 w-72 h-72 bg-electric-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
               <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur border border-white/10 p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-500" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500" />
                     <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-3">
                     <div className="h-2 bg-slate-700 rounded w-3/4" />
                     <div className="h-2 bg-slate-700 rounded w-1/2" />
                     <div className="h-32 bg-slate-800 rounded mt-4 flex items-center justify-center text-slate-600">
                        <TrendingUp className="w-8 h-8" />
                     </div>
                  </div>
               </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

const HomeServices: React.FC = () => {
  const { navigate } = React.useContext(RouterContext);
  const iconMap: Record<string, React.ReactNode> = {
    Palette: <Palette className="w-8 h-8" />,
    Globe: <Globe className="w-8 h-8" />,
    Smartphone: <Smartphone className="w-8 h-8" />,
    TrendingUp: <TrendingUp className="w-8 h-8" />,
    Film: <Film className="w-8 h-8" />,
    Video: <Video className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <FadeInSection>
          <SectionTitle title="Our Services" centered />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, idx) => (
              <div 
                key={s.id}
                onClick={() => navigate('service', s.id)}
                className="group p-6 rounded-2xl bg-slate-800/50 border border-white/5 hover:bg-slate-800 hover:border-electric-500/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 text-electric-400 group-hover:bg-electric-500 group-hover:text-white transition-colors">
                  {iconMap[s.icon]}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">{s.description}</p>
                <span className="text-xs font-bold text-electric-400 uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const HomePortfolioPreview: React.FC = () => {
  const { navigate } = React.useContext(RouterContext);
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <FadeInSection>
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl md:text-5xl font-display font-bold">Featured Work</h2>
               <div className="h-1 w-20 bg-electric-500 mt-4 rounded-full" />
            </div>
            <Button variant="outline" onClick={() => navigate('portfolio')} className="hidden md:flex">View All Work</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {PORTFOLIO.slice(0, 3).map(item => (
              <div key={item.id} onClick={() => navigate('case-study', item.id)} className="group cursor-pointer">
                <div className="rounded-2xl overflow-hidden aspect-video mb-4 relative">
                   <img src={item.imageUrl} alt={`${item.title} - ${item.category} Project Preview`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-electric-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.category}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
              <Button variant="outline" onClick={() => navigate('portfolio')} className="w-full justify-center">View All Work</Button>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="360° Creative & Digital Growth Partner"
        description="Motion Decorator transforms your ideas into powerful visual experiences. We offer Graphic Design, Web Development, SEO, and IT Solutions."
        keywords={['Motion Decorator', 'Digital Agency', 'Web Design', 'Graphic Design', 'SEO Services']}
      />
      <Hero />
      <HomeServices />
      <HomePortfolioPreview />
      {/* Reusing existing sections for WhyChooseUs, Process, Testimonials */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <SectionTitle title="Why Choose Us?" centered />
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Clock, title: "10+ Years", desc: "Experience" },
                { icon: Zap, title: "Fast", desc: "Turnaround" },
                { icon: TrendingUp, title: "ROI", desc: "Focused" },
                { icon: Users, title: "Dedicated", desc: "Support" }
              ].map((stat, i) => (
                <div key={i} className="p-6">
                  <div className="mx-auto w-12 h-12 bg-electric-500/10 rounded-full flex items-center justify-center text-electric-400 mb-4">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-lg">{stat.title}</h4>
                  <p className="text-slate-500">{stat.desc}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
      
      {/* Testimonials snippet */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <FadeInSection>
            <SectionTitle title="Client Love" centered />
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(t => (
                <div key={t.id} className="bg-slate-900 p-8 rounded-2xl border border-white/5">
                   <div className="flex gap-1 text-yellow-500 mb-4"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                   <p className="text-slate-300 italic mb-6">"{t.content}"</p>
                   <div className="font-bold">{t.name}</div>
                   <div className="text-xs text-slate-500">{t.company}</div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
};

// --- Main App & Router ---

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [id, setId] = useState<string | null>(null);

  // Initialize Router from Hash on Mount
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      // Default: #/ or empty
      if (!hash || hash === '#/') {
        setView('home');
        setId(null);
        return;
      }
      
      // Parse #/view/id
      const parts = hash.replace('#/', '').split('/');
      const page = parts[0] as ViewState;
      const paramId = parts[1] || null;

      if (['home', 'service', 'portfolio', 'case-study', 'about', 'contact'].includes(page)) {
        setView(page);
        setId(paramId);
      } else {
        setView('home'); // Fallback
      }
    };

    // Initial Load
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView: ViewState, newId: string | null = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update Hash (triggers useEffect)
    let newHash = `#/${newView}`;
    if (newId) newHash += `/${newId}`;
    window.location.hash = newHash;
  };

  return (
    <RouterContext.Provider value={{ view, id, navigate }}>
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-electric-500/30">
        <Header />
        
        <main className="min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={view + (id || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {view === 'home' && <HomePage />}
              {view === 'service' && id && <ServicePage serviceId={id} />}
              {view === 'portfolio' && <PortfolioPage />}
              {view === 'case-study' && id && <CaseStudyPage itemId={id} />}
              {view === 'about' && <AboutPage />}
              {view === 'contact' && <ContactPage />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <AIChat />
      </div>
    </RouterContext.Provider>
  );
}

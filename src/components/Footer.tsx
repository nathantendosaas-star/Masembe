import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isAuto = location.pathname.startsWith('/cars');
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  // Determine theme colors based on route
  let themeClasses = "bg-white text-black border-t border-gray-200";
  if (isHome || isAbout || isContact) {
    themeClasses = "bg-[#050505] text-white border-t border-white/10";
  } else if (isAuto) {
    themeClasses = "bg-auto-bg text-auto-text border-t border-auto-text/10";
  } else {
    themeClasses = "bg-re-bg text-re-text border-t border-re-text/10";
  }

  return (
    <footer className={cn("py-16 px-6 md:px-12", themeClasses)}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-black tracking-tighter">M</div>
              <div>
                <div className="font-bold uppercase tracking-widest text-sm">Masembe Group</div>
                <div className="text-xs opacity-60">Integrated Platform</div>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              Defining luxury in East Africa through exclusive automotive masterpieces and landmark real estate developments.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><Instagram size={20} /></a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><Twitter size={20} /></a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Grid Motors Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-50">Grid Motors</h3>
            <Link to="/cars" className="text-sm hover:opacity-70 transition-opacity">Showroom</Link>
            <Link to="/cars/inventory" className="text-sm hover:opacity-70 transition-opacity">Inventory</Link>
            <Link to="/cars/workshop" className="text-sm hover:opacity-70 transition-opacity">Workshop & Service</Link>
            <Link to="/cars/import" className="text-sm hover:opacity-70 transition-opacity">Import Advisory</Link>
          </div>

          {/* Real Estate Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-50">Real Estate</h3>
            <Link to="/property" className="text-sm hover:opacity-70 transition-opacity">Portfolio</Link>
            <Link to="/property/portfolio" className="text-sm hover:opacity-70 transition-opacity">Current Listings</Link>
            <Link to="/property/advisory" className="text-sm hover:opacity-70 transition-opacity">Advisory Services</Link>
            <Link to="/about" className="text-sm hover:opacity-70 transition-opacity">Our Legacy</Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-50">Contact</h3>
            <div className="flex items-start gap-3 text-sm opacity-80">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>123 Luxury Avenue, Victoria Island<br/>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-3 text-sm opacity-80">
              <Phone size={16} className="shrink-0" />
              <span>+234 800 MASEMBE</span>
            </div>
            <div className="flex items-center gap-3 text-sm opacity-80">
              <Mail size={16} className="shrink-0" />
              <span>concierge@masembegroup.com</span>
            </div>
            <Link to="/contact" className="mt-4 text-xs font-bold uppercase tracking-widest border-b border-current self-start pb-1 hover:opacity-70 transition-opacity">
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-current/10 text-xs opacity-50 font-medium">
          <div>
            &copy; {new Date().getFullYear()} Masembe Group. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
            <Link to="/admin" className="hover:opacity-100 transition-opacity">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

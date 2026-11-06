import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Clock, MapPin, Phone, Mail, Award, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-850 pt-16 pb-12 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-900">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-serif-luxury text-xl font-bold tracking-wider text-amber-100">
                GOURMET<span className="text-amber-500">HAVEN</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              An elevated dining experience celebrating culinary craftsmanship, rare seasonal ingredients, and intimate hospitality.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium pt-2">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Artisanal Culinary Concept • Illustrative Demo</span>
            </div>
          </div>

          {/* Service Hours */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-stone-100 font-semibold tracking-wider text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Operating Hours</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span className="text-stone-300">Lunch Service:</span>
                <span className="text-amber-300/90">12:00 PM – 3:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span className="text-stone-300">Dinner Service:</span>
                <span className="text-amber-300/90">7:00 PM – 11:30 PM</span>
              </li>
              <li className="flex justify-between border-b border-stone-900 pb-1.5">
                <span className="text-stone-300">Weekend Brunch:</span>
                <span className="text-amber-300/90">11:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between pt-1 text-xs text-stone-400">
                <span>Online Delivery:</span>
                <span>Everyday 12 PM – 11 PM</span>
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-stone-100 font-semibold tracking-wider text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Fine Dining Sanctuary</span>
            </h4>
            <p className="text-sm text-stone-400">
              4th Floor, Horizon Sky Pavilion,<br />
              Road No. 36, Jubilee Hills,<br />
              Hyderabad, Telangana 500033
            </p>
            <div className="pt-2 space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Table reservations managed online</span>
              </div>
              <a href="mailto:concierge@gourmethaven.com" className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>concierge@gourmethaven.com</span>
              </a>
            </div>
            <div className="text-[11px] text-amber-400/80 bg-stone-900 border border-stone-800 rounded-lg p-2.5 mt-2">
              Notice: GourmetHaven is a fictional dining concept for portfolio demonstration. Address and phone are illustrative sample data.
            </div>
          </div>

          {/* Quick Links & Accreditations */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-stone-100 font-semibold tracking-wider text-base">
              Explore & Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors">Digital Tasting Menu</Link>
              </li>
              <li>
                <Link to="/reserve" className="hover:text-amber-400 transition-colors">Private Dining & Event Booking</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors">Staff & Kitchen Portal</Link>
              </li>
              <li>
                <span className="text-xs text-stone-400 block pt-2">
                  Special dietary requests (Vegan, Jain, Gluten-Free) accommodated upon advance notice.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} GourmetHaven Fine Dining. Crafted with precision for FrameForge Portfolio.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Demo Data • Illustrative Project</span>
            <span>•</span>
            <span>Jubilee Hills Sample Location</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

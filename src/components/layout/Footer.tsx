import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "Dashboard", href: "/" },
      { label: "Lands & Plots", href: "/lands" },
      { label: "Homes & Flats", href: "/homes" },
      { label: "Rental Properties", href: "/rental" },
      { label: "Reviews", href: "/reviews" },
    ],
    services: [
      { label: "Property Buying", href: "#" },
      { label: "Property Selling", href: "#" },
      { label: "Property Renting", href: "#" },
      { label: "Home Loans", href: "#" },
      { label: "Legal Assistance", href: "#" },
    ],
    contact: [
      { icon: MapPin, text: "123 Property Street, Business City" },
      { icon: Phone, text: "+91 12345 67890" },
      { icon: Mail, text: "info@gaejraajproperties.com" },
      { icon: Clock, text: "Mon-Sat: 9:00 AM - 8:00 PM" },
    ],
  };

  return (
    <footer className="bg-[#0f1a2c] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-building text-white text-xl"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Gaejraaj</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">
                  Properties
                </span>
              </div>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Providing premium real estate solutions with transparency, trust,
              and technology since 2008. Your journey to the perfect home starts
              here.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-purple-600 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <i className="fas fa-chevron-right text-xs text-purple-500 group-hover:translate-x-1 transition-transform"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <i className="fas fa-chevron-right text-xs text-purple-500 group-hover:translate-x-1 transition-transform"></i>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-white/70"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="h-4 w-4 text-purple-400" />
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © Gaejra {currentYear}aj Properties. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

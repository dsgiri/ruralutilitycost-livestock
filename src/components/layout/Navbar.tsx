import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS } from '../../data';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 h-[60px] flex flex-col justify-center shrink-0">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold text-[14px]">
                L
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-bold text-[16px] text-slate-900 leading-tight">
                  Livestock App
                </span>
                <span className="text-[10px] text-slate-500 font-normal">
                  ruralutilitycost.com ecosystem
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center h-[60px]">
            <div className="ml-10 flex space-x-5 h-full items-center">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href;
                const isExternal = link.href.startsWith('http');
                const linkClass = `text-[13px] font-medium transition-colors h-full flex flex-col justify-end pb-[18px] ${
                  isActive 
                    ? 'text-[#2563EB] border-b-2 border-[#2563EB]' 
                    : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
                }`;
                
                return isExternal ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={linkClass}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <button className="ml-6 bg-[#F1F5F9] text-slate-600 border border-slate-200 px-4 py-1.5 rounded-md text-[13px] font-semibold cursor-pointer hidden">
              Sign In
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 min-h-[48px] min-w-[48px] rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-slate-200 absolute top-[60px] left-0 w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              const isExternal = link.href.startsWith('http');
              const linkClass = `block px-3 py-3 min-h-[48px] rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`;

              return isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={linkClass}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={linkClass}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

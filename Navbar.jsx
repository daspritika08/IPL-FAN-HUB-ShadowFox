import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home',     path: '/' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Squad',    path: '/squad' },
    { name: 'Stats',    path: '/stats' },
    { name: 'News',     path: '/news' },
    { name: 'Polls',    path: '/polls' },
    { name: 'Forum',    path: '/forum' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tighter italic focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          RCB<span className="text-red-600">HUB</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-6" role="menubar">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              role="menuitem"
              aria-current={isActive(link.path) ? 'page' : undefined}
              className={`text-xs font-bold uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                isActive(link.path) ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: AUTH + HAMBURGER */}
        <div className="flex items-center gap-3">
          {/* Auth — always visible */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="hidden sm:block text-xs font-bold uppercase tracking-widest hover:text-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Admin
              </Link>
              <button
                onClick={onLogout}
                className="text-[10px] font-black uppercase border border-white/20 px-3 py-1 rounded hover:bg-red-600 hover:border-red-600 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-bold uppercase border border-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Login
            </Link>
          )}

          {/* HAMBURGER — mobile only */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-black/95 border-t border-white/10 px-4 pb-6 pt-4"
          role="menu"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              role="menuitem"
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={closeMenu}
              className={`block py-3 text-sm font-bold uppercase tracking-widest border-b border-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${
                isActive(link.path) ? 'text-red-600' : 'text-white hover:text-red-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin"
              role="menuitem"
              onClick={closeMenu}
              className="block py-3 text-sm font-bold uppercase tracking-widest border-b border-white/5 hover:text-red-600 transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

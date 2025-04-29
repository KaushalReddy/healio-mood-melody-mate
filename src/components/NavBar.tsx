
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Headphones, Bed, Smile, MenuIcon, X, Bot } from 'lucide-react';
import { Button } from './ui/button';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Sleep', path: '/sleep', icon: <Bed className="w-4 h-4 mr-2" /> },
    { name: 'Mood', path: '/mood', icon: <Smile className="w-4 h-4 mr-2" /> },
    { name: 'Journal', path: '/journal', icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: 'Music', path: '/music', icon: <Headphones className="w-4 h-4 mr-2" /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot className="w-4 h-4 mr-2" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-10 w-full bg-white bg-opacity-80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="healio-gradient w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">Healio</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link to={item.path} key={item.name}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`flex items-center ${isActive(item.path) ? 'healio-gradient text-white' : ''}`}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full h-9 w-9 p-0 flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  ${isActive(item.path) 
                    ? 'healio-gradient text-white' 
                    : 'text-gray-700 hover:bg-gray-50'}
                  flex items-center px-3 py-2 rounded-md text-base font-medium
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

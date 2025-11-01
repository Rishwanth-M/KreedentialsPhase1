import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navigation />
      <main className="lg:ml-80 lg:pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;

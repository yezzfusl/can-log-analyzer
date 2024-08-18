import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-200 p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {year} CAN Log Analyzer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Footer = () => (
    <footer className="bg-black py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted text-sm">
            <p>&copy; {new Date().getFullYear()} Aditya Sankranthi. All Rights Reserved.</p>
        </div>
    </footer>
);

export default Footer;
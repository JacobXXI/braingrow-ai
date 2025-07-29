import React from 'react';
import logo from '../assets/logo.png';
import xLogo from '../assets/x-logo.svg';
import instagramLogo from '../assets/instagram-logo.svg';
import youtubeLogo from '../assets/youtube-logo.svg';
import linkedinLogo from '../assets/linkedin-logo.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer" style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e0e0e0',
      padding: '2rem 4rem',
      marginTop: '2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo and Social Icons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <img src={logo} alt="Logo" style={{
              width: '60px',
              height: '60px',
              objectFit: 'contain'
            }} />
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <a href="#" aria-label="X"><img src={xLogo} alt="X" style={{
              width: '24px',
              height: '24px'
            }} /></a>
            <a href="#" aria-label="Instagram"><img src={instagramLogo} alt="Instagram" style={{
              width: '24px',
              height: '24px'
            }} /></a>
            <a href="#" aria-label="YouTube"><img src={youtubeLogo} alt="YouTube" style={{
              width: '24px',
              height: '18px'
            }} /></a>
            <a href="#" aria-label="LinkedIn"><img src={linkedinLogo} alt="LinkedIn" style={{
              width: '24px',
              height: '24px'
            }} /></a>
          </div>
        </div>

        {/* Use Cases Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333333',
            margin: '0 0 0.5rem 0'
          }}>Use cases</h3>
          <a href="#" style={{
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            lineHeight: '1.5'
          }}>UI design</a>
          <a href="#" style={{
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            lineHeight: '1.5'
          }}>UX design</a>
          <a href="#" style={{
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            lineHeight: '1.5'
          }}>Wireframing</a>
          <a href="#" style={{
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            lineHeight: '1.5'
          }}>Diagramming</a>
          <a href="#" style={{
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            lineHeight: '1.5'
          }}>Brainstorming</a>
          <a href="#" style={{
            fontSize: '14px',
            color: '#666666',
            textDecoration: 'none',
            lineHeight: '1.5'
          }}>Online whiteboard</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
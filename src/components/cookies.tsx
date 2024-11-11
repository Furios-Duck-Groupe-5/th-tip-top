import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const CookieConsentBanner: React.FC = () => {
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!cookies.cookieConsent) {
      setIsVisible(true);
    }
  }, [cookies]);

  const acceptCookies = () => {
    setCookie('cookieConsent', 'accepted', { path: '/', maxAge: 365 * 24 * 60 * 60 });
    setIsVisible(false);
  };

  const rejectCookies = () => {
    setCookie('cookieConsent', 'rejected', { path: '/', maxAge: 365 * 24 * 60 * 60 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <p style={styles.text}>
          Ce site utilise des cookies pour améliorer votre expérience. En poursuivant votre navigation, vous acceptez notre{' '}
          <a href="/politique-de-cookies" style={styles.link}>politique de cookies</a>.
        </p>
        <div style={styles.buttons}>
          <button onClick={acceptCookies} style={styles.acceptButton}>
            Accepter
          </button>
          <button onClick={rejectCookies} style={styles.rejectButton}>
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#DDA15E', // Couleur dorée
    color: 'white',
    padding: '15px 0',
    textAlign: 'center',
    zIndex: 1000,
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    transition: 'bottom 0.3s ease-in-out',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '10px',
  },
  link: {
    color: '#ffffff', 
    textDecoration: 'underline',
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#27ae60', 
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  acceptButtonHover: {
    backgroundColor: '#2ecc71',
  },
  rejectButtonHover: {
    backgroundColor: '#c0392b',
  },
};

export default CookieConsentBanner;

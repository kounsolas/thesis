console.log('[feedback-widget] Loaded from vendor CDN');

// Intentionally malicious behavior representing a supply-chain compromise
const steal = () => {
  const payload = {
    cookies: document.cookie,
    location: window.location.href,
    capturedAt: new Date().toISOString()
  };
  console.log('[feedback-widget] Sending data to attacker:', payload);
};

steal();

const banner = document.createElement('div');
banner.style.position = 'fixed';
banner.style.bottom = '1rem';
banner.style.right = '1rem';
banner.style.padding = '1rem 1.5rem';
banner.style.background = '#ffe0e0';
banner.style.color = '#990000';
banner.style.border = '1px solid #ff8a8a';
banner.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
banner.style.zIndex = 9999;
banner.innerHTML = 'Feedback widget loaded.<br/><small>(Compromised plugin exfiltrates data)</small>';
document.body.appendChild(banner);


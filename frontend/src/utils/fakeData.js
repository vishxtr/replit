// Fake data generators for simulation

const brands = ['paypal', 'microsoft', 'google', 'amazon', 'netflix', 'apple', 'facebook', 'instagram', 'twitter', 'linkedin'];
const prefixes = ['secure', 'login', 'auth', 'verify', 'account', 'update', 'confirm', 'support'];
const tlds = ['.com', '.net', '.org', '-login.com', '-secure.net'];

export const fakeDomain = () => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const tld = tlds[Math.floor(Math.random() * tlds.length)];
  
  // Sometimes include typosquatting
  if (Math.random() > 0.5) {
    return `${brand}${Math.floor(Math.random() * 9)}-${prefix}${tld}`;
  }
  return `${brand}-${prefix}${tld}`;
};

export const fakeLevel = () => {
  const levels = ['Low', 'Medium', 'High'];
  const weights = [0.3, 0.4, 0.3]; // Medium more common
  const random = Math.random();
  
  if (random < weights[0]) return levels[0];
  if (random < weights[0] + weights[1]) return levels[1];
  return levels[2];
};

export const fakeDetectionType = () => {
  const types = ['URL Analysis', 'Email Content', 'SMS Pattern', 'Domain Reputation', 'AI Detection'];
  return types[Math.floor(Math.random() * types.length)];
};

export const fakeConfidence = () => {
  return (85 + Math.random() * 14).toFixed(1); // 85-99%
};

export const generateAlert = () => {
  const level = fakeLevel();
  const domain = fakeDomain();
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    domain: domain,
    sender: `phishing@${domain}`,
    threatLevel: level,
    detectionType: fakeDetectionType(),
    confidence: fakeConfidence(),
    status: 'Active',
    description: `Suspicious ${level.toLowerCase()} threat detected from ${domain}`
  };
};

export const generateExplanation = (alert) => {
  const explanations = [
    `The system detected anomalies in domain syntax and embedded URLs similar to known phishing patterns in the threat intelligence feed. The domain "${alert.domain}" exhibits characteristics of brand impersonation.`,
    `Advanced ML analysis identified suspicious linguistic patterns and urgency indicators commonly associated with phishing campaigns. Confidence level based on multi-factor analysis of content and metadata.`,
    `Visual similarity detection flagged this content as closely matching legitimate ${alert.domain.split('-')[0]} communications, a common credential harvesting technique.`,
    `Link graph analysis reveals connections to known malicious infrastructure. The domain registration date and SSL certificate patterns are consistent with phishing operations.`,
    `Natural language processing detected high-pressure language, unusual sender patterns, and embedded links that don't match the claimed destination.`
  ];
  
  return {
    confidence: alert.confidence,
    type: alert.threatLevel === 'High' ? 'Credential Harvesting' : alert.threatLevel === 'Medium' ? 'Phishing Attempt' : 'Suspicious Activity',
    explanation: explanations[Math.floor(Math.random() * explanations.length)],
    recommendations: [
      'Do not click any embedded links',
      'Report this email to your IT security team',
      'Delete the message immediately',
      'Verify sender authenticity through official channels'
    ],
    indicators: [
      'Suspicious domain pattern detected',
      'Urgent language indicators found',
      'Sender verification failed',
      'URL mismatch detected'
    ]
  };
};

export const generateSystemStats = () => ({
  cpuLoad: (20 + Math.random() * 30).toFixed(1),
  uptime: '99.98%',
  apiLatency: (15 + Math.random() * 20).toFixed(0),
  threatsBlocked: Math.floor(12000 + Math.random() * 1000),
  modelVersion: 'v3.2.1'
});

export const generateGraphData = () => {
  const nodes = [];
  const links = [];
  
  for (let i = 0; i < 15; i++) {
    nodes.push({
      id: `node-${i}`,
      name: fakeDomain(),
      threat: fakeLevel(),
      val: Math.random() * 20 + 5
    });
  }
  
  for (let i = 0; i < 20; i++) {
    const source = Math.floor(Math.random() * nodes.length);
    const target = Math.floor(Math.random() * nodes.length);
    if (source !== target) {
      links.push({
        source: `node-${source}`,
        target: `node-${target}`
      });
    }
  }
  
  return { nodes, links };
};

# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Utility functions for phishing detection simulation
"""

import random
import hashlib
import time
from typing import Dict, List, Any, Tuple
import json
from datetime import datetime, timedelta

# Set deterministic seed for reproducible results
RANDOM_SEED = 42
random.seed(RANDOM_SEED)

def get_deterministic_hash(text: str) -> int:
    """Generate deterministic hash for consistent results"""
    return int(hashlib.md5(text.encode()).hexdigest()[:8], 16)

def simulate_latency(base_ms: int = 50, variance: float = 0.3) -> int:
    """Simulate realistic API latency"""
    # Use deterministic "random" based on current time for realistic variation
    seed = int(time.time() * 1000) % 1000
    random.seed(seed)
    variance_amount = random.uniform(1 - variance, 1 + variance)
    latency = int(base_ms * variance_amount)
    random.seed(RANDOM_SEED)  # Reset to original seed
    return max(10, latency)  # Minimum 10ms

def extract_domain(url: str) -> str:
    """Extract domain from URL"""
    try:
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        from urllib.parse import urlparse
        return urlparse(url).netloc.lower()
    except:
        return url.lower()

def is_suspicious_tld(domain: str) -> bool:
    """Check if domain uses suspicious TLD"""
    suspicious_tlds = {
        '.tk', '.ml', '.ga', '.cf', '.click', '.download', '.exe', '.zip',
        '.bit', '.onion', '.biz', '.info', '.top', '.xyz'
    }
    return any(domain.endswith(tld) for tld in suspicious_tlds)

def calculate_urgency_score(text: str) -> float:
    """Calculate urgency score based on common phishing keywords"""
    urgency_keywords = [
        'urgent', 'immediately', 'asap', 'expire', 'expired', 'suspended',
        'verify', 'confirm', 'update', 'security', 'breach', 'compromise',
        'action required', 'click here', 'limited time', 'act now'
    ]
    
    text_lower = text.lower()
    score = 0.0
    for keyword in urgency_keywords:
        if keyword in text_lower:
            score += 0.1
    return min(1.0, score)

def extract_credentials_keywords(text: str) -> List[str]:
    """Extract potential credential-related keywords"""
    credential_keywords = [
        'password', 'username', 'login', 'account', 'credentials',
        'ssn', 'social security', 'credit card', 'bank account',
        'pin', 'verification code', 'otp', 'two-factor'
    ]
    
    found_keywords = []
    text_lower = text.lower()
    for keyword in credential_keywords:
        if keyword in text_lower:
            found_keywords.append(keyword)
    return found_keywords

def generate_simulation_id() -> str:
    """Generate unique simulation ID"""
    timestamp = int(time.time() * 1000)
    return f"sim_{timestamp}_{random.randint(1000, 9999)}"

def format_timestamp() -> str:
    """Get current timestamp in ISO format"""
    return datetime.now().isoformat()

def load_mock_data(filename: str) -> Dict[str, Any]:
    """Load mock data from JSON file"""
    try:
        with open(f"phishing_module/data/{filename}", 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_feedback(feedback_data: Dict[str, Any]) -> None:
    """Save user feedback for simulated learning"""
    try:
        feedback_file = "phishing_module/data/feedback_log.json"
        try:
            with open(feedback_file, 'r') as f:
                feedback_log = json.load(f)
        except FileNotFoundError:
            feedback_log = []
        
        feedback_log.append({
            "timestamp": format_timestamp(),
            "data": feedback_data
        })
        
        with open(feedback_file, 'w') as f:
            json.dump(feedback_log, f, indent=2)
    except Exception as e:
        print(f"Warning: Could not save feedback: {e}")

def calculate_confidence(component_scores: Dict[str, float], weights: Dict[str, float] = None) -> float:
    """Calculate overall confidence from component scores"""
    if weights is None:
        weights = {
            'text': 0.4,
            'visual': 0.2,
            'graph': 0.2,
            'adversarial': 0.2
        }
    
    weighted_sum = sum(component_scores.get(key, 0) * weight for key, weight in weights.items())
    return min(1.0, max(0.0, weighted_sum))

def determine_verdict(confidence: float, threshold_suspicious: float = 0.3, threshold_malicious: float = 0.7) -> str:
    """Determine verdict based on confidence score"""
    if confidence >= threshold_malicious:
        return "malicious"
    elif confidence >= threshold_suspicious:
        return "suspicious"
    else:
        return "safe"

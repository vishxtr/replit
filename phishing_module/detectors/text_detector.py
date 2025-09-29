# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Simulated Text-based Phishing Detector

This module simulates a transformer-based text analysis model for detecting
phishing attempts in emails, SMS, and other text content.
"""

import re
import random
from typing import Dict, List, Tuple, Any
from ..utils import get_deterministic_hash, calculate_urgency_score, extract_credentials_keywords

class TextDetector:
    """Simulated text-based phishing detector"""
    
    def __init__(self):
        self.suspicious_patterns = [
            r'click\s+here',
            r'verify\s+your\s+account',
            r'update\s+your\s+information',
            r'urgent\s+action\s+required',
            r'limited\s+time\s+offer',
            r'act\s+now',
            r'expires?\s+in\s+\d+',
            r'confirm\s+your\s+identity',
            r'suspended\s+account',
            r'security\s+breach'
        ]
        
        self.credential_keywords = [
            'password', 'username', 'login', 'account', 'credentials',
            'ssn', 'social security', 'credit card', 'bank account',
            'pin', 'verification code', 'otp', 'two-factor'
        ]
        
        self.suspicious_domains = [
            'paypal-security', 'amazon-verify', 'apple-support',
            'microsoft-update', 'google-security', 'facebook-verify'
        ]
    
    def analyze_text(self, text: str, metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Analyze text for phishing indicators
        
        Args:
            text: Input text to analyze
            metadata: Additional metadata (sender, headers, etc.)
            
        Returns:
            Dictionary containing analysis results
        """
        if metadata is None:
            metadata = {}
        
        # Simulate processing time
        processing_time = random.uniform(0.01, 0.05)
        
        # Extract features
        features = self._extract_features(text, metadata)
        
        # Calculate scores
        pattern_score = self._calculate_pattern_score(text)
        urgency_score = calculate_urgency_score(text)
        credential_score = self._calculate_credential_score(text)
        domain_score = self._calculate_domain_score(text, metadata)
        
        # Simulate transformer-like attention weights
        attention_weights = self._simulate_attention_weights(text)
        
        # Calculate overall text score
        text_score = (pattern_score * 0.4 + urgency_score * 0.3 + 
                     credential_score * 0.2 + domain_score * 0.1)
        
        # Generate highlights (suspicious tokens)
        highlights = self._generate_highlights(text, attention_weights)
        
        # Simulate explainability features
        explainability = self._generate_explainability(features)
        
        return {
            'score': min(1.0, text_score),
            'highlights': highlights,
            'features': features,
            'explainability': explainability,
            'processing_time': processing_time,
            'model_version': 'simulated-transformer-v1.0'
        }
    
    def _extract_features(self, text: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Extract linguistic and structural features"""
        features = {
            'length': len(text),
            'word_count': len(text.split()),
            'sentence_count': len(re.split(r'[.!?]+', text)),
            'exclamation_count': text.count('!'),
            'question_count': text.count('?'),
            'uppercase_ratio': sum(1 for c in text if c.isupper()) / len(text) if text else 0,
            'digit_ratio': sum(1 for c in text if c.isdigit()) / len(text) if text else 0,
            'special_char_ratio': sum(1 for c in text if not c.isalnum() and not c.isspace()) / len(text) if text else 0,
            'has_links': bool(re.search(r'https?://', text)),
            'has_phone': bool(re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', text)),
            'has_email': bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text))
        }
        
        # Add metadata features
        if 'from' in metadata:
            features['sender_domain'] = metadata['from'].split('@')[-1] if '@' in metadata['from'] else None
        
        return features
    
    def _calculate_pattern_score(self, text: str) -> float:
        """Calculate score based on suspicious patterns"""
        text_lower = text.lower()
        pattern_matches = 0
        
        for pattern in self.suspicious_patterns:
            if re.search(pattern, text_lower):
                pattern_matches += 1
        
        return min(1.0, pattern_matches / len(self.suspicious_patterns))
    
    def _calculate_credential_score(self, text: str) -> float:
        """Calculate score based on credential-related keywords"""
        found_keywords = extract_credentials_keywords(text)
        return min(1.0, len(found_keywords) / 5.0)  # Normalize by max expected keywords
    
    def _calculate_domain_score(self, text: str, metadata: Dict[str, Any]) -> float:
        """Calculate score based on suspicious domain patterns"""
        score = 0.0
        
        # Check for suspicious domain patterns in text
        for domain in self.suspicious_domains:
            if domain in text.lower():
                score += 0.2
        
        # Check sender domain if available
        if 'from' in metadata and '@' in metadata['from']:
            sender_domain = metadata['from'].split('@')[-1].lower()
            if any(susp in sender_domain for susp in self.suspicious_domains):
                score += 0.3
        
        return min(1.0, score)
    
    def _simulate_attention_weights(self, text: str) -> Dict[str, float]:
        """Simulate transformer attention weights for tokens"""
        words = text.split()
        weights = {}
        
        # Use deterministic hash to ensure consistent results
        text_hash = get_deterministic_hash(text)
        random.seed(text_hash)
        
        for i, word in enumerate(words):
            # Simulate attention based on word characteristics
            base_weight = 0.1
            
            # Higher attention for suspicious words
            if any(pattern in word.lower() for pattern in ['urgent', 'verify', 'click', 'password']):
                base_weight += 0.3
            
            # Higher attention for words with special characters
            if re.search(r'[!@#$%^&*()]', word):
                base_weight += 0.2
            
            # Add some randomness for realism
            weight = base_weight + random.uniform(0, 0.2)
            weights[word] = min(1.0, weight)
        
        random.seed(42)  # Reset seed
        return weights
    
    def _generate_highlights(self, text: str, attention_weights: Dict[str, float]) -> List[Dict[str, Any]]:
        """Generate highlighted suspicious tokens"""
        highlights = []
        words = text.split()
        
        for word in words:
            if word in attention_weights and attention_weights[word] > 0.3:
                highlights.append({
                    'token': word,
                    'weight': round(attention_weights[word], 3),
                    'reason': self._get_highlight_reason(word)
                })
        
        # Sort by weight descending
        highlights.sort(key=lambda x: x['weight'], reverse=True)
        return highlights[:10]  # Return top 10 highlights
    
    def _get_highlight_reason(self, word: str) -> str:
        """Get reason for highlighting a token"""
        word_lower = word.lower()
        
        if any(pattern in word_lower for pattern in ['urgent', 'immediately', 'asap']):
            return 'urgency_indicators'
        elif any(pattern in word_lower for pattern in ['verify', 'confirm', 'update']):
            return 'action_required'
        elif any(pattern in word_lower for pattern in ['password', 'login', 'account']):
            return 'credential_request'
        elif any(pattern in word_lower for pattern in ['click', 'here', 'link']):
            return 'suspicious_link'
        elif re.search(r'[!@#$%^&*()]', word):
            return 'special_characters'
        else:
            return 'suspicious_pattern'
    
    def _generate_explainability(self, features: Dict[str, Any]) -> Dict[str, Any]:
        """Generate explainability information"""
        explanations = {}
        
        if features['exclamation_count'] > 3:
            explanations['excessive_exclamations'] = f"Text contains {features['exclamation_count']} exclamation marks, indicating urgency"
        
        if features['uppercase_ratio'] > 0.3:
            explanations['excessive_caps'] = f"Text has {features['uppercase_ratio']:.1%} uppercase letters, suggesting urgency"
        
        if features['has_links']:
            explanations['contains_links'] = "Text contains links that could lead to malicious sites"
        
        if features['has_email']:
            explanations['contains_email'] = "Text contains email addresses that could be used for credential harvesting"
        
        return {
            'top_features': list(explanations.keys())[:3],
            'explanations': explanations,
            'feature_importance': {
                'urgency_indicators': 0.3,
                'credential_keywords': 0.25,
                'suspicious_patterns': 0.2,
                'domain_analysis': 0.15,
                'structural_features': 0.1
            }
        }

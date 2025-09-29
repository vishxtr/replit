# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Simulated Visual Phishing Detector

This module simulates CNN-based visual analysis for detecting phishing
attempts in HTML content, DOM structure, and visual elements.
"""

import re
import random
from typing import Dict, List, Any, Tuple
from ..utils import get_deterministic_hash

class VisualDetector:
    """Simulated visual-based phishing detector"""
    
    def __init__(self):
        self.brand_keywords = [
            'paypal', 'amazon', 'apple', 'microsoft', 'google', 'facebook',
            'netflix', 'spotify', 'uber', 'airbnb', 'linkedin', 'twitter'
        ]
        
        self.suspicious_elements = [
            'iframe', 'embed', 'object', 'script', 'form', 'input',
            'button', 'link', 'image', 'div'
        ]
        
        self.hidden_attributes = [
            'hidden', 'style="display:none"', 'style="visibility:hidden"',
            'opacity:0', 'position:absolute;left:-9999px'
        ]
    
    def analyze_html(self, html_content: str, url: str = None) -> Dict[str, Any]:
        """
        Analyze HTML content for visual phishing indicators
        
        Args:
            html_content: HTML content to analyze
            url: Source URL (optional)
            
        Returns:
            Dictionary containing visual analysis results
        """
        if not html_content:
            return self._empty_analysis()
        
        # Simulate processing time
        processing_time = random.uniform(0.02, 0.08)
        
        # Extract visual features
        features = self._extract_visual_features(html_content)
        
        # Calculate impersonation score
        impersonation_score = self._calculate_impersonation_score(html_content, url)
        
        # Detect structural anomalies
        anomalies = self._detect_structural_anomalies(html_content)
        
        # Calculate overall visual score
        visual_score = self._calculate_visual_score(features, impersonation_score, anomalies)
        
        # Generate warnings
        warnings = self._generate_warnings(features, anomalies)
        
        return {
            'score': min(1.0, visual_score),
            'impersonation_score': impersonation_score,
            'anomalies': anomalies,
            'warnings': warnings,
            'features': features,
            'processing_time': processing_time,
            'model_version': 'simulated-cnn-v1.0'
        }
    
    def _empty_analysis(self) -> Dict[str, Any]:
        """Return empty analysis for invalid input"""
        return {
            'score': 0.0,
            'impersonation_score': 0.0,
            'anomalies': [],
            'warnings': [],
            'features': {},
            'processing_time': 0.0,
            'model_version': 'simulated-cnn-v1.0'
        }
    
    def _extract_visual_features(self, html_content: str) -> Dict[str, Any]:
        """Extract visual features from HTML"""
        features = {
            'total_elements': len(re.findall(r'<[^>]+>', html_content)),
            'form_count': len(re.findall(r'<form[^>]*>', html_content, re.IGNORECASE)),
            'input_count': len(re.findall(r'<input[^>]*>', html_content, re.IGNORECASE)),
            'button_count': len(re.findall(r'<button[^>]*>', html_content, re.IGNORECASE)),
            'link_count': len(re.findall(r'<a[^>]*>', html_content, re.IGNORECASE)),
            'image_count': len(re.findall(r'<img[^>]*>', html_content, re.IGNORECASE)),
            'script_count': len(re.findall(r'<script[^>]*>', html_content, re.IGNORECASE)),
            'iframe_count': len(re.findall(r'<iframe[^>]*>', html_content, re.IGNORECASE)),
            'css_count': len(re.findall(r'<style[^>]*>', html_content, re.IGNORECASE)),
            'has_external_css': bool(re.search(r'<link[^>]*rel=["\']stylesheet["\'][^>]*>', html_content, re.IGNORECASE)),
            'has_external_js': bool(re.search(r'<script[^>]*src=', html_content, re.IGNORECASE)),
            'has_meta_refresh': bool(re.search(r'<meta[^>]*http-equiv=["\']refresh["\'][^>]*>', html_content, re.IGNORECASE)),
            'has_favicon': bool(re.search(r'<link[^>]*rel=["\']icon["\'][^>]*>', html_content, re.IGNORECASE)),
            'has_viewport': bool(re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*>', html_content, re.IGNORECASE))
        }
        
        # Calculate ratios
        total_elements = features['total_elements']
        if total_elements > 0:
            features['form_ratio'] = features['form_count'] / total_elements
            features['input_ratio'] = features['input_count'] / total_elements
            features['script_ratio'] = features['script_count'] / total_elements
        else:
            features['form_ratio'] = 0
            features['input_ratio'] = 0
            features['script_ratio'] = 0
        
        return features
    
    def _calculate_impersonation_score(self, html_content: str, url: str = None) -> float:
        """Calculate brand impersonation score"""
        score = 0.0
        content_lower = html_content.lower()
        
        # Check for brand keywords
        brand_matches = 0
        for brand in self.brand_keywords:
            if brand in content_lower:
                brand_matches += 1
                score += 0.1
        
        # Check for logo references
        logo_patterns = [
            r'logo', r'brand', r'header', r'navbar', r'footer'
        ]
        for pattern in logo_patterns:
            if re.search(pattern, content_lower):
                score += 0.05
        
        # Check for suspicious domain patterns
        if url:
            domain = url.lower()
            for brand in self.brand_keywords:
                if brand in domain and not any(legit in domain for legit in ['.com', '.org', '.net']):
                    score += 0.2
        
        # Check for form action domains
        form_actions = re.findall(r'<form[^>]*action=["\']([^"\']*)["\'][^>]*>', html_content, re.IGNORECASE)
        for action in form_actions:
            if any(brand in action.lower() for brand in self.brand_keywords):
                score += 0.15
        
        return min(1.0, score)
    
    def _detect_structural_anomalies(self, html_content: str) -> List[Dict[str, Any]]:
        """Detect structural anomalies in HTML"""
        anomalies = []
        content_lower = html_content.lower()
        
        # Check for hidden elements
        for attr in self.hidden_attributes:
            if attr in content_lower:
                anomalies.append({
                    'type': 'hidden_element',
                    'description': f'Found hidden element with attribute: {attr}',
                    'severity': 'medium'
                })
        
        # Check for suspicious iframes
        iframes = re.findall(r'<iframe[^>]*src=["\']([^"\']*)["\'][^>]*>', html_content, re.IGNORECASE)
        for iframe_src in iframes:
            if any(susp in iframe_src.lower() for susp in ['data:', 'javascript:', 'vbscript:']):
                anomalies.append({
                    'type': 'suspicious_iframe',
                    'description': f'Suspicious iframe source: {iframe_src}',
                    'severity': 'high'
                })
        
        # Check for form action mismatches
        forms = re.findall(r'<form[^>]*action=["\']([^"\']*)["\'][^>]*>', html_content, re.IGNORECASE)
        for form_action in forms:
            if not form_action.startswith(('http://', 'https://', '/', '#')):
                anomalies.append({
                    'type': 'suspicious_form_action',
                    'description': f'Form action not properly formatted: {form_action}',
                    'severity': 'medium'
                })
        
        # Check for excessive JavaScript
        script_count = len(re.findall(r'<script[^>]*>', html_content, re.IGNORECASE))
        if script_count > 10:
            anomalies.append({
                'type': 'excessive_javascript',
                'description': f'Page contains {script_count} script tags, which is unusually high',
                'severity': 'low'
            })
        
        # Check for missing security headers
        if not re.search(r'<meta[^>]*http-equiv=["\']content-security-policy["\'][^>]*>', html_content, re.IGNORECASE):
            anomalies.append({
                'type': 'missing_csp',
                'description': 'No Content Security Policy header found',
                'severity': 'low'
            })
        
        return anomalies
    
    def _calculate_visual_score(self, features: Dict[str, Any], impersonation_score: float, anomalies: List[Dict[str, Any]]) -> float:
        """Calculate overall visual phishing score"""
        score = 0.0
        
        # Base impersonation score
        score += impersonation_score * 0.4
        
        # Anomaly-based scoring
        anomaly_weights = {'high': 0.3, 'medium': 0.2, 'low': 0.1}
        for anomaly in anomalies:
            score += anomaly_weights.get(anomaly['severity'], 0.1)
        
        # Feature-based scoring
        if features['form_ratio'] > 0.1:  # High form ratio
            score += 0.1
        
        if features['input_ratio'] > 0.2:  # High input ratio
            score += 0.1
        
        if features['script_ratio'] > 0.3:  # High script ratio
            score += 0.1
        
        if features['has_external_js'] and not features['has_external_css']:
            score += 0.05  # Suspicious JS without CSS
        
        return min(1.0, score)
    
    def _generate_warnings(self, features: Dict[str, Any], anomalies: List[Dict[str, Any]]) -> List[str]:
        """Generate human-readable warnings"""
        warnings = []
        
        # Form-related warnings
        if features['form_count'] > 5:
            warnings.append('Multiple forms detected - potential credential harvesting')
        
        if features['input_count'] > 10:
            warnings.append('Excessive input fields - possible data collection attempt')
        
        # Script-related warnings
        if features['script_count'] > 15:
            warnings.append('High number of scripts - potential malicious code')
        
        if features['iframe_count'] > 3:
            warnings.append('Multiple iframes detected - possible content injection')
        
        # Anomaly-based warnings
        for anomaly in anomalies:
            if anomaly['severity'] == 'high':
                warnings.append(f"HIGH RISK: {anomaly['description']}")
            elif anomaly['severity'] == 'medium':
                warnings.append(f"MEDIUM RISK: {anomaly['description']}")
        
        # Brand impersonation warnings
        if features.get('impersonation_score', 0) > 0.5:
            warnings.append('Potential brand impersonation detected')
        
        return warnings[:10]  # Limit to top 10 warnings

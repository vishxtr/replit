# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Sandbox Emulator for Phishing Detection

This module simulates dynamic analysis of URLs and HTML content
in a sandboxed environment to detect malicious behavior.
"""

import random
import time
import base64
import re
from typing import Dict, List, Any, Optional, Tuple
from urllib.parse import urlparse, parse_qs, unquote
from ..utils import get_deterministic_hash, format_timestamp

class SandboxEmulator:
    """Simulated sandbox for dynamic analysis"""
    
    def __init__(self):
        self.redirect_chain_limit = 5
        self.analysis_timeout = 30  # seconds
        self.suspicious_patterns = [
            r'javascript:',
            r'data:',
            r'vbscript:',
            r'<script[^>]*>.*?</script>',
            r'<iframe[^>]*src=',
            r'<object[^>]*data=',
            r'<embed[^>]*src=',
            r'<form[^>]*action=',
            r'<input[^>]*type=["\']password["\']',
            r'<input[^>]*type=["\']email["\']'
        ]
        
        self.malicious_indicators = [
            'eval(',
            'document.write(',
            'innerHTML',
            'outerHTML',
            'createElement',
            'appendChild',
            'removeChild',
            'setAttribute',
            'getAttribute',
            'window.location',
            'document.location',
            'document.cookie',
            'localStorage',
            'sessionStorage'
        ]
    
    def analyze_url(self, url: str, follow_redirects: bool = True) -> Dict[str, Any]:
        """
        Analyze URL in simulated sandbox
        
        Args:
            url: URL to analyze
            follow_redirects: Whether to follow redirects
            
        Returns:
            Sandbox analysis results
        """
        start_time = time.time()
        
        # Simulate initial request
        initial_response = self._simulate_http_request(url)
        
        # Follow redirects if enabled
        redirect_chain = []
        if follow_redirects:
            redirect_chain = self._simulate_redirect_chain(url, initial_response)
        
        # Analyze final content
        final_url = redirect_chain[-1]['url'] if redirect_chain else url
        final_content = self._simulate_content_fetch(final_url)
        
        # Perform dynamic analysis
        dynamic_analysis = self._perform_dynamic_analysis(final_content, final_url)
        
        # Calculate risk score
        risk_score = self._calculate_risk_score(initial_response, redirect_chain, dynamic_analysis)
        
        # Generate verdict
        verdict = self._determine_verdict(risk_score)
        
        end_time = time.time()
        
        return {
            'url': url,
            'final_url': final_url,
            'verdict': verdict,
            'risk_score': risk_score,
            'redirect_chain': redirect_chain,
            'content_analysis': final_content,
            'dynamic_analysis': dynamic_analysis,
            'processing_time': end_time - start_time,
            'timestamp': format_timestamp(),
            'sandbox_id': f"sb_{int(time.time() * 1000)}"
        }
    
    def _simulate_http_request(self, url: str) -> Dict[str, Any]:
        """Simulate HTTP request to URL"""
        parsed = urlparse(url)
        
        # Simulate response based on URL characteristics
        response = {
            'status_code': 200,
            'headers': {
                'Content-Type': 'text/html; charset=utf-8',
                'Server': 'nginx/1.18.0',
                'X-Frame-Options': 'SAMEORIGIN',
                'X-Content-Type-Options': 'nosniff'
            },
            'content_length': random.randint(1000, 50000),
            'response_time': random.uniform(0.1, 2.0)
        }
        
        # Simulate different response codes based on URL
        if any(susp in url.lower() for susp in ['malicious', 'phishing', 'fake']):
            response['status_code'] = random.choice([200, 404, 403])
        elif any(susp in url.lower() for susp in ['redirect', 'jump', 'go']):
            response['status_code'] = random.choice([301, 302, 307, 308])
        
        # Add suspicious headers for malicious URLs
        if any(susp in url.lower() for susp in ['malicious', 'phishing']):
            response['headers']['X-Powered-By'] = 'PHP/7.4.0'
            response['headers']['Set-Cookie'] = 'sessionid=malicious123; HttpOnly'
        
        return response
    
    def _simulate_redirect_chain(self, initial_url: str, initial_response: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Simulate redirect chain following"""
        redirect_chain = []
        current_url = initial_url
        max_redirects = min(self.redirect_chain_limit, random.randint(1, 3))
        
        for i in range(max_redirects):
            # Simulate redirect response
            redirect_response = self._simulate_http_request(current_url)
            
            if redirect_response['status_code'] in [301, 302, 307, 308]:
                # Generate redirect URL
                redirect_url = self._generate_redirect_url(current_url, i)
                
                redirect_chain.append({
                    'step': i + 1,
                    'url': current_url,
                    'status_code': redirect_response['status_code'],
                    'redirect_url': redirect_url,
                    'response_time': redirect_response['response_time'],
                    'headers': redirect_response['headers']
                })
                
                current_url = redirect_url
            else:
                break
        
        return redirect_chain
    
    def _generate_redirect_url(self, base_url: str, step: int) -> str:
        """Generate redirect URL for simulation"""
        parsed = urlparse(base_url)
        
        # Simulate different redirect patterns
        redirect_patterns = [
            f"{parsed.scheme}://{parsed.netloc}/redirect{step}",
            f"{parsed.scheme}://{parsed.netloc}/go?step={step}",
            f"{parsed.scheme}://{parsed.netloc}/jump?url={base_url}&step={step}",
            f"{parsed.scheme}://{parsed.netloc}/final?redirected=true"
        ]
        
        return redirect_patterns[step % len(redirect_patterns)]
    
    def _simulate_content_fetch(self, url: str) -> Dict[str, Any]:
        """Simulate fetching and parsing content"""
        # Generate simulated HTML content based on URL
        html_content = self._generate_simulated_html(url)
        
        # Parse content for analysis
        parsed_content = self._parse_html_content(html_content)
        
        return {
            'html': html_content,
            'parsed': parsed_content,
            'content_type': 'text/html',
            'encoding': 'utf-8',
            'size': len(html_content)
        }
    
    def _generate_simulated_html(self, url: str) -> str:
        """Generate simulated HTML content based on URL"""
        # Use deterministic hash for consistent results
        url_hash = get_deterministic_hash(url)
        random.seed(url_hash)
        
        # Generate different HTML based on URL characteristics
        if any(susp in url.lower() for susp in ['phishing', 'fake', 'malicious']):
            html = self._generate_phishing_html(url)
        elif any(susp in url.lower() for susp in ['redirect', 'jump']):
            html = self._generate_redirect_html(url)
        else:
            html = self._generate_normal_html(url)
        
        random.seed(42)  # Reset seed
        return html
    
    def _generate_phishing_html(self, url: str) -> str:
        """Generate phishing-like HTML content"""
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Security Alert - Action Required</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {{ font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }}
                .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
                .header {{ color: #d32f2f; font-size: 24px; font-weight: bold; margin-bottom: 20px; }}
                .message {{ color: #333; line-height: 1.6; margin-bottom: 25px; }}
                .button {{ background: #1976d2; color: white; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }}
                .button:hover {{ background: #1565c0; }}
                .warning {{ background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">⚠️ Security Alert</div>
                <div class="message">
                    We have detected unusual activity on your account. Please verify your identity immediately to prevent account suspension.
                </div>
                <div class="warning">
                    <strong>Action Required:</strong> Click the button below to verify your account within 24 hours.
                </div>
                <form action="/verify" method="post">
                    <input type="hidden" name="token" value="malicious_token_123">
                    <input type="email" name="email" placeholder="Enter your email" required style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;">
                    <input type="password" name="password" placeholder="Enter your password" required style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;">
                    <button type="submit" class="button">Verify Account Now</button>
                </form>
                <script>
                    // Simulated malicious JavaScript
                    document.addEventListener('DOMContentLoaded', function() {{
                        console.log('Phishing page loaded');
                        // Simulate data collection
                        var form = document.querySelector('form');
                        form.addEventListener('submit', function(e) {{
                            e.preventDefault();
                            alert('This is a simulated phishing page!');
                        }});
                    }});
                </script>
            </div>
        </body>
        </html>
        """
    
    def _generate_redirect_html(self, url: str) -> str:
        """Generate redirect HTML content"""
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Redirecting...</title>
            <meta http-equiv="refresh" content="3;url=https://example.com/final">
            <script>
                setTimeout(function() {{
                    window.location.href = 'https://example.com/final';
                }}, 3000);
            </script>
        </head>
        <body>
            <h1>Redirecting...</h1>
            <p>You will be redirected in 3 seconds.</p>
        </body>
        </html>
        """
    
    def _generate_normal_html(self, url: str) -> str:
        """Generate normal HTML content"""
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <h1>Welcome to our website</h1>
            <p>This is a normal, legitimate webpage.</p>
            <p>No suspicious content detected.</p>
        </body>
        </html>
        """
    
    def _parse_html_content(self, html: str) -> Dict[str, Any]:
        """Parse HTML content for analysis"""
        parsed = {
            'forms': [],
            'links': [],
            'scripts': [],
            'images': [],
            'inputs': [],
            'meta_tags': []
        }
        
        # Extract forms
        form_matches = re.findall(r'<form[^>]*>(.*?)</form>', html, re.DOTALL | re.IGNORECASE)
        for form in form_matches:
            parsed['forms'].append({
                'action': re.search(r'action=["\']([^"\']*)["\']', form, re.IGNORECASE),
                'method': re.search(r'method=["\']([^"\']*)["\']', form, re.IGNORECASE),
                'content': form
            })
        
        # Extract links
        link_matches = re.findall(r'<a[^>]*href=["\']([^"\']*)["\'][^>]*>', html, re.IGNORECASE)
        parsed['links'] = link_matches
        
        # Extract scripts
        script_matches = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
        parsed['scripts'] = script_matches
        
        # Extract images
        img_matches = re.findall(r'<img[^>]*src=["\']([^"\']*)["\'][^>]*>', html, re.IGNORECASE)
        parsed['images'] = img_matches
        
        # Extract inputs
        input_matches = re.findall(r'<input[^>]*>', html, re.IGNORECASE)
        parsed['inputs'] = input_matches
        
        # Extract meta tags
        meta_matches = re.findall(r'<meta[^>]*>', html, re.IGNORECASE)
        parsed['meta_tags'] = meta_matches
        
        return parsed
    
    def _perform_dynamic_analysis(self, content: Dict[str, Any], url: str) -> Dict[str, Any]:
        """Perform dynamic analysis on content"""
        analysis = {
            'suspicious_patterns': [],
            'malicious_indicators': [],
            'form_analysis': [],
            'script_analysis': [],
            'risk_indicators': []
        }
        
        html = content['html']
        parsed = content['parsed']
        
        # Check for suspicious patterns
        for pattern in self.suspicious_patterns:
            matches = re.findall(pattern, html, re.IGNORECASE | re.DOTALL)
            if matches:
                analysis['suspicious_patterns'].append({
                    'pattern': pattern,
                    'matches': len(matches),
                    'severity': 'high' if 'javascript:' in pattern else 'medium'
                })
        
        # Check for malicious indicators
        for indicator in self.malicious_indicators:
            if indicator in html:
                analysis['malicious_indicators'].append({
                    'indicator': indicator,
                    'severity': 'high'
                })
        
        # Analyze forms
        for form in parsed['forms']:
            form_analysis = self._analyze_form(form)
            if form_analysis['risk_score'] > 0.5:
                analysis['form_analysis'].append(form_analysis)
        
        # Analyze scripts
        for script in parsed['scripts']:
            script_analysis = self._analyze_script(script)
            if script_analysis['risk_score'] > 0.5:
                analysis['script_analysis'].append(script_analysis)
        
        # Calculate overall risk indicators
        analysis['risk_indicators'] = self._calculate_risk_indicators(analysis)
        
        return analysis
    
    def _analyze_form(self, form: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze form for malicious behavior"""
        risk_score = 0.0
        warnings = []
        
        form_content = form.get('content', '')
        
        # Check for password fields
        if 'password' in form_content.lower():
            risk_score += 0.3
            warnings.append('Contains password field')
        
        # Check for email fields
        if 'email' in form_content.lower():
            risk_score += 0.2
            warnings.append('Contains email field')
        
        # Check for suspicious action URL
        action = form.get('action')
        if action and not action.startswith(('http://', 'https://', '/', '#')):
            risk_score += 0.4
            warnings.append('Suspicious form action URL')
        
        # Check for hidden fields
        if 'hidden' in form_content.lower():
            risk_score += 0.1
            warnings.append('Contains hidden fields')
        
        return {
            'risk_score': min(1.0, risk_score),
            'warnings': warnings,
            'form_type': 'credential_harvesting' if risk_score > 0.5 else 'normal'
        }
    
    def _analyze_script(self, script: str) -> Dict[str, Any]:
        """Analyze script for malicious behavior"""
        risk_score = 0.0
        warnings = []
        
        # Check for eval usage
        if 'eval(' in script:
            risk_score += 0.5
            warnings.append('Uses eval() function')
        
        # Check for DOM manipulation
        dom_functions = ['innerHTML', 'outerHTML', 'createElement', 'appendChild']
        for func in dom_functions:
            if func in script:
                risk_score += 0.2
                warnings.append(f'Uses {func} for DOM manipulation')
        
        # Check for location manipulation
        if 'window.location' in script or 'document.location' in script:
            risk_score += 0.3
            warnings.append('Manipulates browser location')
        
        # Check for cookie access
        if 'document.cookie' in script:
            risk_score += 0.2
            warnings.append('Accesses cookies')
        
        return {
            'risk_score': min(1.0, risk_score),
            'warnings': warnings,
            'script_type': 'malicious' if risk_score > 0.5 else 'normal'
        }
    
    def _calculate_risk_indicators(self, analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Calculate risk indicators from analysis"""
        indicators = []
        
        # Count suspicious patterns
        if analysis['suspicious_patterns']:
            indicators.append({
                'type': 'suspicious_patterns',
                'count': len(analysis['suspicious_patterns']),
                'severity': 'high'
            })
        
        # Count malicious indicators
        if analysis['malicious_indicators']:
            indicators.append({
                'type': 'malicious_indicators',
                'count': len(analysis['malicious_indicators']),
                'severity': 'high'
            })
        
        # Count risky forms
        risky_forms = [f for f in analysis['form_analysis'] if f['risk_score'] > 0.5]
        if risky_forms:
            indicators.append({
                'type': 'risky_forms',
                'count': len(risky_forms),
                'severity': 'medium'
            })
        
        # Count risky scripts
        risky_scripts = [s for s in analysis['script_analysis'] if s['risk_score'] > 0.5]
        if risky_scripts:
            indicators.append({
                'type': 'risky_scripts',
                'count': len(risky_scripts),
                'severity': 'medium'
            })
        
        return indicators
    
    def _calculate_risk_score(self, initial_response: Dict[str, Any], 
                            redirect_chain: List[Dict[str, Any]], 
                            dynamic_analysis: Dict[str, Any]) -> float:
        """Calculate overall risk score"""
        risk_score = 0.0
        
        # Response-based scoring
        if initial_response['status_code'] in [301, 302, 307, 308]:
            risk_score += 0.1  # Redirects can be suspicious
        
        # Redirect chain scoring
        if len(redirect_chain) > 2:
            risk_score += 0.2  # Long redirect chains are suspicious
        
        # Dynamic analysis scoring
        if dynamic_analysis['suspicious_patterns']:
            risk_score += 0.3
        
        if dynamic_analysis['malicious_indicators']:
            risk_score += 0.4
        
        if dynamic_analysis['form_analysis']:
            max_form_risk = max(f['risk_score'] for f in dynamic_analysis['form_analysis'])
            risk_score += max_form_risk * 0.3
        
        if dynamic_analysis['script_analysis']:
            max_script_risk = max(s['risk_score'] for s in dynamic_analysis['script_analysis'])
            risk_score += max_script_risk * 0.2
        
        return min(1.0, risk_score)
    
    def _determine_verdict(self, risk_score: float) -> str:
        """Determine verdict based on risk score"""
        if risk_score >= 0.7:
            return 'malicious'
        elif risk_score >= 0.4:
            return 'suspicious'
        else:
            return 'safe'

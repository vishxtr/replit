# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Unified Model Simulator

This module provides a unified interface for running all phishing detection
models and composing their results into a final verdict.
"""

import time
from typing import Dict, List, Any, Optional
from .text_detector import TextDetector
from .visual_detector import VisualDetector
from .link_graph import LinkGraphDetector
from .adversarial_detector import AdversarialDetector
from ..utils import calculate_confidence, determine_verdict, simulate_latency, format_timestamp

class ModelSimulator:
    """Unified simulator for all phishing detection models"""
    
    def __init__(self):
        self.text_detector = TextDetector()
        self.visual_detector = VisualDetector()
        self.link_graph_detector = LinkGraphDetector()
        self.adversarial_detector = AdversarialDetector()
        
        # Model weights for final scoring
        self.model_weights = {
            'text': 0.4,
            'visual': 0.2,
            'graph': 0.2,
            'adversarial': 0.2
        }
        
        # Thresholds for verdict determination
        self.thresholds = {
            'suspicious': 0.3,
            'malicious': 0.7
        }
    
    def analyze_content(self, content: str, content_type: str, 
                       metadata: Dict[str, Any] = None, url: str = None) -> Dict[str, Any]:
        """
        Analyze content using all available models
        
        Args:
            content: Content to analyze (text, HTML, etc.)
            content_type: Type of content ('email', 'sms', 'url', 'html')
            metadata: Additional metadata
            url: URL if analyzing web content
            
        Returns:
            Comprehensive analysis results
        """
        start_time = time.time()
        
        if metadata is None:
            metadata = {}
        
        # Initialize results
        results = {
            'verdict': 'safe',
            'confidence': 0.0,
            'component_scores': {},
            'explainability': {},
            'latency_ms': 0,
            'simulation_details': {},
            'timestamp': format_timestamp(),
            'content_type': content_type
        }
        
        # Run text analysis
        text_results = self._run_text_analysis(content, metadata)
        results['component_scores']['text'] = text_results
        
        # Run visual analysis (if HTML content)
        if content_type in ['html', 'url'] or '<' in content:
            visual_results = self._run_visual_analysis(content, url)
            results['component_scores']['visual'] = visual_results
        else:
            results['component_scores']['visual'] = {'score': 0.0, 'warnings': []}
        
        # Run graph analysis (if URL provided)
        if url or content_type == 'url':
            domain = self._extract_domain_from_content(content, url)
            if domain:
                graph_results = self._run_graph_analysis(domain, url)
                results['component_scores']['graph'] = graph_results
            else:
                results['component_scores']['graph'] = {'score': 0.0, 'related_domains': []}
        else:
            results['component_scores']['graph'] = {'score': 0.0, 'related_domains': []}
        
        # Run adversarial analysis
        adversarial_results = self._run_adversarial_analysis(content, metadata)
        results['component_scores']['adversarial'] = adversarial_results
        
        # Calculate overall confidence
        component_scores = {
            'text': results['component_scores']['text']['score'],
            'visual': results['component_scores']['visual']['score'],
            'graph': results['component_scores']['graph']['score'],
            'adversarial': results['component_scores']['adversarial']['score']
        }
        
        results['confidence'] = calculate_confidence(component_scores, self.model_weights)
        
        # Determine verdict
        results['verdict'] = determine_verdict(
            results['confidence'], 
            self.thresholds['suspicious'], 
            self.thresholds['malicious']
        )
        
        # Generate explainability
        results['explainability'] = self._generate_explainability(component_scores, results)
        
        # Calculate latency
        end_time = time.time()
        results['latency_ms'] = int((end_time - start_time) * 1000)
        
        # Add simulation details
        results['simulation_details'] = self._generate_simulation_details(
            content_type, component_scores, results['verdict']
        )
        
        return results
    
    def _run_text_analysis(self, content: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Run text-based analysis"""
        try:
            return self.text_detector.analyze_text(content, metadata)
        except Exception as e:
            return {
                'score': 0.0,
                'highlights': [],
                'features': {},
                'explainability': {},
                'processing_time': 0.0,
                'error': str(e)
            }
    
    def _run_visual_analysis(self, content: str, url: str = None) -> Dict[str, Any]:
        """Run visual-based analysis"""
        try:
            return self.visual_detector.analyze_html(content, url)
        except Exception as e:
            return {
                'score': 0.0,
                'warnings': [],
                'anomalies': [],
                'features': {},
                'processing_time': 0.0,
                'error': str(e)
            }
    
    def _run_graph_analysis(self, domain: str, url: str = None) -> Dict[str, Any]:
        """Run graph-based analysis"""
        try:
            return self.link_graph_detector.analyze_domain(domain, url)
        except Exception as e:
            return {
                'score': 0.0,
                'related_domains': [],
                'graph': {'nodes': [], 'edges': []},
                'metrics': {},
                'processing_time': 0.0,
                'error': str(e)
            }
    
    def _run_adversarial_analysis(self, content: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
        """Run adversarial analysis"""
        try:
            return self.adversarial_detector.analyze_text(content, metadata)
        except Exception as e:
            return {
                'score': 0.0,
                'confidence': 0.0,
                'features': {},
                'explanations': {},
                'processing_time': 0.0,
                'error': str(e)
            }
    
    def _extract_domain_from_content(self, content: str, url: str = None) -> Optional[str]:
        """Extract domain from content or URL"""
        if url:
            try:
                from urllib.parse import urlparse
                return urlparse(url).netloc.lower()
            except:
                pass
        
        # Try to extract domain from content
        import re
        url_pattern = r'https?://([^\s/]+)'
        match = re.search(url_pattern, content)
        if match:
            return match.group(1).lower()
        
        return None
    
    def _generate_explainability(self, component_scores: Dict[str, float], 
                               results: Dict[str, Any]) -> Dict[str, Any]:
        """Generate explainability information"""
        explainability = {
            'top_features': [],
            'explanations': {},
            'model_contributions': {},
            'decision_factors': []
        }
        
        # Get top contributing models
        sorted_models = sorted(component_scores.items(), key=lambda x: x[1], reverse=True)
        explainability['top_features'] = [model[0] for model in sorted_models[:3]]
        
        # Model contributions
        for model, score in component_scores.items():
            weight = self.model_weights.get(model, 0.0)
            contribution = score * weight
            explainability['model_contributions'][model] = {
                'score': score,
                'weight': weight,
                'contribution': contribution
            }
        
        # Decision factors
        if results['verdict'] == 'malicious':
            explainability['decision_factors'].append('High confidence across multiple models')
        elif results['verdict'] == 'suspicious':
            explainability['decision_factors'].append('Moderate confidence with some concerning indicators')
        else:
            explainability['decision_factors'].append('Low confidence across all models')
        
        # Add specific explanations from components
        for component, data in results['component_scores'].items():
            if 'explainability' in data:
                explainability['explanations'][component] = data['explainability']
        
        return explainability
    
    def _generate_simulation_details(self, content_type: str, component_scores: Dict[str, float], 
                                   verdict: str) -> Dict[str, Any]:
        """Generate simulation-specific details"""
        return {
            'sandbox_trace': self._simulate_sandbox_trace(content_type),
            'mock_ioc_ids': self._generate_mock_ioc_ids(component_scores),
            'simulation_id': f"sim_{int(time.time() * 1000)}",
            'model_versions': {
                'text': 'simulated-transformer-v1.0',
                'visual': 'simulated-cnn-v1.0',
                'graph': 'simulated-gnn-v1.0',
                'adversarial': 'simulated-adversarial-v1.0'
            },
            'confidence_breakdown': component_scores,
            'verdict_reasoning': self._get_verdict_reasoning(verdict, component_scores)
        }
    
    def _simulate_sandbox_trace(self, content_type: str) -> List[Dict[str, Any]]:
        """Simulate sandbox execution trace"""
        trace = [
            {'step': 1, 'action': 'content_received', 'timestamp': format_timestamp()},
            {'step': 2, 'action': 'preprocessing', 'timestamp': format_timestamp()},
            {'step': 3, 'action': 'model_inference', 'timestamp': format_timestamp()},
            {'step': 4, 'action': 'postprocessing', 'timestamp': format_timestamp()},
            {'step': 5, 'action': 'result_generation', 'timestamp': format_timestamp()}
        ]
        
        if content_type in ['html', 'url']:
            trace.insert(3, {'step': 3, 'action': 'html_parsing', 'timestamp': format_timestamp()})
            trace.insert(4, {'step': 4, 'action': 'dom_analysis', 'timestamp': format_timestamp()})
        
        return trace
    
    def _generate_mock_ioc_ids(self, component_scores: Dict[str, float]) -> List[str]:
        """Generate mock IOC (Indicators of Compromise) IDs"""
        ioc_ids = []
        
        for component, score in component_scores.items():
            if score > 0.5:
                ioc_ids.append(f"IOC-{component.upper()}-{int(score * 1000)}")
        
        return ioc_ids[:5]  # Limit to 5 IOCs
    
    def _get_verdict_reasoning(self, verdict: str, component_scores: Dict[str, float]) -> str:
        """Get reasoning for the verdict"""
        if verdict == 'malicious':
            high_components = [comp for comp, score in component_scores.items() if score > 0.7]
            return f"High risk detected in: {', '.join(high_components)}"
        elif verdict == 'suspicious':
            medium_components = [comp for comp, score in component_scores.items() if 0.3 < score < 0.7]
            return f"Moderate risk detected in: {', '.join(medium_components)}"
        else:
            return "No significant risk indicators detected"
    
    def update_model_weights(self, new_weights: Dict[str, float]) -> None:
        """Update model weights for scoring"""
        if set(new_weights.keys()) == set(self.model_weights.keys()):
            self.model_weights.update(new_weights)
    
    def update_thresholds(self, new_thresholds: Dict[str, float]) -> None:
        """Update thresholds for verdict determination"""
        if set(new_thresholds.keys()) == set(self.thresholds.keys()):
            self.thresholds.update(new_thresholds)
    
    def get_model_status(self) -> Dict[str, Any]:
        """Get status of all models"""
        return {
            'text_detector': 'active',
            'visual_detector': 'active',
            'link_graph_detector': 'active',
            'adversarial_detector': 'active',
            'model_weights': self.model_weights,
            'thresholds': self.thresholds,
            'last_updated': format_timestamp()
        }

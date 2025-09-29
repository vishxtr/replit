# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Unit tests for phishing detection module

This module contains comprehensive tests for all components
of the phishing detection system.
"""

import unittest
import json
import sys
import os
from unittest.mock import patch, MagicMock

# Add the phishing module to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'phishing_module'))

from detectors.text_detector import TextDetector
from detectors.visual_detector import VisualDetector
from detectors.link_graph import LinkGraphDetector
from detectors.adversarial_detector import AdversarialDetector
from detectors.model_simulator import ModelSimulator
from simulator.sandbox_emulator import SandboxEmulator
from simulator.retrain_simulator import RetrainSimulator
from utils import get_deterministic_hash, calculate_confidence, determine_verdict

# For Flask API tests
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'phishing_module'))
import api as phishing_api

class TestFlaskAPI(unittest.TestCase):
    """Flask API endpoint tests using test client"""

    def setUp(self):
        self.app = phishing_api.app
        self.client = self.app.test_client()

    def test_health(self):
        res = self.client.get('/phishing/health')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data.get('status'), 'healthy')

    def test_analysis_endpoint(self):
        payload = {
            'type': 'email',
            'content': 'Hello, this is a test email.',
            'metadata': {'from': 'a@b.com'}
        }
        res = self.client.post('/phishing/analysis', json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('verdict', data)
        self.assertIn('component_scores', data)

    def test_graph_endpoint(self):
        res = self.client.get('/phishing/graph/example.com')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('graph', data)

    def test_feedback_endpoint(self):
        payload = {
            'content_type': 'email',
            'user_verdict': 'safe',
            'model_verdict': 'suspicious',
            'confidence': 0.6
        }
        res = self.client.post('/phishing/feedback', json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn('status', data)

class TestTextDetector(unittest.TestCase):
    """Test cases for text-based phishing detector"""
    
    def setUp(self):
        self.detector = TextDetector()
    
    def test_analyze_text_benign(self):
        """Test analysis of benign text"""
        text = "Hello, this is a normal email message."
        result = self.detector.analyze_text(text)
        
        self.assertIn('score', result)
        self.assertIn('highlights', result)
        self.assertIn('features', result)
        self.assertIsInstance(result['score'], float)
        self.assertGreaterEqual(result['score'], 0.0)
        self.assertLessEqual(result['score'], 1.0)
    
    def test_analyze_text_phishing(self):
        """Test analysis of phishing text"""
        text = "URGENT: Your account has been compromised! Click here to verify: https://fake-bank.com"
        result = self.detector.analyze_text(text)
        
        self.assertIn('score', result)
        self.assertGreater(result['score'], 0.5)  # Should detect as suspicious
    
    def test_analyze_text_with_metadata(self):
        """Test analysis with metadata"""
        text = "Please verify your account"
        metadata = {'from': 'suspicious@fake-bank.com'}
        result = self.detector.analyze_text(text, metadata)
        
        self.assertIn('score', result)
        self.assertIn('features', result)
    
    def test_deterministic_results(self):
        """Test that results are deterministic"""
        text = "Test message for deterministic results"
        result1 = self.detector.analyze_text(text)
        result2 = self.detector.analyze_text(text)
        
        self.assertEqual(result1['score'], result2['score'])

class TestVisualDetector(unittest.TestCase):
    """Test cases for visual-based phishing detector"""
    
    def setUp(self):
        self.detector = VisualDetector()
    
    def test_analyze_html_benign(self):
        """Test analysis of benign HTML"""
        html = "<html><body><h1>Welcome</h1><p>This is a normal page.</p></body></html>"
        result = self.detector.analyze_html(html)
        
        self.assertIn('score', result)
        self.assertIn('anomalies', result)
        self.assertIn('warnings', result)
        self.assertIsInstance(result['score'], float)
    
    def test_analyze_html_phishing(self):
        """Test analysis of phishing HTML"""
        html = """
        <html>
        <body>
            <form action="/steal-credentials" method="post">
                <input type="email" name="email" placeholder="Email">
                <input type="password" name="password" placeholder="Password">
                <button type="submit">Verify Account</button>
            </form>
        </body>
        </html>
        """
        result = self.detector.analyze_html(html)
        
        self.assertIn('score', result)
        self.assertGreater(result['score'], 0.3)  # Should detect as suspicious
    
    def test_analyze_html_empty(self):
        """Test analysis of empty HTML"""
        result = self.detector.analyze_html("")
        self.assertEqual(result['score'], 0.0)

class TestLinkGraphDetector(unittest.TestCase):
    """Test cases for link graph-based phishing detector"""
    
    def setUp(self):
        self.detector = LinkGraphDetector()
    
    def test_analyze_domain_benign(self):
        """Test analysis of benign domain"""
        domain = "google.com"
        result = self.detector.analyze_domain(domain)
        
        self.assertIn('score', result)
        self.assertIn('graph', result)
        self.assertIn('metrics', result)
        self.assertIsInstance(result['score'], float)
    
    def test_analyze_domain_suspicious(self):
        """Test analysis of suspicious domain"""
        domain = "paypal-security.tk"
        result = self.detector.analyze_domain(domain)
        
        self.assertIn('score', result)
        self.assertGreater(result['score'], 0.3)  # Should detect as suspicious
    
    def test_analyze_domain_empty(self):
        """Test analysis of empty domain"""
        result = self.detector.analyze_domain("")
        self.assertEqual(result['score'], 0.0)

class TestAdversarialDetector(unittest.TestCase):
    """Test cases for adversarial content detector"""
    
    def setUp(self):
        self.detector = AdversarialDetector()
    
    def test_analyze_text_natural(self):
        """Test analysis of natural text"""
        text = "This is a natural, human-written message."
        result = self.detector.analyze_text(text)
        
        self.assertIn('score', result)
        self.assertIn('confidence', result)
        self.assertIn('features', result)
        self.assertIsInstance(result['score'], float)
    
    def test_analyze_text_llm_generated(self):
        """Test analysis of LLM-generated text"""
        text = "Dear Valued Customer, We are writing to inform you that we have detected unusual activity on your account. Please be advised that immediate action is required."
        result = self.detector.analyze_text(text)
        
        self.assertIn('score', result)
        self.assertGreater(result['score'], 0.3)  # Should detect as LLM-generated
    
    def test_analyze_text_empty(self):
        """Test analysis of empty text"""
        result = self.detector.analyze_text("")
        self.assertEqual(result['score'], 0.0)

class TestModelSimulator(unittest.TestCase):
    """Test cases for unified model simulator"""
    
    def setUp(self):
        self.simulator = ModelSimulator()
    
    def test_analyze_content_email(self):
        """Test analysis of email content"""
        content = "Hello, this is a test email."
        result = self.simulator.analyze_content(content, 'email')
        
        self.assertIn('verdict', result)
        self.assertIn('confidence', result)
        self.assertIn('component_scores', result)
        self.assertIn('latency_ms', result)
        self.assertIn(result['verdict'], ['safe', 'suspicious', 'malicious'])
    
    def test_analyze_content_url(self):
        """Test analysis of URL content"""
        content = "https://example.com"
        result = self.simulator.analyze_content(content, 'url')
        
        self.assertIn('verdict', result)
        self.assertIn('confidence', result)
        self.assertIn('component_scores', result)
    
    def test_analyze_content_html(self):
        """Test analysis of HTML content"""
        content = "<html><body><h1>Test</h1></body></html>"
        result = self.simulator.analyze_content(content, 'html')
        
        self.assertIn('verdict', result)
        self.assertIn('confidence', result)
        self.assertIn('component_scores', result)
    
    def test_deterministic_results(self):
        """Test that results are deterministic"""
        content = "Test content for deterministic results"
        result1 = self.simulator.analyze_content(content, 'email')
        result2 = self.simulator.analyze_content(content, 'email')
        
        self.assertEqual(result1['verdict'], result2['verdict'])
        self.assertEqual(result1['confidence'], result2['confidence'])

class TestSandboxEmulator(unittest.TestCase):
    """Test cases for sandbox emulator"""
    
    def setUp(self):
        self.emulator = SandboxEmulator()
    
    def test_analyze_url_benign(self):
        """Test analysis of benign URL"""
        url = "https://example.com"
        result = self.emulator.analyze_url(url)
        
        self.assertIn('verdict', result)
        self.assertIn('risk_score', result)
        self.assertIn('redirect_chain', result)
        self.assertIn('content_analysis', result)
        self.assertIn(result['verdict'], ['safe', 'suspicious', 'malicious'])
    
    def test_analyze_url_suspicious(self):
        """Test analysis of suspicious URL"""
        url = "https://malicious-site.tk"
        result = self.emulator.analyze_url(url)
        
        self.assertIn('verdict', result)
        self.assertIn('risk_score', result)
    
    def test_analyze_url_with_redirects(self):
        """Test analysis with redirect following"""
        url = "https://redirect-site.com"
        result = self.emulator.analyze_url(url, follow_redirects=True)
        
        self.assertIn('verdict', result)
        self.assertIn('redirect_chain', result)

class TestRetrainSimulator(unittest.TestCase):
    """Test cases for retrain simulator"""
    
    def setUp(self):
        self.simulator = RetrainSimulator()
    
    def test_process_feedback_corrective(self):
        """Test processing corrective feedback"""
        feedback = {
            'content_type': 'email',
            'user_verdict': 'malicious',
            'model_verdict': 'safe',
            'confidence': 0.8
        }
        
        result = self.simulator.process_feedback(feedback)
        
        self.assertIn('feedback_id', result)
        self.assertIn('is_corrective', result)
        self.assertTrue(result['is_corrective'])
    
    def test_process_feedback_confirming(self):
        """Test processing confirming feedback"""
        feedback = {
            'content_type': 'email',
            'user_verdict': 'safe',
            'model_verdict': 'safe',
            'confidence': 0.9
        }
        
        result = self.simulator.process_feedback(feedback)
        
        self.assertIn('feedback_id', result)
        self.assertIn('is_corrective', result)
        self.assertFalse(result['is_corrective'])
    
    def test_get_model_status(self):
        """Test getting model status"""
        status = self.simulator.get_model_status()
        
        self.assertIn('model_weights', status)
        self.assertIn('drift_metrics', status)
        self.assertIn('performance_metrics', status)
    
    def test_get_drift_report(self):
        """Test getting drift report"""
        report = self.simulator.get_drift_report()
        
        self.assertIn('timestamp', report)
        self.assertIn('overall_drift', report)
        self.assertIn('model_drifts', report)

class TestUtils(unittest.TestCase):
    """Test cases for utility functions"""
    
    def test_get_deterministic_hash(self):
        """Test deterministic hash function"""
        text = "test text"
        hash1 = get_deterministic_hash(text)
        hash2 = get_deterministic_hash(text)
        
        self.assertEqual(hash1, hash2)
        self.assertIsInstance(hash1, int)
    
    def test_calculate_confidence(self):
        """Test confidence calculation"""
        component_scores = {
            'text': 0.8,
            'visual': 0.6,
            'graph': 0.4,
            'adversarial': 0.2
        }
        
        confidence = calculate_confidence(component_scores)
        
        self.assertIsInstance(confidence, float)
        self.assertGreaterEqual(confidence, 0.0)
        self.assertLessEqual(confidence, 1.0)
    
    def test_determine_verdict(self):
        """Test verdict determination"""
        # Test safe verdict
        verdict = determine_verdict(0.2)
        self.assertEqual(verdict, 'safe')
        
        # Test suspicious verdict
        verdict = determine_verdict(0.5)
        self.assertEqual(verdict, 'suspicious')
        
        # Test malicious verdict
        verdict = determine_verdict(0.8)
        self.assertEqual(verdict, 'malicious')

class TestIntegration(unittest.TestCase):
    """Integration tests for the complete system"""
    
    def setUp(self):
        self.simulator = ModelSimulator()
        self.retrain_simulator = RetrainSimulator()
    
    def test_end_to_end_analysis(self):
        """Test complete end-to-end analysis"""
        # Test benign content
        benign_result = self.simulator.analyze_content(
            "Hello, this is a normal message.",
            'email'
        )
        
        self.assertIn('verdict', benign_result)
        self.assertEqual(benign_result['verdict'], 'safe')
        
        # Test phishing content
        phishing_result = self.simulator.analyze_content(
            "URGENT: Your account has been compromised! Click here: https://fake-bank.com",
            'email'
        )
        
        self.assertIn('verdict', phishing_result)
        self.assertIn(phishing_result['verdict'], ['suspicious', 'malicious'])
    
    def test_feedback_learning(self):
        """Test feedback learning system"""
        # Submit corrective feedback
        feedback = {
            'content_type': 'email',
            'user_verdict': 'malicious',
            'model_verdict': 'safe',
            'confidence': 0.8
        }
        
        result = self.retrain_simulator.process_feedback(feedback)
        
        self.assertIn('feedback_id', result)
        self.assertTrue(result['is_corrective'])
    
    def test_model_status_consistency(self):
        """Test that model status is consistent"""
        status1 = self.simulator.get_model_status()
        status2 = self.simulator.get_model_status()
        
        self.assertEqual(status1['model_weights'], status2['model_weights'])
        self.assertEqual(status1['thresholds'], status2['thresholds'])

def run_tests():
    """Run all tests"""
    print("🧪 Running Phishing Detection Module Tests")
    print("=" * 50)
    
    # Create test suite
    test_suite = unittest.TestSuite()
    
    # Add test cases
    test_classes = [
        TestTextDetector,
        TestVisualDetector,
        TestLinkGraphDetector,
        TestAdversarialDetector,
        TestModelSimulator,
        TestSandboxEmulator,
        TestRetrainSimulator,
        TestUtils,
        TestIntegration
    ]
    
    for test_class in test_classes:
        tests = unittest.TestLoader().loadTestsFromTestCase(test_class)
        test_suite.addTests(tests)
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"Tests run: {result.testsRun}")
    print(f"Failures: {len(result.failures)}")
    print(f"Errors: {len(result.errors)}")
    
    if result.failures:
        print("\nFailures:")
        for test, traceback in result.failures:
            print(f"  - {test}: {traceback}")
    
    if result.errors:
        print("\nErrors:")
        for test, traceback in result.errors:
            print(f"  - {test}: {traceback}")
    
    success = len(result.failures) == 0 and len(result.errors) == 0
    print(f"\n{'✅ All tests passed!' if success else '❌ Some tests failed!'}")
    
    return success

if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)

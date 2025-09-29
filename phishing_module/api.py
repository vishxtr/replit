# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Phishing Detection API

This module provides REST API endpoints for simulated phishing detection.
It can be integrated with existing web frameworks or run as a standalone service.

To integrate with real models:
1. Replace ModelSimulator with actual ML model calls
2. Update detector classes to use real transformers/CNNs/GNNs
3. Replace mock data with real threat intelligence feeds
4. Implement actual sandbox analysis instead of simulation
"""

from flask import Flask, request, jsonify, render_template_string, send_from_directory
import os
import json
import time
from typing import Dict, Any, Optional
from datetime import datetime

# Import our simulation modules
from detectors.model_simulator import ModelSimulator
from simulator.sandbox_emulator import SandboxEmulator
from simulator.retrain_simulator import RetrainSimulator
from utils import format_timestamp, load_mock_data

# Initialize Flask app
BASE_DIR = os.path.dirname(__file__)
UI_TEMPLATES_DIR = os.path.normpath(os.path.join(BASE_DIR, '..', 'phishing_ui', 'templates'))
UI_STATIC_DIR = os.path.normpath(os.path.join(BASE_DIR, '..', 'phishing_ui', 'static'))

app = Flask(__name__, static_folder=None)

# Initialize simulators
model_simulator = ModelSimulator()
sandbox_emulator = SandboxEmulator()
retrain_simulator = RetrainSimulator()

# Load mock data
mock_threat_feed = load_mock_data('mock_feeds.json') or load_mock_data('mock_threat_feed.json')

@app.route('/phishing_ui/static/<path:filename>')
def phishing_static(filename: str):
    """Serve phishing UI static assets (CSS/JS)."""
    return send_from_directory(UI_STATIC_DIR, filename)

@app.route('/phishing/analysis', methods=['POST'])
def analyze_content():
    """
    Analyze content for phishing indicators
    
    Request JSON:
    {
        "type": "email|sms|url|html",
        "content": "content to analyze",
        "metadata": {...},
        "url": "optional URL for web content"
    }
    
    Response JSON:
    {
        "verdict": "safe|suspicious|malicious",
        "confidence": 0.0-1.0,
        "component_scores": {...},
        "explainability": {...},
        "latency_ms": integer,
        "simulation_details": {...}
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        content_type = data.get('type', 'email')
        content = data.get('content', '')
        metadata = data.get('metadata', {})
        url = data.get('url')
        
        if not content:
            return jsonify({'error': 'No content provided'}), 400
        
        # Validate content type
        valid_types = ['email', 'sms', 'url', 'html']
        if content_type not in valid_types:
            return jsonify({'error': f'Invalid content type. Must be one of: {valid_types}'}), 400
        
        # Analyze content
        start_time = time.time()
        results = model_simulator.analyze_content(
            content=content,
            content_type=content_type,
            metadata=metadata,
            url=url
        )
        end_time = time.time()
        
        # Add API metadata
        results['api_version'] = '1.0.0'
        results['request_id'] = f"req_{int(time.time() * 1000)}"
        results['total_latency_ms'] = int((end_time - start_time) * 1000)
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/graph/<domain>', methods=['GET'])
def get_domain_graph(domain: str):
    """
    Get domain relationship graph
    
    Response JSON:
    {
        "score": 0.0-1.0,
        "cluster_score": 0.0-1.0,
        "graph": {"nodes": [...], "edges": [...]},
        "metrics": {...},
        "related_domains": [...]
    }
    """
    try:
        if not domain:
            return jsonify({'error': 'Domain parameter required'}), 400
        
        # Get URL parameter if provided
        url = request.args.get('url')
        
        # Analyze domain
        results = model_simulator.link_graph_detector.analyze_domain(domain, url)
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/feedback', methods=['POST'])
def submit_feedback():
    """
    Submit user feedback for model learning
    
    Request JSON:
    {
        "content_type": "email|sms|url|html",
        "user_verdict": "safe|suspicious|malicious",
        "model_verdict": "safe|suspicious|malicious",
        "confidence": 0.0-1.0,
        "content": "original content",
        "metadata": {...}
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Validate required fields
        required_fields = ['content_type', 'user_verdict', 'model_verdict', 'confidence']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Process feedback
        results = retrain_simulator.process_feedback(data)
        
        return jsonify({
            'status': 'success',
            'feedback_id': results.get('feedback_id'),
            'retrain_triggered': results.get('retrain_triggered', False),
            'retrain_result': results.get('retrain_result'),
            'timestamp': format_timestamp()
        })
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/sandbox', methods=['POST'])
def sandbox_analysis():
    """
    Perform sandbox analysis on URL
    
    Request JSON:
    {
        "url": "URL to analyze",
        "follow_redirects": true/false
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        url = data.get('url')
        follow_redirects = data.get('follow_redirects', True)
        
        if not url:
            return jsonify({'error': 'URL parameter required'}), 400
        
        # Analyze URL in sandbox
        results = sandbox_emulator.analyze_url(url, follow_redirects)
        
        return jsonify(results)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/threat-feed', methods=['GET'])
def get_threat_feed():
    """
    Get mock threat intelligence feed
    """
    try:
        return jsonify(mock_threat_feed)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/model-status', methods=['GET'])
def get_model_status():
    """
    Get current model status and metrics
    """
    try:
        status = {
            'model_simulator': model_simulator.get_model_status(),
            'retrain_simulator': retrain_simulator.get_model_status(),
            'timestamp': format_timestamp()
        }
        
        return jsonify(status)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/drift-report', methods=['GET'])
def get_drift_report():
    """
    Get model drift report
    """
    try:
        report = retrain_simulator.get_drift_report()
        return jsonify(report)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/test-cases', methods=['GET'])
def get_test_cases():
    """
    Get sample test cases for evaluation
    """
    try:
        test_cases = load_mock_data('sample_phishing_cases.json')
        return jsonify(test_cases)
        
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.route('/phishing/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': format_timestamp(),
        'version': '1.0.0',
        'simulation_mode': True
    })

@app.route('/phishing/dashboard', methods=['GET'])
def phishing_dashboard():
    """
    Serve the phishing detection dashboard
    """
    try:
        # Load the dashboard template
        template_path = os.path.join(UI_TEMPLATES_DIR, 'phishing_dashboard.html')
        with open(template_path, 'r') as f:
            template = f.read()
        
        return render_template_string(template)
        
    except FileNotFoundError:
        return jsonify({'error': 'Dashboard template not found'}), 404
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e),
            'timestamp': format_timestamp()
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting Phishing Detection API (SIMULATION MODE)")
    print("📊 Dashboard available at: http://localhost:5001/phishing/dashboard")
    print("🔍 API endpoints available at: http://localhost:5001/phishing/")
    print("⚠️  WARNING: This is a simulation - do not use in production!")
    
    app.run(host='0.0.0.0', port=5001, debug=True)

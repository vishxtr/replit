#!/usr/bin/env python3
"""
Unified server for SmartSOC IR
Serves static HTML files on port 5000 and proxies API calls to FastAPI backend
"""
import os
import subprocess
import time
from pathlib import Path
from flask import Flask, send_from_directory, request
import requests

app = Flask(__name__, static_folder='.')

# FastAPI backend process
backend_process = None
BACKEND_URL = "http://localhost:8000"

@app.route('/')
def index():
    """Serve landing.html as the default page"""
    return send_from_directory('.', 'landing.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    if os.path.exists(path):
        if path.endswith('.html'):
            return send_from_directory('.', path)
        elif path.startswith('assets/'):
            return send_from_directory('.', path)
        elif path.startswith('phishing_ui/'):
            return send_from_directory('.', path)
    return send_from_directory('.', path)

@app.route('/api/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_api(path):
    """Proxy API requests to FastAPI backend"""
    url = f"{BACKEND_URL}/api/{path}"
    
    try:
        if request.method == 'GET':
            resp = requests.get(url, params=request.args, timeout=10)
        elif request.method == 'POST':
            resp = requests.post(url, json=request.get_json(), timeout=10)
        elif request.method == 'PUT':
            resp = requests.put(url, json=request.get_json(), timeout=10)
        elif request.method == 'DELETE':
            resp = requests.delete(url, timeout=10)
        
        return resp.content, resp.status_code, {'Content-Type': resp.headers.get('Content-Type', 'application/json')}
    except Exception as e:
        return {'error': str(e)}, 500

def start_backend():
    """Start FastAPI backend on port 8000"""
    global backend_process
    backend_process = subprocess.Popen(
        ["uvicorn", "backend.server:app", "--host", "localhost", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    # Give backend time to start
    time.sleep(2)
    print("✓ Backend started on http://localhost:8000")

if __name__ == '__main__':
    print("Starting SmartSOC IR Server...")
    print("=" * 50)
    
    # Start FastAPI backend
    start_backend()
    
    # Start Flask frontend server
    print("✓ Frontend starting on http://0.0.0.0:5000")
    print("=" * 50)
    print("Dashboard available at: http://0.0.0.0:5000")
    print("Landing page: http://0.0.0.0:5000/landing.html")
    print("Analytics: http://0.0.0.0:5000/analytics.html")
    print("Main SOC: http://0.0.0.0:5000/index.html")
    print("=" * 50)
    
    try:
        app.run(host='0.0.0.0', port=5000, debug=False)
    finally:
        if backend_process:
            backend_process.terminate()
            print("\n✓ Backend stopped")

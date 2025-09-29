#!/usr/bin/env python3
"""
Phishing Detection Demo Runner

This script launches the phishing detection API and opens the dashboard
in the default web browser for demonstration purposes.

Usage:
    python run_phishing_demo.py

Requirements:
    - Python 3.7+
    - Flask and other dependencies from requirements-phishing.txt
"""

import sys
import os
import time
import webbrowser
import subprocess
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import numpy
        import pandas
        import requests
        print("✅ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please install requirements:")
        print("pip install -r phishing_module/requirements-phishing.txt")
        return False

def install_dependencies():
    """Install required dependencies"""
    print("📦 Installing dependencies...")
    try:
        requirements_file = Path(__file__).parent / "phishing_module" / "requirements-phishing.txt"
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", str(requirements_file)])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def start_api_server():
    """Start the phishing detection API server"""
    print("🚀 Starting Phishing Detection API...")
    
    # Change to the phishing module directory
    phishing_dir = Path(__file__).parent / "phishing_module"
    os.chdir(phishing_dir)
    
    # Import and run the API
    try:
        from api import app
        print("📊 Dashboard available at: http://localhost:5001/phishing/dashboard")
        print("🔍 API endpoints available at: http://localhost:5001/phishing/")
        print("⚠️  WARNING: This is a simulation - do not use in production!")
        print("\nPress Ctrl+C to stop the server")
        
        # Open browser after a short delay
        def open_browser():
            time.sleep(2)
            webbrowser.open('http://localhost:5001/phishing/dashboard')
        
        import threading
        browser_thread = threading.Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()
        
        # Start the Flask app
        app.run(host='0.0.0.0', port=5001, debug=False)
        
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Failed to start server: {e}")
        return False
    
    return True

def main():
    """Main demo runner function"""
    print("=" * 60)
    print("🛡️  PHISHING DETECTION DEMO - HACKATHON PROJECT")
    print("=" * 60)
    print("⚠️  SIMULATION ONLY - DO NOT USE IN PRODUCTION")
    print("=" * 60)
    
    # Check if we're in the right directory
    if not Path("phishing_module").exists():
        print("❌ Error: phishing_module directory not found")
        print("Please run this script from the project root directory")
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        print("\n🔧 Attempting to install dependencies...")
        if not install_dependencies():
            print("❌ Failed to install dependencies. Please install manually:")
            print("pip install -r phishing_module/requirements-phishing.txt")
            sys.exit(1)
    
    # Start the API server
    print("\n🚀 Starting demo...")
    start_api_server()

if __name__ == "__main__":
    main()

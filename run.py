#!/usr/bin/env python3
"""
PhishGuard AI - Universal Setup & Run Script
Automatically sets up and runs the project on any machine (Windows, Mac, Linux)
"""

import os
import sys
import subprocess
import platform
import shutil
from pathlib import Path

class Colors:
    """ANSI color codes for terminal output"""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

def print_header(text):
    """Print formatted header"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.HEADER}{text}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.END}\n")

def print_success(text):
    """Print success message"""
    print(f"{Colors.GREEN}✓ {text}{Colors.END}")

def print_error(text):
    """Print error message"""
    print(f"{Colors.RED}✗ {text}{Colors.END}")

def print_info(text):
    """Print info message"""
    print(f"{Colors.YELLOW}ℹ {text}{Colors.END}")

def check_command(command):
    """Check if a command exists in PATH"""
    return shutil.which(command) is not None

def run_command(command, cwd=None, shell=False):
    """Run a shell command and return success status"""
    try:
        result = subprocess.run(
            command,
            cwd=cwd,
            shell=shell,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def check_nodejs():
    """Check if Node.js is installed"""
    print_info("Checking for Node.js installation...")
    
    if check_command("node"):
        success, version = run_command(["node", "--version"])
        if success:
            print_success(f"Node.js is installed: {version.strip()}")
            return True
    
    print_error("Node.js is not installed!")
    print_info("Please install Node.js from: https://nodejs.org/")
    print_info("Recommended version: Node.js 18 or higher")
    return False

def check_npm():
    """Check if npm is installed"""
    print_info("Checking for npm installation...")
    
    if check_command("npm"):
        success, version = run_command(["npm", "--version"])
        if success:
            print_success(f"npm is installed: {version.strip()}")
            return True
    
    print_error("npm is not installed!")
    return False

def install_dependencies():
    """Install npm dependencies"""
    print_header("Installing Dependencies")
    
    frontend_dir = Path(__file__).parent / "frontend"
    
    if not frontend_dir.exists():
        print_error(f"Frontend directory not found: {frontend_dir}")
        return False
    
    package_json = frontend_dir / "package.json"
    if not package_json.exists():
        print_error(f"package.json not found in {frontend_dir}")
        return False
    
    node_modules = frontend_dir / "node_modules"
    if node_modules.exists():
        print_info("Dependencies already installed. Skipping installation...")
        return True
    
    print_info("Installing npm packages... This may take a few minutes.")
    success, output = run_command(["npm", "install"], cwd=frontend_dir)
    
    if success:
        print_success("Dependencies installed successfully!")
        return True
    else:
        print_error("Failed to install dependencies!")
        print(output)
        return False

def start_server():
    """Start the development server"""
    print_header("Starting PhishGuard AI")
    
    frontend_dir = Path(__file__).parent / "frontend"
    
    print_info("Starting Vite development server...")
    print_info("Server will be available at: http://localhost:5000")
    print_info("Press Ctrl+C to stop the server\n")
    
    try:
        # Run the dev server
        subprocess.run(
            ["npm", "run", "dev"],
            cwd=frontend_dir,
            check=True
        )
    except KeyboardInterrupt:
        print_info("\nServer stopped by user")
    except subprocess.CalledProcessError as e:
        print_error(f"Failed to start server: {e}")
        return False
    
    return True

def show_system_info():
    """Display system information"""
    print_header("System Information")
    print(f"OS: {platform.system()} {platform.release()}")
    print(f"Python: {sys.version.split()[0]}")
    print(f"Architecture: {platform.machine()}")

def main():
    """Main execution function"""
    print_header("🛡️  PhishGuard AI - Setup & Run")
    
    # Show system info
    show_system_info()
    
    # Check prerequisites
    print_header("Checking Prerequisites")
    
    if not check_nodejs():
        sys.exit(1)
    
    if not check_npm():
        sys.exit(1)
    
    print_success("All prerequisites are met!")
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Start the server
    if not start_server():
        sys.exit(1)

if __name__ == "__main__":
    main()

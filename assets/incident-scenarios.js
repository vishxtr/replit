/**
 * Interactive Incident Response Scenarios
 * Provides realistic incident response workflows for hackathon demonstration
 */

class IncidentResponseScenarios {
    constructor() {
        this.currentScenario = null;
        this.scenarios = [];
        this.responses = [];
        this.init();
    }

    init() {
        this.initializeScenarios();
        this.setupEventListeners();
    }

    initializeScenarios() {
        this.scenarios = [
            {
                id: 'phishing-attack',
                title: 'Phishing Attack Response',
                description: 'A sophisticated phishing campaign targeting employees with fake login pages',
                severity: 'High',
                steps: [
                    {
                        id: 1,
                        title: 'Initial Detection',
                        description: 'Email security system detected suspicious email patterns',
                        action: 'Analyze email headers and content',
                        options: [
                            { text: 'Quarantine all emails from sender', action: 'quarantine', result: 'Emails quarantined, preventing further spread' },
                            { text: 'Block sender domain', action: 'block_domain', result: 'Domain blocked at firewall level' },
                            { text: 'Investigate further', action: 'investigate', result: 'Additional analysis reveals more sophisticated attack' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'User Impact Assessment',
                        description: 'Determine how many users may have been affected',
                        action: 'Check user activity logs',
                        options: [
                            { text: 'Force password reset for all users', action: 'password_reset', result: 'All users required to reset passwords' },
                            { text: 'Check specific user accounts', action: 'check_accounts', result: 'Found 3 compromised accounts' },
                            { text: 'Enable 2FA for all users', action: 'enable_2fa', result: 'Two-factor authentication enabled' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'Containment',
                        description: 'Prevent further damage and isolate affected systems',
                        action: 'Implement containment measures',
                        options: [
                            { text: 'Isolate affected workstations', action: 'isolate', result: 'Affected systems isolated from network' },
                            { text: 'Block malicious URLs', action: 'block_urls', result: 'Malicious URLs blocked at DNS level' },
                            { text: 'Update security policies', action: 'update_policies', result: 'Security policies updated to prevent similar attacks' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'Recovery',
                        description: 'Restore normal operations and strengthen defenses',
                        action: 'Implement recovery measures',
                        options: [
                            { text: 'Deploy additional email filters', action: 'email_filters', result: 'Enhanced email filtering deployed' },
                            { text: 'Conduct security awareness training', action: 'training', result: 'Security training scheduled for all employees' },
                            { text: 'Update incident response procedures', action: 'update_procedures', result: 'Incident response procedures updated' }
                        ]
                    }
                ]
            },
            {
                id: 'ransomware-outbreak',
                title: 'Ransomware Outbreak',
                description: 'Ransomware detected on multiple systems with rapid spread',
                severity: 'Critical',
                steps: [
                    {
                        id: 1,
                        title: 'Initial Detection',
                        description: 'Ransomware detected on file server with encryption in progress',
                        action: 'Assess the scope of infection',
                        options: [
                            { text: 'Immediately disconnect infected systems', action: 'disconnect', result: 'Infected systems disconnected from network' },
                            { text: 'Check backup integrity', action: 'check_backups', result: 'Backups verified and accessible' },
                            { text: 'Alert all users', action: 'alert_users', result: 'All users notified of potential threat' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'Containment',
                        description: 'Prevent further spread of ransomware',
                        action: 'Implement containment measures',
                        options: [
                            { text: 'Isolate entire network segment', action: 'isolate_segment', result: 'Network segment isolated' },
                            { text: 'Disable file sharing services', action: 'disable_sharing', result: 'File sharing services disabled' },
                            { text: 'Block suspicious network traffic', action: 'block_traffic', result: 'Suspicious traffic blocked' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'Recovery',
                        description: 'Restore systems from clean backups',
                        action: 'Begin recovery process',
                        options: [
                            { text: 'Restore from clean backups', action: 'restore_backups', result: 'Systems restored from clean backups' },
                            { text: 'Deploy anti-ransomware tools', action: 'deploy_tools', result: 'Anti-ransomware tools deployed' },
                            { text: 'Update all security software', action: 'update_security', result: 'Security software updated' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'Post-Incident',
                        description: 'Strengthen defenses and prevent future attacks',
                        action: 'Implement preventive measures',
                        options: [
                            { text: 'Conduct security audit', action: 'security_audit', result: 'Comprehensive security audit completed' },
                            { text: 'Implement network segmentation', action: 'network_segmentation', result: 'Network segmentation implemented' },
                            { text: 'Enhance monitoring', action: 'enhance_monitoring', result: 'Enhanced monitoring systems deployed' }
                        ]
                    }
                ]
            },
            {
                id: 'insider-threat',
                title: 'Insider Threat Investigation',
                description: 'Suspicious activity detected from internal user account',
                severity: 'Medium',
                steps: [
                    {
                        id: 1,
                        title: 'Initial Detection',
                        description: 'Unusual data access patterns detected from employee account',
                        action: 'Investigate user activity',
                        options: [
                            { text: 'Review user access logs', action: 'review_logs', result: 'Found unauthorized access to sensitive data' },
                            { text: 'Check user permissions', action: 'check_permissions', result: 'User has excessive permissions' },
                            { text: 'Interview the user', action: 'interview_user', result: 'User claims account was compromised' }
                        ]
                    },
                    {
                        id: 2,
                        title: 'Investigation',
                        description: 'Determine the scope and nature of the threat',
                        action: 'Conduct thorough investigation',
                        options: [
                            { text: 'Analyze data exfiltration', action: 'analyze_exfiltration', result: 'Found evidence of data exfiltration' },
                            { text: 'Check for accomplices', action: 'check_accomplices', result: 'No evidence of accomplices found' },
                            { text: 'Review security cameras', action: 'review_cameras', result: 'User accessed system during off-hours' }
                        ]
                    },
                    {
                        id: 3,
                        title: 'Response',
                        description: 'Take appropriate action based on investigation',
                        action: 'Implement response measures',
                        options: [
                            { text: 'Suspend user account', action: 'suspend_account', result: 'User account suspended pending investigation' },
                            { text: 'Revoke access privileges', action: 'revoke_access', result: 'All access privileges revoked' },
                            { text: 'Notify legal team', action: 'notify_legal', result: 'Legal team notified of potential breach' }
                        ]
                    },
                    {
                        id: 4,
                        title: 'Prevention',
                        description: 'Implement measures to prevent future insider threats',
                        action: 'Strengthen internal controls',
                        options: [
                            { text: 'Implement user behavior analytics', action: 'behavior_analytics', result: 'User behavior analytics deployed' },
                            { text: 'Enhance access controls', action: 'enhance_access', result: 'Access controls enhanced with least privilege' },
                            { text: 'Conduct security training', action: 'security_training', result: 'Security awareness training conducted' }
                        ]
                    }
                ]
            }
        ];
    }

    setupEventListeners() {
        // Add event listeners for scenario controls
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-scenario')) {
                const scenarioId = e.target.dataset.scenario;
                this.startScenario(scenarioId);
            }
            
            if (e.target.classList.contains('scenario-option')) {
                const option = e.target.dataset.option;
                this.selectOption(option);
            }
        });
    }

    startScenario(scenarioId) {
        const scenario = this.scenarios.find(s => s.id === scenarioId);
        if (!scenario) return;

        this.currentScenario = { ...scenario, currentStep: 0 };
        this.showScenarioModal();
    }

    showScenarioModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.id = 'scenario-modal';
        
        const step = this.currentScenario.steps[this.currentScenario.currentStep];
        
        modal.innerHTML = `
            <div class="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold text-white">${this.currentScenario.title}</h3>
                    <button id="close-scenario" class="text-gray-400 hover:text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="mb-4">
                    <div class="flex items-center space-x-2 mb-2">
                        <span class="text-sm text-gray-400">Step ${step.id} of ${this.currentScenario.steps.length}</span>
                        <span class="text-xs px-2 py-1 rounded ${this.getSeverityBadge(this.currentScenario.severity)}">${this.currentScenario.severity}</span>
                    </div>
                    <h4 class="text-lg font-medium text-white mb-2">${step.title}</h4>
                    <p class="text-gray-300 mb-4">${step.description}</p>
                    <div class="bg-blue-900/30 border border-blue-500/30 rounded p-3 mb-4">
                        <p class="text-blue-300 text-sm"><strong>Action Required:</strong> ${step.action}</p>
                    </div>
                </div>
                
                <div class="space-y-2 mb-6">
                    <h5 class="text-white font-medium mb-2">Choose your response:</h5>
                    ${step.options.map((option, index) => `
                        <button class="scenario-option w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 hover:border-blue-500 transition-colors" 
                                data-option="${index}">
                            <div class="text-white font-medium">${option.text}</div>
                        </button>
                    `).join('')}
                </div>
                
                <div class="flex justify-between">
                    <div class="text-xs text-gray-400">
                        Progress: ${this.currentScenario.currentStep + 1}/${this.currentScenario.steps.length}
                    </div>
                    <div class="flex space-x-2">
                        <button id="scenario-back" class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                            <i class="fas fa-arrow-left mr-1"></i>Back
                        </button>
                        <button id="scenario-skip" class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm">
                            Skip Step
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('close-scenario').addEventListener('click', () => {
            this.closeScenario();
        });
        
        document.getElementById('scenario-back').addEventListener('click', () => {
            this.previousStep();
        });
        
        document.getElementById('scenario-skip').addEventListener('click', () => {
            this.nextStep();
        });
    }

    selectOption(optionIndex) {
        const step = this.currentScenario.steps[this.currentScenario.currentStep];
        const option = step.options[optionIndex];
        
        // Show result
        this.showOptionResult(option);
        
        // Record response
        this.responses.push({
            scenario: this.currentScenario.id,
            step: step.id,
            option: option.text,
            action: option.action,
            result: option.result
        });
        
        // Move to next step after delay
        setTimeout(() => {
            this.nextStep();
        }, 2000);
    }

    showOptionResult(option) {
        const modal = document.getElementById('scenario-modal');
        const resultDiv = document.createElement('div');
        resultDiv.className = 'fixed top-4 right-4 bg-green-600 text-white p-4 rounded shadow-lg z-50 max-w-sm';
        resultDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-check-circle"></i>
                <div>
                    <div class="font-medium">Action Taken</div>
                    <div class="text-sm">${option.result}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(resultDiv);
        
        setTimeout(() => {
            if (document.body.contains(resultDiv)) {
                document.body.removeChild(resultDiv);
            }
        }, 3000);
    }

    nextStep() {
        this.currentScenario.currentStep++;
        
        if (this.currentScenario.currentStep >= this.currentScenario.steps.length) {
            this.completeScenario();
        } else {
            this.updateScenarioModal();
        }
    }

    previousStep() {
        if (this.currentScenario.currentStep > 0) {
            this.currentScenario.currentStep--;
            this.updateScenarioModal();
        }
    }

    updateScenarioModal() {
        const modal = document.getElementById('scenario-modal');
        if (modal) {
            modal.remove();
            this.showScenarioModal();
        }
    }

    completeScenario() {
        const modal = document.getElementById('scenario-modal');
        if (modal) {
            modal.remove();
        }
        
        // Show completion modal
        const completionModal = document.createElement('div');
        completionModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        completionModal.innerHTML = `
            <div class="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-check text-white text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold text-white mb-2">Scenario Complete!</h3>
                    <p class="text-gray-300 mb-4">You have successfully completed the ${this.currentScenario.title} scenario.</p>
                    
                    <div class="bg-gray-700 rounded p-3 mb-4">
                        <h4 class="text-white font-medium mb-2">Your Actions:</h4>
                        <div class="text-sm text-gray-300 space-y-1">
                            ${this.responses.filter(r => r.scenario === this.currentScenario.id).map(r => 
                                `<div>• ${r.option}</div>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button id="scenario-restart" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            <i class="fas fa-redo mr-1"></i>Restart
                        </button>
                        <button id="scenario-close" class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(completionModal);
        
        document.getElementById('scenario-restart').addEventListener('click', () => {
            document.body.removeChild(completionModal);
            this.startScenario(this.currentScenario.id);
        });
        
        document.getElementById('scenario-close').addEventListener('click', () => {
            document.body.removeChild(completionModal);
            this.currentScenario = null;
        });
    }

    closeScenario() {
        const modal = document.getElementById('scenario-modal');
        if (modal) {
            modal.remove();
        }
        this.currentScenario = null;
    }

    getSeverityBadge(severity) {
        switch (severity) {
            case 'Critical': return 'bg-red-900/30 text-red-400';
            case 'High': return 'bg-orange-900/30 text-orange-400';
            case 'Medium': return 'bg-yellow-900/30 text-yellow-400';
            case 'Low': return 'bg-green-900/30 text-green-400';
            default: return 'bg-gray-900/30 text-gray-400';
        }
    }

    // Public methods
    getScenarios() {
        return this.scenarios;
    }

    getResponses() {
        return this.responses;
    }

    clearResponses() {
        this.responses = [];
    }
}

// Initialize global incident response scenarios
window.incidentScenarios = new IncidentResponseScenarios();


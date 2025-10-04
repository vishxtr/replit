/**
 * SmartSOC Live Threat Simulation Engine
 * Provides realistic threat simulation for hackathon demonstration
 */

class ThreatSimulator {
    constructor() {
        this.isRunning = false;
        this.threats = [];
        this.incidents = [];
        this.attackers = [];
        this.victims = [];
        this.intervalId = null;
        this.websocket = null;
        this.stats = {
            totalThreats: 0,
            blockedThreats: 0,
            activeIncidents: 0,
            resolvedIncidents: 0,
            avgResponseTime: 0
        };
        
        this.init();
    }

    init() {
        this.initializeAttackers();
        this.initializeVictims();
        this.setupWebSocket();
        this.startSimulation();
    }

    initializeAttackers() {
        this.attackers = [
            { id: 'APT1', name: 'APT-29 (Cozy Bear)', country: 'Russia', type: 'Nation State', sophistication: 'High' },
            { id: 'APT2', name: 'Lazarus Group', country: 'North Korea', type: 'Nation State', sophistication: 'High' },
            { id: 'APT3', name: 'FIN7', country: 'Unknown', type: 'Cybercrime', sophistication: 'Medium' },
            { id: 'APT4', name: 'Maze Ransomware', country: 'Unknown', type: 'Ransomware', sophistication: 'High' },
            { id: 'APT5', name: 'REvil', country: 'Unknown', type: 'Ransomware', sophistication: 'High' },
            { id: 'APT6', name: 'Emotet', country: 'Unknown', type: 'Botnet', sophistication: 'Medium' },
            { id: 'APT7', name: 'TrickBot', country: 'Unknown', type: 'Banking Trojan', sophistication: 'Medium' },
            { id: 'APT8', name: 'Ryuk', country: 'Unknown', type: 'Ransomware', sophistication: 'High' }
        ];
    }

    initializeVictims() {
        this.victims = [
            { id: 'V1', name: 'Web Server-01', ip: '192.168.1.10', type: 'Web Server', criticality: 'High' },
            { id: 'V2', name: 'Database-02', ip: '192.168.1.20', type: 'Database', criticality: 'Critical' },
            { id: 'V3', name: 'File Server-03', ip: '192.168.1.30', type: 'File Server', criticality: 'High' },
            { id: 'V4', name: 'Mail Server-04', ip: '192.168.1.40', type: 'Mail Server', criticality: 'Medium' },
            { id: 'V5', name: 'Workstation-05', ip: '192.168.1.50', type: 'Workstation', criticality: 'Low' },
            { id: 'V6', name: 'Workstation-06', ip: '192.168.1.51', type: 'Workstation', criticality: 'Low' },
            { id: 'V7', name: 'IoT Device-07', ip: '192.168.1.60', type: 'IoT Device', criticality: 'Medium' },
            { id: 'V8', name: 'Cloud Instance-08', ip: '10.0.0.10', type: 'Cloud Server', criticality: 'High' }
        ];
    }

    setupWebSocket() {
        // Simulate WebSocket connection for real-time updates
        this.websocket = {
            send: (data) => {
                console.log('WebSocket send:', data);
            },
            onmessage: (event) => {
                console.log('WebSocket message:', event.data);
            }
        };
    }

    startSimulation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        console.log('🚨 Threat simulation started');
        
        // Start different types of threat simulations
        this.startBruteForceSimulation();
        this.startMalwareSimulation();
        this.startPhishingSimulation();
        this.startInsiderThreatSimulation();
        this.startDDoSSimulation();
        this.startDataExfiltrationSimulation();
        
        // Update dashboard every 2 seconds
        this.intervalId = setInterval(() => {
            this.updateDashboard();
        }, 2000);
    }

    stopSimulation() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        console.log('🛑 Threat simulation stopped');
    }

    startBruteForceSimulation() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            const attacker = this.getRandomAttacker();
            const victim = this.getRandomVictim();
            const attempts = Math.floor(Math.random() * 50) + 10;
            
            const threat = {
                id: `BF-${Date.now()}`,
                type: 'Brute Force Attack',
                severity: attempts > 30 ? 'High' : 'Medium',
                attacker: attacker,
                victim: victim,
                attempts: attempts,
                timestamp: new Date(),
                status: 'Active',
                description: `Multiple failed login attempts detected from ${attacker.name} targeting ${victim.name}`,
                sourceIP: this.generateRandomIP(),
                destinationIP: victim.ip,
                port: 22,
                protocol: 'SSH'
            };
            
            this.addThreat(threat);
        }, Math.random() * 10000 + 5000); // Every 5-15 seconds
    }

    startMalwareSimulation() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            const attacker = this.getRandomAttacker();
            const victim = this.getRandomVictim();
            const malwareTypes = ['Trojan', 'Ransomware', 'Backdoor', 'Keylogger', 'Botnet'];
            const malwareType = malwareTypes[Math.floor(Math.random() * malwareTypes.length)];
            
            const threat = {
                id: `MW-${Date.now()}`,
                type: 'Malware Detection',
                severity: malwareType === 'Ransomware' ? 'Critical' : 'High',
                attacker: attacker,
                victim: victim,
                malwareType: malwareType,
                timestamp: new Date(),
                status: 'Active',
                description: `${malwareType} detected on ${victim.name}`,
                sourceIP: this.generateRandomIP(),
                destinationIP: victim.ip,
                hash: this.generateRandomHash(),
                signature: `Malware.${malwareType}.${Math.floor(Math.random() * 1000)}`
            };
            
            this.addThreat(threat);
        }, Math.random() * 15000 + 8000); // Every 8-23 seconds
    }

    startPhishingSimulation() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            const attacker = this.getRandomAttacker();
            const victim = this.getRandomVictim();
            const phishingTypes = ['Email', 'SMS', 'Voice', 'Social Media'];
            const phishingType = phishingTypes[Math.floor(Math.random() * phishingTypes.length)];
            
            const threat = {
                id: `PH-${Date.now()}`,
                type: 'Phishing Attempt',
                severity: 'Medium',
                attacker: attacker,
                victim: victim,
                phishingType: phishingType,
                timestamp: new Date(),
                status: 'Active',
                description: `${phishingType} phishing attempt targeting ${victim.name}`,
                sourceIP: this.generateRandomIP(),
                destinationIP: victim.ip,
                url: `https://fake-${Math.random().toString(36).substr(2, 9)}.com`,
                subject: 'Urgent: Verify Your Account'
            };
            
            this.addThreat(threat);
        }, Math.random() * 12000 + 6000); // Every 6-18 seconds
    }

    startInsiderThreatSimulation() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            const victim = this.getRandomVictim();
            const insiderActions = ['Privilege Escalation', 'Data Access', 'Unauthorized Download', 'Suspicious Login'];
            const action = insiderActions[Math.floor(Math.random() * insiderActions.length)];
            
            const threat = {
                id: `IT-${Date.now()}`,
                type: 'Insider Threat',
                severity: action === 'Data Access' ? 'High' : 'Medium',
                attacker: { id: 'INSIDER', name: 'Internal User', country: 'Internal', type: 'Insider', sophistication: 'Medium' },
                victim: victim,
                action: action,
                timestamp: new Date(),
                status: 'Active',
                description: `Suspicious ${action.toLowerCase()} activity detected`,
                sourceIP: victim.ip,
                destinationIP: victim.ip,
                user: `user${Math.floor(Math.random() * 100)}`,
                department: 'IT'
            };
            
            this.addThreat(threat);
        }, Math.random() * 20000 + 10000); // Every 10-30 seconds
    }

    startDDoSSimulation() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            const attacker = this.getRandomAttacker();
            const victim = this.getRandomVictim();
            const attackTypes = ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'DNS Amplification'];
            const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
            
            const threat = {
                id: `DD-${Date.now()}`,
                type: 'DDoS Attack',
                severity: 'High',
                attacker: attacker,
                victim: victim,
                attackType: attackType,
                timestamp: new Date(),
                status: 'Active',
                description: `${attackType} DDoS attack targeting ${victim.name}`,
                sourceIP: this.generateRandomIP(),
                destinationIP: victim.ip,
                packetsPerSecond: Math.floor(Math.random() * 10000) + 1000,
                bandwidth: Math.floor(Math.random() * 1000) + 100
            };
            
            this.addThreat(threat);
        }, Math.random() * 25000 + 15000); // Every 15-40 seconds
    }

    startDataExfiltrationSimulation() {
        setInterval(() => {
            if (!this.isRunning) return;
            
            const attacker = this.getRandomAttacker();
            const victim = this.getRandomVictim();
            const dataTypes = ['Customer Data', 'Financial Records', 'Intellectual Property', 'Personal Information'];
            const dataType = dataTypes[Math.floor(Math.random() * dataTypes.length)];
            
            const threat = {
                id: `DE-${Date.now()}`,
                type: 'Data Exfiltration',
                severity: 'Critical',
                attacker: attacker,
                victim: victim,
                dataType: dataType,
                timestamp: new Date(),
                status: 'Active',
                description: `Large data transfer detected - possible ${dataType.toLowerCase()} exfiltration`,
                sourceIP: victim.ip,
                destinationIP: this.generateRandomIP(),
                dataSize: Math.floor(Math.random() * 1000) + 100,
                protocol: 'HTTPS',
                port: 443
            };
            
            this.addThreat(threat);
        }, Math.random() * 30000 + 20000); // Every 20-50 seconds
    }

    addThreat(threat) {
        this.threats.unshift(threat);
        this.stats.totalThreats++;
        
        // Keep only last 100 threats
        if (this.threats.length > 100) {
            this.threats = this.threats.slice(0, 100);
        }
        
        // Create incident for high severity threats
        if (threat.severity === 'Critical' || threat.severity === 'High') {
            this.createIncident(threat);
        }
        
        // Update UI
        this.updateThreatFeed(threat);
        this.updateThreatMap(threat);
        this.updateCharts(threat);
        
        // Simulate automated response
        this.simulateAutomatedResponse(threat);
    }

    createIncident(threat) {
        const incident = {
            id: `INC-${Date.now()}`,
            threatId: threat.id,
            title: `${threat.type} - ${threat.victim.name}`,
            severity: threat.severity,
            status: 'Open',
            assignedTo: 'Security Team',
            createdAt: new Date(),
            updatedAt: new Date(),
            description: threat.description,
            steps: this.generateIncidentSteps(threat),
            timeline: [{
                timestamp: new Date(),
                action: 'Incident Created',
                user: 'System',
                details: 'Automated incident creation'
            }]
        };
        
        this.incidents.unshift(incident);
        this.stats.activeIncidents++;
        
        // Keep only last 50 incidents
        if (this.incidents.length > 50) {
            this.incidents = this.incidents.slice(0, 50);
        }
        
        this.updateIncidentList(incident);
    }

    generateIncidentSteps(threat) {
        const steps = [
            { id: 1, title: 'Initial Assessment', status: 'Completed', time: '0m' },
            { id: 2, title: 'Threat Analysis', status: 'In Progress', time: '2m' },
            { id: 3, title: 'Containment', status: 'Pending', time: '5m' },
            { id: 4, title: 'Eradication', status: 'Pending', time: '10m' },
            { id: 5, title: 'Recovery', status: 'Pending', time: '15m' },
            { id: 6, title: 'Lessons Learned', status: 'Pending', time: '20m' }
        ];
        
        return steps;
    }

    simulateAutomatedResponse(threat) {
        setTimeout(() => {
            // Simulate automated blocking
            if (threat.type === 'Brute Force Attack' && threat.attempts > 20) {
                this.blockIP(threat.sourceIP);
                this.updateThreatStatus(threat.id, 'Blocked');
                this.stats.blockedThreats++;
            }
            
            // Simulate malware quarantine
            if (threat.type === 'Malware Detection') {
                this.quarantineSystem(threat.victim.id);
                this.updateThreatStatus(threat.id, 'Contained');
            }
            
            // Simulate DDoS mitigation
            if (threat.type === 'DDoS Attack') {
                this.enableDDoSMitigation(threat.victim.id);
                this.updateThreatStatus(threat.id, 'Mitigated');
            }
        }, Math.random() * 5000 + 2000); // 2-7 seconds delay
    }

    blockIP(ip) {
        console.log(`🚫 Blocking IP: ${ip}`);
        // Simulate IP blocking
    }

    quarantineSystem(systemId) {
        console.log(`🔒 Quarantining system: ${systemId}`);
        // Simulate system quarantine
    }

    enableDDoSMitigation(systemId) {
        console.log(`🛡️ Enabling DDoS mitigation for: ${systemId}`);
        // Simulate DDoS mitigation
    }

    updateThreatStatus(threatId, status) {
        const threat = this.threats.find(t => t.id === threatId);
        if (threat) {
            threat.status = status;
            threat.resolvedAt = new Date();
        }
    }

    updateDashboard() {
        // Update threat statistics
        this.updateThreatStats();
        
        // Update system health
        this.updateSystemHealth();
        
        // Update performance metrics
        this.updatePerformanceMetrics();
    }

    updateThreatStats() {
        const statsElement = document.getElementById('threat-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                        <div class="text-red-400 text-sm font-medium">Active Threats</div>
                        <div class="text-2xl font-bold text-white">${this.threats.filter(t => t.status === 'Active').length}</div>
                    </div>
                    <div class="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                        <div class="text-green-400 text-sm font-medium">Blocked</div>
                        <div class="text-2xl font-bold text-white">${this.stats.blockedThreats}</div>
                    </div>
                    <div class="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
                        <div class="text-yellow-400 text-sm font-medium">Incidents</div>
                        <div class="text-2xl font-bold text-white">${this.stats.activeIncidents}</div>
                    </div>
                    <div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                        <div class="text-blue-400 text-sm font-medium">Response Time</div>
                        <div class="text-2xl font-bold text-white">${Math.floor(Math.random() * 5) + 2}s</div>
                    </div>
                </div>
            `;
        }
    }

    updateSystemHealth() {
        const healthElement = document.getElementById('system-health');
        if (healthElement) {
            const cpu = Math.floor(Math.random() * 30) + 40;
            const memory = Math.floor(Math.random() * 20) + 60;
            const network = Math.floor(Math.random() * 40) + 30;
            const storage = Math.floor(Math.random() * 15) + 45;
            
            healthElement.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-300">CPU Usage</span>
                        <span class="text-sm text-white">${cpu}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${cpu}%"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-300">Memory Usage</span>
                        <span class="text-sm text-white">${memory}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: ${memory}%"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-300">Network I/O</span>
                        <span class="text-sm text-white">${network}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full" style="width: ${network}%"></div>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-300">Storage</span>
                        <span class="text-sm text-white">${storage}%</span>
                    </div>
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-purple-500 h-2 rounded-full" style="width: ${storage}%"></div>
                    </div>
                </div>
            `;
        }
    }

    updatePerformanceMetrics() {
        const metricsElement = document.getElementById('performance-metrics');
        if (metricsElement) {
            const responseTime = Math.floor(Math.random() * 100) + 50;
            const throughput = Math.floor(Math.random() * 1000) + 500;
            const errorRate = Math.random() * 2;
            const availability = 99.9 + Math.random() * 0.1;
            
            metricsElement.innerHTML = `
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-white">${responseTime}ms</div>
                        <div class="text-xs text-gray-400">Avg Response Time</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-white">${throughput}</div>
                        <div class="text-xs text-gray-400">Requests/sec</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-white">${errorRate.toFixed(2)}%</div>
                        <div class="text-xs text-gray-400">Error Rate</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-white">${availability.toFixed(2)}%</div>
                        <div class="text-xs text-gray-400">Uptime</div>
                    </div>
                </div>
            `;
        }
    }

    updateThreatFeed(threat) {
        const feedElement = document.getElementById('threat-feed');
        if (feedElement) {
            const threatElement = document.createElement('div');
            threatElement.className = `p-3 border-l-4 ${this.getSeverityColor(threat.severity)} bg-gray-800/50 mb-2 rounded-r-lg`;
            threatElement.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fas ${this.getThreatIcon(threat.type)} text-sm"></i>
                        <span class="text-sm font-medium text-white">${threat.type}</span>
                        <span class="text-xs px-2 py-1 rounded ${this.getSeverityBadge(threat.severity)}">${threat.severity}</span>
                    </div>
                    <span class="text-xs text-gray-400">${threat.timestamp.toLocaleTimeString()}</span>
                </div>
                <div class="text-sm text-gray-300 mt-1">${threat.description}</div>
                <div class="text-xs text-gray-400 mt-1">
                    ${threat.sourceIP} → ${threat.destinationIP}
                </div>
            `;
            
            feedElement.insertBefore(threatElement, feedElement.firstChild);
            
            // Keep only last 20 threats in feed
            const threats = feedElement.children;
            if (threats.length > 20) {
                feedElement.removeChild(threats[threats.length - 1]);
            }
        }
    }

    updateThreatMap(threat) {
        // Update geographic threat map
        if (window.threatMap) {
            window.threatMap.addThreat(threat);
        }
    }

    updateCharts(threat) {
        // Update various charts with new threat data
        this.updateThreatTypeChart(threat);
        this.updateSeverityChart(threat);
        this.updateTimelineChart(threat);
    }

    updateThreatTypeChart(threat) {
        // Update threat type distribution chart
        console.log(`📊 Updating threat type chart: ${threat.type}`);
    }

    updateSeverityChart(threat) {
        // Update severity distribution chart
        console.log(`📊 Updating severity chart: ${threat.severity}`);
    }

    updateTimelineChart(threat) {
        // Update threat timeline chart
        console.log(`📊 Updating timeline chart: ${threat.timestamp}`);
    }

    updateIncidentList(incident) {
        const incidentsElement = document.getElementById('incidents-list');
        if (incidentsElement) {
            const incidentElement = document.createElement('div');
            incidentElement.className = `p-4 border border-gray-700 rounded-lg mb-3 bg-gray-800/50`;
            incidentElement.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-white">${incident.title}</span>
                        <span class="text-xs px-2 py-1 rounded ${this.getSeverityBadge(incident.severity)}">${incident.severity}</span>
                    </div>
                    <span class="text-xs text-gray-400">${incident.createdAt.toLocaleTimeString()}</span>
                </div>
                <div class="text-sm text-gray-300 mb-2">${incident.description}</div>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-400">Assigned to: ${incident.assignedTo}</span>
                    <span class="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-400">${incident.status}</span>
                </div>
            `;
            
            incidentsElement.insertBefore(incidentElement, incidentsElement.firstChild);
            
            // Keep only last 10 incidents
            const incidents = incidentsElement.children;
            if (incidents.length > 10) {
                incidentsElement.removeChild(incidents[incidents.length - 1]);
            }
        }
    }

    getRandomAttacker() {
        return this.attackers[Math.floor(Math.random() * this.attackers.length)];
    }

    getRandomVictim() {
        return this.victims[Math.floor(Math.random() * this.victims.length)];
    }

    generateRandomIP() {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }

    generateRandomHash() {
        return Math.random().toString(36).substr(2, 16);
    }

    getSeverityColor(severity) {
        switch (severity) {
            case 'Critical': return 'border-red-500';
            case 'High': return 'border-orange-500';
            case 'Medium': return 'border-yellow-500';
            case 'Low': return 'border-green-500';
            default: return 'border-gray-500';
        }
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

    getThreatIcon(type) {
        switch (type) {
            case 'Brute Force Attack': return 'fa-hammer';
            case 'Malware Detection': return 'fa-virus';
            case 'Phishing Attempt': return 'fa-fish';
            case 'Insider Threat': return 'fa-user-secret';
            case 'DDoS Attack': return 'fa-bomb';
            case 'Data Exfiltration': return 'fa-download';
            default: return 'fa-exclamation-triangle';
        }
    }

    // Public methods for external control
    start() {
        this.startSimulation();
    }

    stop() {
        this.stopSimulation();
    }

    getStats() {
        return this.stats;
    }

    getThreats() {
        return this.threats;
    }

    getIncidents() {
        return this.incidents;
    }
}

// Initialize global threat simulator
window.threatSimulator = new ThreatSimulator();

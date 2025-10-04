/**
 * Dynamic Threat Map Visualization
 * Provides interactive geographic threat mapping for hackathon demonstration
 */

class ThreatMap {
    constructor() {
        this.threats = [];
        this.countries = new Map();
        this.attackVectors = new Map();
        this.init();
    }

    init() {
        this.initializeCountryData();
        this.initializeAttackVectors();
        this.setupMap();
    }

    initializeCountryData() {
        this.countries = new Map([
            ['Russia', { name: 'Russia', code: 'RU', threats: 0, severity: 'High', color: '#ef4444' }],
            ['China', { name: 'China', code: 'CN', threats: 0, severity: 'High', color: '#f97316' }],
            ['North Korea', { name: 'North Korea', code: 'KP', threats: 0, severity: 'Medium', color: '#eab308' }],
            ['Iran', { name: 'Iran', code: 'IR', threats: 0, severity: 'Medium', color: '#eab308' }],
            ['United States', { name: 'United States', code: 'US', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Germany', { name: 'Germany', code: 'DE', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['United Kingdom', { name: 'United Kingdom', code: 'GB', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['France', { name: 'France', code: 'FR', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Japan', { name: 'Japan', code: 'JP', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Brazil', { name: 'Brazil', code: 'BR', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['India', { name: 'India', code: 'IN', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Australia', { name: 'Australia', code: 'AU', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Canada', { name: 'Canada', code: 'CA', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['South Korea', { name: 'South Korea', code: 'KR', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Italy', { name: 'Italy', code: 'IT', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Spain', { name: 'Spain', code: 'ES', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Netherlands', { name: 'Netherlands', code: 'NL', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Sweden', { name: 'Sweden', code: 'SE', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Norway', { name: 'Norway', code: 'NO', threats: 0, severity: 'Low', color: '#22c55e' }],
            ['Finland', { name: 'Finland', code: 'FI', threats: 0, severity: 'Low', color: '#22c55e' }]
        ]);
    }

    initializeAttackVectors() {
        this.attackVectors = new Map([
            ['Phishing', { name: 'Phishing', count: 0, percentage: 0, color: '#ef4444' }],
            ['Malware', { name: 'Malware', count: 0, percentage: 0, color: '#f97316' }],
            ['DDoS', { name: 'DDoS', count: 0, percentage: 0, color: '#eab308' }],
            ['Brute Force', { name: 'Brute Force', count: 0, percentage: 0, color: '#8b5cf6' }],
            ['Insider Threat', { name: 'Insider Threat', count: 0, percentage: 0, color: '#06b6d4' }],
            ['Data Exfiltration', { name: 'Data Exfiltration', count: 0, percentage: 0, color: '#10b981' }]
        ]);
    }

    setupMap() {
        // Create the threat map container
        this.createMapContainer();
        this.updateMap();
    }

    createMapContainer() {
        const mapContainer = document.getElementById('threat-map');
        if (!mapContainer) return;

        mapContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-800 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-white mb-3">Threat Origins</h3>
                    <div id="threat-origins" class="space-y-2">
                        <!-- Threat origins will be populated here -->
                    </div>
                </div>
                
                <div class="bg-gray-800 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-white mb-3">Attack Vectors</h3>
                    <div id="attack-vectors" class="space-y-2">
                        <!-- Attack vectors will be populated here -->
                    </div>
                </div>
            </div>
            
            <div class="mt-6 bg-gray-800 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-white mb-3">Live Threat Activity</h3>
                <div id="threat-activity" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Live threat activity will be populated here -->
                </div>
            </div>
        `;
    }

    addThreat(threat) {
        this.threats.push(threat);
        
        // Update country data
        if (this.countries.has(threat.attacker.country)) {
            const country = this.countries.get(threat.attacker.country);
            country.threats++;
            this.countries.set(threat.attacker.country, country);
        }
        
        // Update attack vector data
        const vectorName = this.getAttackVectorName(threat.type);
        if (this.attackVectors.has(vectorName)) {
            const vector = this.attackVectors.get(vectorName);
            vector.count++;
            this.attackVectors.set(vectorName, vector);
        }
        
        this.updateMap();
        this.updateThreatActivity(threat);
    }

    getAttackVectorName(threatType) {
        switch (threatType) {
            case 'Brute Force Attack': return 'Brute Force';
            case 'Malware Detection': return 'Malware';
            case 'Phishing Attempt': return 'Phishing';
            case 'DDoS Attack': return 'DDoS';
            case 'Insider Threat': return 'Insider Threat';
            case 'Data Exfiltration': return 'Data Exfiltration';
            default: return 'Other';
        }
    }

    updateMap() {
        this.updateThreatOrigins();
        this.updateAttackVectors();
    }

    updateThreatOrigins() {
        const container = document.getElementById('threat-origins');
        if (!container) return;

        // Sort countries by threat count
        const sortedCountries = Array.from(this.countries.values())
            .sort((a, b) => b.threats - a.threats)
            .slice(0, 8); // Show top 8

        container.innerHTML = sortedCountries.map(country => {
            const percentage = this.threats.length > 0 ? (country.threats / this.threats.length) * 100 : 0;
            return `
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full" style="background-color: ${country.color}"></div>
                        <span class="text-sm text-gray-300">${country.name}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-20 bg-gray-700 rounded-full h-2">
                            <div class="h-2 rounded-full" style="width: ${percentage}%; background-color: ${country.color}"></div>
                        </div>
                        <span class="text-sm text-white font-medium">${country.threats}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateAttackVectors() {
        const container = document.getElementById('attack-vectors');
        if (!container) return;

        // Calculate percentages
        const totalThreats = this.threats.length;
        this.attackVectors.forEach(vector => {
            vector.percentage = totalThreats > 0 ? (vector.count / totalThreats) * 100 : 0;
        });

        // Sort by count
        const sortedVectors = Array.from(this.attackVectors.values())
            .sort((a, b) => b.count - a.count);

        container.innerHTML = sortedVectors.map(vector => `
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 rounded-full" style="background-color: ${vector.color}"></div>
                    <span class="text-sm text-gray-300">${vector.name}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-20 bg-gray-700 rounded-full h-2">
                        <div class="h-2 rounded-full" style="width: ${vector.percentage}%; background-color: ${vector.color}"></div>
                    </div>
                    <span class="text-sm text-white font-medium">${vector.count}</span>
                </div>
            </div>
        `).join('');
    }

    updateThreatActivity(threat) {
        const container = document.getElementById('threat-activity');
        if (!container) return;

        // Get recent threats (last 10)
        const recentThreats = this.threats.slice(-10).reverse();

        container.innerHTML = `
            <div class="bg-gray-700 rounded p-3">
                <h4 class="text-white font-medium mb-2">Recent Threats</h4>
                <div class="space-y-1 max-h-32 overflow-y-auto">
                    ${recentThreats.slice(0, 5).map(t => `
                        <div class="text-xs text-gray-300 flex items-center space-x-2">
                            <div class="w-2 h-2 rounded-full ${this.getSeverityColor(t.severity)}"></div>
                            <span>${t.type}</span>
                            <span class="text-gray-500">${t.attacker.country}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-gray-700 rounded p-3">
                <h4 class="text-white font-medium mb-2">Top Countries</h4>
                <div class="space-y-1">
                    ${Array.from(this.countries.values())
                        .sort((a, b) => b.threats - a.threats)
                        .slice(0, 3)
                        .map(c => `
                            <div class="text-xs text-gray-300 flex items-center justify-between">
                                <span>${c.name}</span>
                                <span class="text-white font-medium">${c.threats}</span>
                            </div>
                        `).join('')}
                </div>
            </div>
            
            <div class="bg-gray-700 rounded p-3">
                <h4 class="text-white font-medium mb-2">Attack Types</h4>
                <div class="space-y-1">
                    ${Array.from(this.attackVectors.values())
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 3)
                        .map(v => `
                            <div class="text-xs text-gray-300 flex items-center justify-between">
                                <span>${v.name}</span>
                                <span class="text-white font-medium">${v.count}</span>
                            </div>
                        `).join('')}
                </div>
            </div>
        `;
    }

    getSeverityColor(severity) {
        switch (severity) {
            case 'Critical': return 'bg-red-500';
            case 'High': return 'bg-orange-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    }

    // Public methods
    getThreats() {
        return this.threats;
    }

    getCountryData() {
        return this.countries;
    }

    getAttackVectorData() {
        return this.attackVectors;
    }

    clearData() {
        this.threats = [];
        this.countries.forEach(country => {
            country.threats = 0;
        });
        this.attackVectors.forEach(vector => {
            vector.count = 0;
            vector.percentage = 0;
        });
        this.updateMap();
    }
}

// Initialize global threat map
window.threatMap = new ThreatMap();


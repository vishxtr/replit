// Global Button Functionality for SmartSOC Project
// This file provides interactive functionality for all buttons across the project

class SmartSOCButtons {
    constructor() {
        this.init();
    }

    init() {
        this.setupIncidentFilters();
        this.setupActionButtons();
        this.setupNavigationButtons();
        this.setupModalButtons();
        this.setupStatusButtons();
        this.setupChartButtons();
        this.setupExportButtons();
        this.setupRefreshButtons();
        this.setupNotificationButtons();
    }

    // Incident Filter Buttons (High, Medium, Low, All)
    setupIncidentFilters() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.filterIncidents(filter);
                this.updateFilterButtons(button);
            });
        });
    }

    filterIncidents(filter) {
        const incidents = document.querySelectorAll('.incident-item');
        incidents.forEach(incident => {
            const severity = incident.getAttribute('data-severity') || 'all';
            if (filter === 'all' || severity === filter) {
                incident.style.display = 'block';
                incident.classList.add('animate-fadeIn');
            } else {
                incident.style.display = 'none';
            }
        });
        
        // Update incident count
        this.updateIncidentCount(filter);
    }

    updateFilterButtons(activeButton) {
        const allButtons = document.querySelectorAll('[data-filter]');
        allButtons.forEach(btn => {
            btn.classList.remove('bg-blue-600', 'ring-2', 'ring-blue-300');
            btn.classList.add('bg-gray-600');
        });
        activeButton.classList.remove('bg-gray-600');
        activeButton.classList.add('bg-blue-600', 'ring-2', 'ring-blue-300');
    }

    updateIncidentCount(filter) {
        const countElement = document.getElementById('incident-count');
        if (countElement) {
            const visibleIncidents = document.querySelectorAll('.incident-item[style*="block"], .incident-item:not([style*="none"])');
            countElement.textContent = visibleIncidents.length;
        }
    }

    // Action Buttons (View, Edit, Delete, Assign, etc.)
    setupActionButtons() {
        // View Details Buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="view-details"]')) {
                this.viewIncidentDetails(e.target);
            }
            if (e.target.matches('[data-action="edit"]')) {
                this.editIncident(e.target);
            }
            if (e.target.matches('[data-action="delete"]')) {
                this.deleteIncident(e.target);
            }
            if (e.target.matches('[data-action="assign"]')) {
                this.assignIncident(e.target);
            }
            if (e.target.matches('[data-action="resolve"]')) {
                this.resolveIncident(e.target);
            }
            if (e.target.matches('[data-action="escalate"]')) {
                this.escalateIncident(e.target);
            }
        });
    }

    viewIncidentDetails(button) {
        const incidentId = button.getAttribute('data-incident-id');
        const detailsPanel = document.getElementById('incident-details');
        
        if (detailsPanel) {
            // Show loading state
            detailsPanel.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div><p class="mt-2 text-gray-400">Loading details...</p></div>';
            
            // Simulate API call
            setTimeout(() => {
                this.loadIncidentDetails(incidentId, detailsPanel);
            }, 500);
        }
        
        this.showNotification('Loading incident details...', 'info');
    }

    loadIncidentDetails(incidentId, panel) {
        const mockDetails = {
            'incident-1': {
                title: 'Brute Force Attack - Cloud Instance-08',
                severity: 'High',
                status: 'Open',
                description: 'Multiple failed login attempts detected from APT-29 (Cozy Bear) targeting Cloud Instance-08',
                timestamp: '5:01:48 am',
                assigned: 'Security Team',
                source: '192.168.1.100',
                target: 'Cloud Instance-08',
                iocs: ['81.2.69.142', 'malware-distro.ru'],
                ttps: ['T1110 - Brute Force', 'T1078 - Valid Accounts'],
                timeline: [
                    { time: '5:01:48', event: 'Attack detected', type: 'alert' },
                    { time: '5:01:50', event: 'Automated response triggered', type: 'action' },
                    { time: '5:02:15', event: 'Security team notified', type: 'notification' }
                ]
            }
        };

        const details = mockDetails[incidentId] || {
            title: 'Incident Details',
            severity: 'Unknown',
            status: 'Unknown',
            description: 'No details available for this incident.',
            timestamp: 'N/A',
            assigned: 'N/A'
        };

        panel.innerHTML = `
            <div class="space-y-4">
                <div class="flex justify-between items-start">
                    <h3 class="text-lg font-semibold text-white">${details.title}</h3>
                    <span class="px-2 py-1 bg-red-600 text-white text-xs rounded">${details.severity}</span>
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-400">Status:</span>
                        <span class="text-white ml-2">${details.status}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Time:</span>
                        <span class="text-white ml-2">${details.timestamp}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Assigned:</span>
                        <span class="text-white ml-2">${details.assigned}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Source:</span>
                        <span class="text-white ml-2">${details.source || 'N/A'}</span>
                    </div>
                </div>
                <div>
                    <h4 class="text-sm font-medium text-gray-300 mb-2">Description</h4>
                    <p class="text-sm text-gray-400">${details.description}</p>
                </div>
                ${details.iocs ? `
                <div>
                    <h4 class="text-sm font-medium text-gray-300 mb-2">IOCs</h4>
                    <div class="flex flex-wrap gap-2">
                        ${details.iocs.map(ioc => `<span class="px-2 py-1 bg-gray-800 text-xs rounded">${ioc}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                ${details.timeline ? `
                <div>
                    <h4 class="text-sm font-medium text-gray-300 mb-2">Timeline</h4>
                    <div class="space-y-2">
                        ${details.timeline.map(event => `
                            <div class="flex items-center space-x-2 text-xs">
                                <span class="text-gray-500">${event.time}</span>
                                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <span class="text-gray-300">${event.event}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    editIncident(button) {
        const incidentId = button.getAttribute('data-incident-id');
        this.showNotification(`Opening edit form for incident ${incidentId}`, 'info');
        // Implement edit modal/form
    }

    deleteIncident(button) {
        const incidentId = button.getAttribute('data-incident-id');
        if (confirm(`Are you sure you want to delete incident ${incidentId}?`)) {
            this.showNotification(`Incident ${incidentId} deleted`, 'success');
            button.closest('.incident-item')?.remove();
        }
    }

    assignIncident(button) {
        const incidentId = button.getAttribute('data-incident-id');
        this.showNotification(`Assigning incident ${incidentId} to team member`, 'info');
        // Implement assignment logic
    }

    resolveIncident(button) {
        const incidentId = button.getAttribute('data-incident-id');
        this.showNotification(`Resolving incident ${incidentId}`, 'success');
        button.closest('.incident-item')?.classList.add('resolved');
        // Update status in UI
    }

    escalateIncident(button) {
        const incidentId = button.getAttribute('data-incident-id');
        this.showNotification(`Escalating incident ${incidentId} to management`, 'warning');
        // Implement escalation logic
    }

    // Navigation Buttons
    setupNavigationButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                const page = e.target.getAttribute('data-nav');
                this.navigateToPage(page);
            }
        });
    }

    navigateToPage(page) {
        this.showNotification(`Navigating to ${page}...`, 'info');
        // Add smooth transition effect
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            window.location.href = page;
        }, 200);
    }

    // Modal Buttons
    setupModalButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-modal-open]')) {
                const modalId = e.target.getAttribute('data-modal-open');
                this.openModal(modalId);
            }
            if (e.target.matches('[data-modal-close]')) {
                this.closeModal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    }

    closeModal() {
        const modals = document.querySelectorAll('[id$="-modal"]');
        modals.forEach(modal => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
        document.body.classList.remove('overflow-hidden');
    }

    // Status Buttons
    setupStatusButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-status-toggle]')) {
                this.toggleStatus(e.target);
            }
        });
    }

    toggleStatus(button) {
        const currentStatus = button.getAttribute('data-current-status');
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        
        button.setAttribute('data-current-status', newStatus);
        button.textContent = newStatus === 'active' ? 'Deactivate' : 'Activate';
        button.classList.toggle('bg-green-600', newStatus === 'active');
        button.classList.toggle('bg-red-600', newStatus === 'inactive');
        
        this.showNotification(`Status changed to ${newStatus}`, 'success');
    }

    // Chart Buttons
    setupChartButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-chart-action]')) {
                const action = e.target.getAttribute('data-chart-action');
                this.handleChartAction(action);
            }
        });
    }

    handleChartAction(action) {
        switch(action) {
            case 'refresh':
                this.refreshCharts();
                break;
            case 'export':
                this.exportChart();
                break;
            case 'fullscreen':
                this.toggleChartFullscreen();
                break;
        }
    }

    refreshCharts() {
        this.showNotification('Refreshing charts...', 'info');
        // Trigger chart refresh
        window.dispatchEvent(new CustomEvent('refreshCharts'));
    }

    exportChart() {
        this.showNotification('Exporting chart data...', 'info');
        // Implement chart export
    }

    toggleChartFullscreen() {
        this.showNotification('Toggling chart fullscreen...', 'info');
        // Implement fullscreen toggle
    }

    // Export Buttons
    setupExportButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-export]')) {
                const format = e.target.getAttribute('data-export');
                this.exportData(format);
            }
        });
    }

    exportData(format) {
        this.showNotification(`Exporting data as ${format.toUpperCase()}...`, 'info');
        
        // Simulate export process
        setTimeout(() => {
            this.showNotification(`Data exported successfully as ${format.toUpperCase()}`, 'success');
        }, 1500);
    }

    // Refresh Buttons
    setupRefreshButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-refresh]')) {
                this.refreshData();
            }
        });
    }

    refreshData() {
        this.showNotification('Refreshing data...', 'info');
        
        // Add loading animation
        const refreshButtons = document.querySelectorAll('[data-refresh]');
        refreshButtons.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            btn.disabled = true;
        });
        
        setTimeout(() => {
            refreshButtons.forEach(btn => {
                btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
                btn.disabled = false;
            });
            this.showNotification('Data refreshed successfully', 'success');
        }, 2000);
    }

    // Notification Buttons
    setupNotificationButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-notification]')) {
                const type = e.target.getAttribute('data-notification');
                this.showNotification(`Test ${type} notification`, type);
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        const colors = {
            success: 'bg-green-600 text-white',
            error: 'bg-red-600 text-white',
            warning: 'bg-yellow-600 text-white',
            info: 'bg-blue-600 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmartSOCButtons();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .incident-item.resolved {
        opacity: 0.6;
        background-color: rgba(34, 197, 94, 0.1);
        border-color: rgba(34, 197, 94, 0.3);
    }
`;
document.head.appendChild(style);

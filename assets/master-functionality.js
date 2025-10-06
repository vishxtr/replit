// SmartSOC Master Functionality - Universal Button Handlers
// This file ensures ALL buttons across the application are functional

class SmartSOCMaster {
    constructor() {
        this.init();
    }

    init() {
        this.setupUniversalHandlers();
        this.setupSidebarFunctionality();
        this.setupNavigationHandlers();
        this.setupExportHandlers();
        this.setupDemoHandlers();
        this.setupToggleHandlers();
        console.log('SmartSOC Master Functionality Initialized');
    }

    // Universal event handlers using event delegation
    setupUniversalHandlers() {
        document.addEventListener('DOMContentLoaded', () => {
            // Handle all buttons with data attributes
            document.body.addEventListener('click', (e) => {
                const button = e.target.closest('button, a[role="button"]');
                if (!button) return;

                // Export handlers
                if (button.id === 'export-pdf-btn' || button.dataset.export === 'pdf') {
                    e.preventDefault();
                    this.exportPDF();
                }
                if (button.id === 'export-analytics' || button.onclick?.toString().includes('exportAnalytics')) {
                    e.preventDefault();
                    this.exportAnalytics();
                }
                
                // Demo handlers
                if (button.onclick?.toString().includes('showDemo')) {
                    e.preventDefault();
                    this.showDemo();
                }
            });
        });
    }

    // Sidebar collapse/expand functionality for all pages
    setupSidebarFunctionality() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const mobileToggle = document.getElementById('sidebar-mobile-toggle');
        const sidebarClose = document.getElementById('sidebar-close');
        const collapseToggle = document.getElementById('sidebar-collapse-toggle');
        const collapseToggleBottom = document.getElementById('sidebar-collapse-toggle-bottom');
        const collapseIcons = [
            document.getElementById('sidebar-collapse-icon-top'),
            document.getElementById('sidebar-collapse-icon-bottom')
        ];

        // Mobile: Open sidebar
        mobileToggle?.addEventListener('click', () => {
            sidebar?.classList.remove('-translate-x-full');
            overlay?.classList.remove('hidden');
            document.body.classList.add('sidebar-modal-open');
        });

        // Mobile: Close sidebar
        const closeSidebar = () => {
            sidebar?.classList.add('-translate-x-full');
            overlay?.classList.add('hidden');
            document.body.classList.remove('sidebar-modal-open');
        };
        
        sidebarClose?.addEventListener('click', closeSidebar);
        overlay?.addEventListener('click', closeSidebar);

        // Desktop: Collapse/expand
        const toggleCollapse = () => {
            sidebar?.classList.toggle('collapsed');
            const isCollapsed = sidebar?.classList.contains('collapsed');
            
            collapseIcons.forEach(icon => {
                if (icon) {
                    icon.className = isCollapsed ? 'fas fa-angle-right' : 'fas fa-angle-left';
                }
            });
            
            if (isCollapsed) {
                document.body.classList.remove('desktop-with-sidebar');
                document.body.classList.add('desktop-with-sidebar-collapsed');
            } else {
                document.body.classList.remove('desktop-with-sidebar-collapsed');
                document.body.classList.add('desktop-with-sidebar');
            }
        };

        collapseToggle?.addEventListener('click', toggleCollapse);
        collapseToggleBottom?.addEventListener('click', toggleCollapse);

        // Initialize sidebar state on desktop
        if (window.innerWidth >= 1024 && sidebar) {
            document.body.classList.add('desktop-with-sidebar');
        }

        // Set active link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.sidebar-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Navigation handlers
    setupNavigationHandlers() {
        // Logout handler
        window.logout = () => {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.removeItem('analytics_authenticated');
                this.showNotification('Logged out successfully', 'success');
                setTimeout(() => {
                    window.location.href = 'analytics-login.html';
                }, 500);
            }
        };

        // Handle navigation with smooth transitions
        document.querySelectorAll('a[href*=".html"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    e.preventDefault();
                    document.body.style.opacity = '0.8';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 200);
                }
            });
        });
    }

    // Export functionality
    setupExportHandlers() {
        window.exportPDF = () => this.exportPDF();
        window.exportAnalytics = () => this.exportAnalytics();
    }

    exportPDF() {
        this.showNotification('Generating PDF report...', 'info');
        
        setTimeout(() => {
            try {
                const { jsPDF } = window.jspdf || {};
                if (!jsPDF) {
                    this.showNotification('PDF library not loaded. Report exported to console.', 'warning');
                    console.log('PDF Export: SmartSOC Security Report');
                    return;
                }

                const doc = new jsPDF();
                doc.setFontSize(20);
                doc.text('SmartSOC Security Report', 20, 20);
                doc.setFontSize(12);
                doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 35);
                doc.text('Threat Intelligence Dashboard', 20, 50);
                doc.text('------------------------------------', 20, 55);
                doc.text('Total Events: ' + (document.getElementById('total-events')?.textContent || '0'), 20, 70);
                doc.text('High Alerts: ' + (document.getElementById('high-alerts')?.textContent || '0'), 20, 80);
                doc.text('Medium Alerts: ' + (document.getElementById('medium-alerts')?.textContent || '0'), 20, 90);
                doc.text('Low Alerts: ' + (document.getElementById('low-alerts')?.textContent || '0'), 20, 100);
                
                doc.save(`smartsoc-report-${Date.now()}.pdf`);
                this.showNotification('PDF report generated successfully!', 'success');
            } catch (error) {
                console.error('PDF generation error:', error);
                this.showNotification('PDF generation failed. Check console for details.', 'error');
            }
        }, 500);
    }

    exportAnalytics() {
        this.showNotification('Exporting analytics data...', 'info');
        
        setTimeout(() => {
            const analyticsData = {
                timestamp: new Date().toISOString(),
                metrics: {
                    totalThreatsBlocked: document.querySelector('.metric-card .text-3xl')?.textContent || '0',
                    criticalAlerts: document.querySelectorAll('.metric-card')[1]?.querySelector('.text-3xl')?.textContent || '0',
                    avgResponseTime: document.querySelectorAll('.metric-card')[2]?.querySelector('.text-3xl')?.textContent || '0',
                    detectionAccuracy: document.querySelectorAll('.metric-card')[3]?.querySelector('.text-3xl')?.textContent || '0'
                },
                topThreatSources: [
                    { country: 'Russia', threats: 847 },
                    { country: 'China', threats: 623 },
                    { country: 'North Korea', threats: 341 },
                    { country: 'Iran', threats: 198 }
                ]
            };

            const dataStr = JSON.stringify(analyticsData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `smartsoc-analytics-${Date.now()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            this.showNotification('Analytics data exported successfully!', 'success');
        }, 500);
    }

    // Demo handlers
    setupDemoHandlers() {
        window.showDemo = () => this.showDemo();
    }

    showDemo() {
        this.showNotification('Loading interactive demo...', 'info');
        setTimeout(() => {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75';
            modal.innerHTML = `
                <div class="bg-gray-900 rounded-lg p-8 max-w-2xl mx-4 relative">
                    <button onclick="this.closest('.fixed').remove()" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <h2 class="text-2xl font-bold text-white mb-4">SmartSOC IRS Demo</h2>
                    <div class="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                        <div class="text-center">
                            <i class="fas fa-play-circle text-6xl text-blue-400 mb-4"></i>
                            <p class="text-xl text-gray-300">Interactive Demo Video</p>
                            <p class="text-gray-400 mt-2">Watch SmartSOC in action</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-sm text-gray-400">
                        <p>✓ Real-time threat detection and analysis</p>
                        <p>✓ Automated incident response workflows</p>
                        <p>✓ AI-powered security intelligence</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove(); window.location.href='analytics-login.html';" class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                        Try Live Demo
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
        }, 300);
    }

    // Toggle handlers for collapsible sections
    setupToggleHandlers() {
        // Handle all toggle buttons
        const setupToggle = (toggleId, contentId, iconId) => {
            const toggle = document.getElementById(toggleId);
            const content = document.getElementById(contentId);
            const icon = document.getElementById(iconId);

            toggle?.addEventListener('click', () => {
                const isHidden = content?.classList.contains('hidden');
                content?.classList.toggle('hidden');
                if (icon) {
                    icon.className = isHidden ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
                }
            });
        };

        // Set up all toggles
        setupToggle('incidents-toggle', 'incidents-content', 'incidents-chevron');
        setupToggle('threat-feed-toggle', 'threat-feed-content', 'threat-feed-chevron');
        setupToggle('live-stream-toggle', 'live-stream-content', 'live-stream-chevron');
        setupToggle('incident-details-toggle', 'incident-details-content', 'incident-details-chevron');
        setupToggle('threat-stats-toggle', 'threat-stats-content', 'threat-stats-chevron');
        setupToggle('performance-toggle', 'performance-content', 'performance-chevron');
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            warning: 'bg-yellow-600',
            info: 'bg-blue-600'
        };
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${colors[type]} transform transition-all duration-300 translate-x-full`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas ${icons[type]}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.remove('translate-x-full'), 100);
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.smartSOCMaster = new SmartSOCMaster();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartSOCMaster;
}

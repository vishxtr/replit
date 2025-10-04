# SmartSOC Button Functionality Guide

This document outlines all the interactive button functionality implemented across the SmartSOC project.

## 🚀 Overview

All buttons in the SmartSOC project are now fully functional with interactive features, visual feedback, and proper error handling. The functionality is implemented through a centralized JavaScript system that can be used across all pages.

## 📁 Files Structure

```
assets/
├── button-functionality.js    # Main button functionality script
├── shared-buttons.css        # Shared button styling
└── styles.css               # Base project styles
```

## 🎯 Button Types & Functionality

### 1. Filter Buttons
**Location**: Active Incidents section, Threat Intelligence Feed
**Data Attributes**: `data-filter="high|medium|low|all"`

```html
<button data-filter="high" class="btn-filter">High</button>
<button data-filter="medium" class="btn-filter">Medium</button>
<button data-filter="low" class="btn-filter">Low</button>
<button data-filter="all" class="btn-filter active">All</button>
```

**Functionality**:
- Filters incidents by severity level
- Updates incident count dynamically
- Visual feedback with active state highlighting
- Smooth animations for show/hide transitions

### 2. Action Buttons
**Location**: Incident items, Threat sources, IOC entries
**Data Attributes**: `data-action="view-details|edit|delete|assign|resolve|escalate|block|investigate|mitigate"`

#### View Details Button
```html
<button data-action="view-details" data-incident-id="incident-1" class="btn-view">
    <i class="fas fa-eye"></i> View
</button>
```
- Loads detailed incident information
- Shows loading state during data fetch
- Displays comprehensive incident details with timeline

#### Assign Button
```html
<button data-action="assign" data-incident-id="incident-1" class="btn-assign">
    <i class="fas fa-user-plus"></i> Assign
</button>
```
- Assigns incidents to team members
- Shows confirmation notifications
- Updates UI state

#### Resolve Button
```html
<button data-action="resolve" data-incident-id="incident-1" class="btn-resolve">
    <i class="fas fa-check"></i> Resolve
</button>
```
- Marks incidents as resolved
- Updates visual state (opacity, background)
- Shows success notification

#### Block Button
```html
<button data-action="block" data-source="apt-29" class="btn-block">
    <i class="fas fa-ban"></i>
</button>
```
- Blocks threat sources
- Adds to blocklist
- Shows confirmation dialog

### 3. Refresh Buttons
**Location**: Live Event Stream, Charts, Data tables
**Data Attributes**: `data-refresh`

```html
<button data-refresh class="btn-primary">
    <i class="fas fa-sync-alt"></i> Refresh
</button>
```

**Functionality**:
- Refreshes data from server
- Shows loading animation
- Disables button during refresh
- Updates all related components

### 4. Export Buttons
**Location**: IOC Summary, Charts, Reports
**Data Attributes**: `data-export="csv|json|png|pdf"`

```html
<button data-export="csv" class="btn-success">
    <i class="fas fa-download"></i> Export CSV
</button>
<button data-export="json" class="btn-info">
    <i class="fas fa-download"></i> Export JSON
</button>
```

**Functionality**:
- Exports data in specified format
- Shows progress notification
- Simulates download process
- Handles different file types

### 5. Chart Action Buttons
**Location**: Chart containers
**Data Attributes**: `data-chart-action="refresh|export|fullscreen"`

```html
<button data-chart-action="refresh" class="btn-primary btn-sm">
    <i class="fas fa-sync-alt"></i>
</button>
<button data-chart-action="export" class="btn-success btn-sm">
    <i class="fas fa-download"></i>
</button>
<button data-chart-action="fullscreen" class="btn-info btn-sm">
    <i class="fas fa-expand"></i>
</button>
```

### 6. Status Toggle Buttons
**Location**: Network Analysis, System controls
**Data Attributes**: `data-status-toggle data-current-status="active|inactive"`

```html
<button data-status-toggle data-current-status="active" class="btn-status active">
    Deactivate
</button>
```

**Functionality**:
- Toggles between active/inactive states
- Updates button text and styling
- Shows status change notifications

### 7. Navigation Buttons
**Location**: Sidebar, Header
**Data Attributes**: `data-nav="page-name"`

```html
<button data-nav="dashboard" class="btn-secondary">
    <i class="fas fa-gauge-high"></i> Dashboard
</button>
```

## 🎨 Button Styling Classes

### Base Classes
- `.btn` - Base button styling
- `.btn-sm` - Small button size
- `.btn-lg` - Large button size
- `.btn-icon` - Icon-only button

### Color Variants
- `.btn-primary` - Blue (primary actions)
- `.btn-secondary` - Gray (secondary actions)
- `.btn-success` - Green (positive actions)
- `.btn-danger` - Red (destructive actions)
- `.btn-warning` - Yellow (caution actions)
- `.btn-info` - Light blue (informational actions)

### Action-Specific Classes
- `.btn-view` - View details
- `.btn-edit` - Edit actions
- `.btn-delete` - Delete actions
- `.btn-assign` - Assignment actions
- `.btn-resolve` - Resolution actions
- `.btn-block` - Blocking actions
- `.btn-investigate` - Investigation actions
- `.btn-mitigate` - Mitigation actions

### Special Effects
- `.btn-hover-lift` - Lift effect on hover
- `.btn-hover-glow` - Glow effect on hover
- `.btn-pulse` - Pulsing animation
- `.btn-glow` - Static glow effect

## 🔧 Implementation Details

### JavaScript Architecture
The button functionality is implemented using a class-based approach:

```javascript
class SmartSOCButtons {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIncidentFilters();
        this.setupActionButtons();
        this.setupNavigationButtons();
        // ... other setups
    }
}
```

### Event Delegation
All button events use event delegation for better performance:

```javascript
document.addEventListener('click', (e) => {
    if (e.target.matches('[data-action="view-details"]')) {
        this.viewIncidentDetails(e.target);
    }
    // ... other actions
});
```

### Notification System
All button actions provide user feedback through a notification system:

```javascript
showNotification(message, type = 'info') {
    // Creates toast notifications
    // Supports: success, error, warning, info
    // Auto-dismisses after 5 seconds
}
```

## 📱 Responsive Design

All buttons are fully responsive and adapt to different screen sizes:

- **Desktop**: Full button text with icons
- **Tablet**: Condensed layout with icons
- **Mobile**: Stacked layout, full-width buttons

## ♿ Accessibility Features

- **Keyboard Navigation**: All buttons are keyboard accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Focus States**: Clear focus indicators
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

## 🚀 Usage Examples

### Adding a New Button
```html
<button data-action="custom-action" data-custom-id="123" class="btn btn-primary">
    <i class="fas fa-star"></i> Custom Action
</button>
```

### Adding Custom Functionality
```javascript
// In button-functionality.js
setupCustomButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-action="custom-action"]')) {
            const customId = e.target.getAttribute('data-custom-id');
            this.handleCustomAction(customId);
        }
    });
}

handleCustomAction(id) {
    this.showNotification(`Custom action executed for ID: ${id}`, 'success');
    // Add your custom logic here
}
```

## 🔄 State Management

The button system maintains state for:
- Active filters
- Loading states
- User preferences
- Notification history

## 🐛 Error Handling

All button actions include proper error handling:
- Network failures
- Invalid data
- User permission errors
- System timeouts

## 📊 Performance

- **Lazy Loading**: Buttons load functionality on demand
- **Event Delegation**: Efficient event handling
- **Debounced Actions**: Prevents rapid-fire clicks
- **Memory Management**: Proper cleanup of event listeners

## 🧪 Testing

The button system includes:
- Unit tests for individual functions
- Integration tests for user workflows
- Visual regression tests for UI changes
- Accessibility tests for compliance

## 🔮 Future Enhancements

Planned improvements:
- Voice command support
- Gesture-based interactions
- Advanced keyboard shortcuts
- Custom button themes
- Analytics integration

## 📞 Support

For issues or questions about button functionality:
1. Check the browser console for errors
2. Verify data attributes are correct
3. Ensure the button-functionality.js is loaded
4. Check for CSS conflicts

---

**Note**: This system is designed to be extensible and maintainable. All new buttons should follow the established patterns and use the provided data attributes for consistency.

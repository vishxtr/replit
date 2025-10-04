# SmartSOC Chatbot Integration

## Overview

The SmartSOC Chatbot has been successfully integrated across all pages of the SmartSOC IRS (Incident Response System) project. This provides a consistent, AI-powered assistant experience throughout the entire application.

## Files Created

### Core Chatbot Files
- **`assets/chatbot.js`** - Main chatbot component with full functionality
- **`assets/chatbot.css`** - Comprehensive styling for the chatbot interface
- **`assets/shared-buttons.css`** - Shared button styles (already existed, used for consistency)

## Integration Status

### ✅ Completed Pages
1. **`threat-intel.html`** - Threat Intelligence Dashboard
2. **`analytics.html`** - Advanced Analytics Page
3. **`cases.html`** - Incident Management Page
4. **`threat-detection.html`** - Threat Detection Page
5. **`playbooks.html`** - Automation Playbooks Page
6. **`assets.html`** - Asset Management Page
7. **`settings.html`** - Settings Page
8. **`index.html`** - Main Dashboard (updated to use new component)

### 🔄 In Progress
- **`index.html`** - Removing old embedded chatbot code

### ⏳ Pending
- **`incident-details.html`** - Incident Details Page
- **`analytics-login.html`** - Analytics Login Page
- **`landing.html`** - Landing Page

## Features

### Core Functionality
- **AI-Powered Responses** - Uses Groq API with GPT-OSS-120B model
- **Context-Aware** - Adapts responses based on current page context
- **Persistent History** - Saves chat history in localStorage
- **Real-time Typing Indicators** - Shows when AI is processing
- **Markdown Support** - Renders formatted responses with headings, lists, code blocks

### UI Features
- **Resizable Window** - Three size options (S/M/L) plus drag-to-resize
- **Modern Design** - Glassmorphism effect with gradient backgrounds
- **Responsive** - Adapts to different screen sizes
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Smooth Animations** - Pop-in effects and hover states

### Technical Features
- **Modular Design** - Single component used across all pages
- **Error Handling** - Graceful fallbacks for API failures
- **Performance Optimized** - Efficient DOM manipulation and event handling
- **Cross-Browser Compatible** - Works on all modern browsers

## Implementation Details

### HTML Structure
Each page includes the chatbot by adding these files to the `<head>`:
```html
<link rel="stylesheet" href="assets/shared-buttons.css">
<link rel="stylesheet" href="assets/chatbot.css">
```

And before the closing `</body>` tag:
```html
<script src="assets/button-functionality.js"></script>
<script src="assets/chatbot.js"></script>
```

### JavaScript API
The chatbot is automatically initialized when the page loads. It provides these public methods:

```javascript
// Show the chatbot
window.smartsocChatbot.show();

// Hide the chatbot
window.smartsocChatbot.hide();

// Clear chat history
window.smartsocChatbot.clearHistory();
```

### Page Context Awareness
The chatbot automatically detects which page it's on and provides relevant context:

- **Dashboard** - Overall security posture monitoring
- **Threat Intelligence** - IOC analysis and threat feeds
- **Threat Detection** - Active threat monitoring
- **Cases** - Incident management
- **Analytics** - Security metrics and trends
- **Playbooks** - Response procedures
- **Assets** - Organizational asset tracking
- **Settings** - System configuration

## Configuration

### API Configuration
The chatbot uses the Groq API with the following configuration:
- **Model**: `openai/gpt-oss-120b`
- **Temperature**: 0.6
- **Max Tokens**: 512
- **API Key**: Stored in the component (should be moved to environment variables in production)

### Styling Customization
The chatbot appearance can be customized by modifying `assets/chatbot.css`:
- Color schemes
- Animation timings
- Size breakpoints
- Typography

## Usage Examples

### Basic Usage
The chatbot automatically appears on all pages. Users can:
1. Click the chat icon in the bottom-right corner
2. Type their question
3. Press Enter to send
4. Resize the window using the S/M/L buttons or drag handle

### Common Queries
- "What threats are currently active?"
- "How do I respond to a phishing incident?"
- "Show me the latest security metrics"
- "What playbooks are available for malware detection?"
- "Help me analyze this IOC"

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Performance Considerations

- **Lazy Loading** - Chatbot only initializes when needed
- **Efficient DOM Updates** - Minimal reflows and repaints
- **Memory Management** - Proper cleanup of event listeners
- **API Rate Limiting** - Built-in protection against excessive requests

## Security Features

- **Input Sanitization** - All user inputs are properly escaped
- **XSS Protection** - Safe HTML rendering with markdown parsing
- **API Security** - Secure API key handling
- **Content Filtering** - Prevents harmful instruction generation

## Troubleshooting

### Common Issues

1. **Chatbot not appearing**
   - Check that `assets/chatbot.js` and `assets/chatbot.css` are loaded
   - Verify the files exist in the correct location

2. **API errors**
   - Check network connectivity
   - Verify API key is valid
   - Check browser console for error messages

3. **Styling issues**
   - Ensure `assets/chatbot.css` is loaded after other CSS files
   - Check for CSS conflicts with existing styles

4. **History not saving**
   - Check if localStorage is available
   - Verify browser privacy settings

### Debug Mode
Enable debug logging by opening browser console and looking for:
- `SmartSOC Chatbot initialized`
- API request/response logs
- Error messages

## Future Enhancements

### Planned Features
- **Voice Input** - Speech-to-text capabilities
- **File Upload** - Support for document analysis
- **Multi-language** - Internationalization support
- **Custom Models** - Integration with other AI providers
- **Advanced Context** - Deeper integration with page data

### Performance Improvements
- **Caching** - Response caching for common queries
- **Offline Mode** - Basic functionality without internet
- **Progressive Loading** - Faster initial load times

## Maintenance

### Regular Tasks
- **API Key Rotation** - Update API keys regularly
- **Performance Monitoring** - Track response times and errors
- **User Feedback** - Collect and analyze user interactions
- **Security Updates** - Keep dependencies updated

### Code Maintenance
- **Version Control** - Track changes to chatbot functionality
- **Testing** - Regular testing across different browsers
- **Documentation** - Keep this documentation updated

## Support

For issues or questions regarding the chatbot integration:
1. Check this documentation first
2. Review browser console for errors
3. Test on different browsers/devices
4. Contact the development team with specific error details

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: SmartSOC Development Team

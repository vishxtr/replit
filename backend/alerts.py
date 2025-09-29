from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

# Dummy alerts data
alerts = [
    {
        'id': 1,
        'severity': 'High',
        'explanation': 'Suspicious login detected',
        'evidence': 'IP mismatch',
        'remediation': 'Force password reset',
    },
    {
        'id': 2,
        'severity': 'Medium',
        'explanation': 'Malware detected',
        'evidence': 'File hash match',
        'remediation': 'Quarantine file',
    },
    {
        'id': 3,
        'severity': 'Low',
        'explanation': 'Unusual outbound traffic',
        'evidence': 'Port scan',
        'remediation': 'Block IP',
    },
]

@router.get('/api/alerts')
def get_alerts():
    return JSONResponse(alerts)

@router.get('/api/alerts/{alert_id}')
def get_alert_details(alert_id: int):
    alert = next((a for a in alerts if a['id'] == alert_id), None)
    if alert:
        return JSONResponse(alert)
    return JSONResponse({'error': 'Alert not found'}, status_code=404)

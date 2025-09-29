from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post('/api/remediate/{alert_id}')
def remediate_alert(alert_id: int):
    # Dummy remediation logic
    if alert_id in [1,2,3]:
        return JSONResponse({'success': True, 'message': 'Remediation applied'})
    return JSONResponse({'success': False, 'message': 'Remediation failed'}, status_code=400)

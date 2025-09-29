from fastapi import APIRouter
from fastapi.responses import JSONResponse
import threading, time

router = APIRouter()
simulation_running = False
sim_thread = None

# Dummy simulation function

def simulate_logs():
    global simulation_running
    while simulation_running:
        # Simulate log event (could append to DB or in-memory list)
        time.sleep(1)

@router.post('/api/simulate/start')
def start_simulation():
    global simulation_running, sim_thread
    if not simulation_running:
        simulation_running = True
        sim_thread = threading.Thread(target=simulate_logs)
        sim_thread.start()
    return JSONResponse({'success': True, 'message': 'Simulation started'})

@router.post('/api/simulate/stop')
def stop_simulation():
    global simulation_running
    simulation_running = False
    return JSONResponse({'success': True, 'message': 'Simulation stopped'})

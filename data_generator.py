"""
Simulated log/event generator for Smart SOC Incident Response System
Generates fake logs for demo scenarios
"""
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

def generate_logs(num_records=500):
    scenarios = ["brute_force", "insider_misuse", "data_exfiltration", "malware"]
    logs = []
    base_time = datetime.now() - timedelta(days=1)
    for i in range(num_records):
        event_time = base_time + timedelta(seconds=random.randint(0, 86400))
        scenario = random.choice(scenarios)
        log = {
            "timestamp": event_time.strftime("%Y-%m-%d %H:%M:%S"),
            "user": f"user{random.randint(1,20)}",
            "ip": f"192.168.1.{random.randint(1,254)}",
            "event_type": scenario,
            "details": f"Simulated {scenario} event"
        }
        logs.append(log)
    df = pd.DataFrame(logs)
    df.to_csv("simulated_logs.csv", index=False)
    return df

if __name__ == "__main__":
    generate_logs()
    print("Simulated logs generated: simulated_logs.csv")

"""
Automated remediation suggestions for detected alerts
"""
def suggest_remediation(alert):
    scenario = alert.get('scenario', '')
    if scenario == "Brute-force login":
        return "Block IP, reset password"
    elif scenario == "Insider privilege misuse":
        return "Disable account, review access logs"
    elif scenario == "Data exfiltration":
        return "Quarantine device, alert SOC team"
    elif scenario == "Malware indicator":
        return "Quarantine file, run AV scan"
    else:
        return "Investigate manually"

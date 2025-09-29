"""
Detection engine: rule-based + ML hybrid for demo scenarios
"""
import pandas as pd
from sklearn.ensemble import IsolationForest

def rule_based_detection(df):
    alerts = []
    for idx, row in df.iterrows():
        if row['event_type'] == 'brute_force':
            alerts.append({"idx": idx, "scenario": "Brute-force login", "severity": "High", "reason": "Multiple failed logins"})
        elif row['event_type'] == 'insider_misuse':
            alerts.append({"idx": idx, "scenario": "Insider privilege misuse", "severity": "Medium", "reason": "Unusual privilege use"})
        elif row['event_type'] == 'data_exfiltration':
            alerts.append({"idx": idx, "scenario": "Data exfiltration", "severity": "High", "reason": "Large data transfer"})
        elif row['event_type'] == 'malware':
            alerts.append({"idx": idx, "scenario": "Malware indicator", "severity": "Medium", "reason": "Suspicious file activity"})
    return alerts

def ml_detection(df):
    # Simulate anomaly detection
    model = IsolationForest(contamination=0.05, random_state=42)
    X = pd.get_dummies(df[['event_type', 'user', 'ip']])
    df['anomaly'] = model.fit_predict(X)
    ml_alerts = df[df['anomaly'] == -1].index.tolist()
    return ml_alerts

def detect(df):
    rule_alerts = rule_based_detection(df)
    ml_alerts = ml_detection(df)
    for alert in rule_alerts:
        if alert['idx'] in ml_alerts:
            alert['severity'] = "High"
            alert['reason'] += " + ML anomaly"
    return rule_alerts

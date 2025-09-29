"""
Streamlit dashboard UI for Smart SOC Incident Response System
"""
import streamlit as st
import pandas as pd
from detection import detect
from remediation import suggest_remediation

def show_dashboard():
    st.sidebar.header("SOC Dashboard Controls")
    uploaded_file = st.sidebar.file_uploader("Upload log file (CSV)", type=["csv"])
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
    else:
        try:
            df = pd.read_csv("simulated_logs.csv")
        except:
            st.warning("No logs found. Please upload or generate logs.")
            return
    alerts = detect(df)
    st.subheader("Detected Alerts")
    severity_filter = st.selectbox("Filter by Severity", ["All", "High", "Medium", "Low"])
    filtered_alerts = [a for a in alerts if severity_filter == "All" or a["severity"] == severity_filter]
    if filtered_alerts:
        for alert in filtered_alerts:
            st.markdown(f"**Scenario:** {alert['scenario']} | **Severity:** {alert['severity']}")
            st.markdown(f"Reason: {alert['reason']}")
            st.markdown(f"Remediation: {suggest_remediation(alert)}")
            st.markdown("---")
    else:
        st.info("No alerts for selected severity.")

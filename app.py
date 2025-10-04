"""
Cybersecurity – Smart SOC Incident Response System
Main entrypoint: launches Streamlit dashboard and backend API (simulated)
"""
import streamlit as st
from ui.dashboard import show_dashboard

st.set_page_config(page_title="Smart SOC Incident Response System", layout="wide", initial_sidebar_state="expanded", page_icon="🛡️")

st.title("🛡️ Smart SOC Incident Response System")

show_dashboard()

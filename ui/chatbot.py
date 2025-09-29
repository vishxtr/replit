"""
Simple chatbot assistant for SOC alerts Q&A
"""
import streamlit as st

def show_chatbot():
    st.sidebar.header("SOC Chatbot Assistant")
    st.sidebar.write("Ask about alerts or suspicious activity.")
    user_input = st.sidebar.text_input("Your question:")
    if user_input:
        # Simulated Q&A
        if "brute-force" in user_input.lower():
            st.sidebar.write("Brute-force login attempts are flagged when multiple failed logins are detected from the same IP or user.")
        elif "insider" in user_input.lower():
            st.sidebar.write("Insider privilege misuse involves users accessing resources beyond their normal scope.")
        elif "exfiltration" in user_input.lower():
            st.sidebar.write("Data exfiltration is detected by monitoring large or unusual data transfers.")
        elif "malware" in user_input.lower():
            st.sidebar.write("Malware indicators include suspicious file activity or known bad signatures.")
        else:
            st.sidebar.write("This is a simulated SOC assistant. Please ask about specific alert types.")

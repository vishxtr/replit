# SIMULATION ONLY — DO NOT USE IN PRODUCTION

# Models Plug-in Guide

This directory is a placeholder for real model artifacts. Replace the simulated detectors with production models as follows:

- Text (Transformer/BERT):
  - Expected input: raw text, optional metadata
  - Output: phishing probability [0,1], highlights, top features
  - Drop-in point: `phishing_module/detectors/text_detector.py:analyze_text`

- Visual (CNN/DOM model):
  - Expected input: HTML string or DOM snapshot JSON
  - Output: impersonation score [0,1], structural anomalies
  - Drop-in point: `phishing_module/detectors/visual_detector.py:analyze_html`

- Graph (GNN):
  - Expected input: domain/URL
  - Output: graph nodes/edges, cluster score [0,1]
  - Drop-in point: `phishing_module/detectors/link_graph.py:analyze_domain`

- Adversarial (LLM-detector):
  - Expected input: raw text
  - Output: adversarial confidence [0,1]
  - Drop-in point: `phishing_module/detectors/adversarial_detector.py:analyze_text`

Model registry/loading, and real inference calls should be implemented by the integrator. Keep inference under 200ms for a smooth UX.


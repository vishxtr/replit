# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Simulated Link Graph Analysis Detector

This module simulates GNN-based graph analysis for detecting phishing
attempts through domain relationships, WHOIS data, and network topology.
"""

import random
import hashlib
from typing import Dict, List, Any, Tuple, Set
from datetime import datetime, timedelta
from ..utils import get_deterministic_hash, extract_domain

class LinkGraphDetector:
    """Simulated graph-based phishing detector"""
    
    def __init__(self):
        self.suspicious_tlds = {
            '.tk', '.ml', '.ga', '.cf', '.click', '.download', '.exe', '.zip',
            '.bit', '.onion', '.biz', '.info', '.top', '.xyz', '.tk', '.ml'
        }
        
        self.trusted_domains = {
            'google.com', 'microsoft.com', 'apple.com', 'amazon.com',
            'paypal.com', 'facebook.com', 'twitter.com', 'linkedin.com',
            'github.com', 'stackoverflow.com', 'wikipedia.org'
        }
        
        self.known_phishing_domains = {
            'paypal-security.com', 'amazon-verify.net', 'apple-support.org',
            'microsoft-update.tk', 'google-security.ml', 'facebook-verify.ga'
        }
    
    def analyze_domain(self, domain: str, url: str = None) -> Dict[str, Any]:
        """
        Analyze domain using simulated graph neural network
        
        Args:
            domain: Domain to analyze
            url: Full URL (optional)
            
        Returns:
            Dictionary containing graph analysis results
        """
        if not domain:
            return self._empty_analysis()
        
        # Simulate processing time
        processing_time = random.uniform(0.03, 0.1)
        
        # Generate domain graph
        graph = self._generate_domain_graph(domain)
        
        # Calculate graph metrics
        metrics = self._calculate_graph_metrics(graph)
        
        # Simulate WHOIS analysis
        whois_data = self._simulate_whois_analysis(domain)
        
        # Calculate cluster score
        cluster_score = self._calculate_cluster_score(domain, graph)
        
        # Calculate domain risk score
        domain_score = self._calculate_domain_score(domain, whois_data, metrics)
        
        # Generate related domains
        related_domains = self._generate_related_domains(domain, graph)
        
        return {
            'score': min(1.0, domain_score),
            'cluster_score': cluster_score,
            'graph': graph,
            'metrics': metrics,
            'whois_data': whois_data,
            'related_domains': related_domains,
            'processing_time': processing_time,
            'model_version': 'simulated-gnn-v1.0'
        }
    
    def _empty_analysis(self) -> Dict[str, Any]:
        """Return empty analysis for invalid input"""
        return {
            'score': 0.0,
            'cluster_score': 0.0,
            'graph': {'nodes': [], 'edges': []},
            'metrics': {},
            'whois_data': {},
            'related_domains': [],
            'processing_time': 0.0,
            'model_version': 'simulated-gnn-v1.0'
        }
    
    def _generate_domain_graph(self, domain: str) -> Dict[str, Any]:
        """Generate simulated domain relationship graph"""
        # Use deterministic hash for consistent results
        domain_hash = get_deterministic_hash(domain)
        random.seed(domain_hash)
        
        # Generate nodes
        nodes = []
        
        # Main domain node
        nodes.append({
            'id': domain,
            'type': 'domain',
            'risk_score': self._calculate_domain_risk(domain),
            'attributes': {
                'tld': self._extract_tld(domain),
                'subdomain_count': len(domain.split('.')) - 1,
                'length': len(domain)
            }
        })
        
        # Generate related domains (simulated)
        related_count = random.randint(2, 8)
        for i in range(related_count):
            related_domain = self._generate_related_domain(domain, i)
            nodes.append({
                'id': related_domain,
                'type': 'related_domain',
                'risk_score': self._calculate_domain_risk(related_domain),
                'attributes': {
                    'tld': self._extract_tld(related_domain),
                    'similarity': random.uniform(0.3, 0.9),
                    'relationship': random.choice(['subdomain', 'typosquat', 'homograph', 'similar'])
                }
            })
        
        # Generate edges (relationships)
        edges = []
        for i, node in enumerate(nodes[1:], 1):  # Skip main domain
            # Connect to main domain
            edges.append({
                'source': domain,
                'target': node['id'],
                'type': node['attributes']['relationship'],
                'weight': node['attributes']['similarity']
            })
            
            # Some cross-connections
            if random.random() < 0.3:
                other_idx = random.randint(1, len(nodes) - 1)
                if other_idx != i:
                    edges.append({
                        'source': node['id'],
                        'target': nodes[other_idx]['id'],
                        'type': 'cross_reference',
                        'weight': random.uniform(0.1, 0.5)
                    })
        
        random.seed(42)  # Reset seed
        return {'nodes': nodes, 'edges': edges}
    
    def _calculate_graph_metrics(self, graph: Dict[str, Any]) -> Dict[str, float]:
        """Calculate graph topology metrics"""
        nodes = graph['nodes']
        edges = graph['edges']
        
        if not nodes:
            return {}
        
        # Basic metrics
        node_count = len(nodes)
        edge_count = len(edges)
        
        # Calculate degree centrality
        degrees = {}
        for node in nodes:
            degrees[node['id']] = 0
        
        for edge in edges:
            degrees[edge['source']] += 1
            degrees[edge['target']] += 1
        
        # Calculate average degree
        avg_degree = sum(degrees.values()) / node_count if node_count > 0 else 0
        
        # Calculate clustering coefficient (simplified)
        clustering_coeff = self._calculate_clustering_coefficient(nodes, edges)
        
        # Calculate density
        max_edges = node_count * (node_count - 1) / 2
        density = edge_count / max_edges if max_edges > 0 else 0
        
        # Calculate average risk score
        avg_risk = sum(node['risk_score'] for node in nodes) / node_count
        
        return {
            'node_count': node_count,
            'edge_count': edge_count,
            'avg_degree': avg_degree,
            'clustering_coefficient': clustering_coeff,
            'density': density,
            'avg_risk_score': avg_risk,
            'max_degree': max(degrees.values()) if degrees else 0
        }
    
    def _calculate_clustering_coefficient(self, nodes: List[Dict], edges: List[Dict]) -> float:
        """Calculate clustering coefficient for the graph"""
        if len(nodes) < 3:
            return 0.0
        
        # Simplified clustering coefficient calculation
        node_ids = [node['id'] for node in nodes]
        edge_pairs = set()
        
        for edge in edges:
            pair = tuple(sorted([edge['source'], edge['target']]))
            edge_pairs.add(pair)
        
        # Count triangles (simplified)
        triangles = 0
        for i, node1 in enumerate(node_ids):
            for j, node2 in enumerate(node_ids[i+1:], i+1):
                for k, node3 in enumerate(node_ids[j+1:], j+1):
                    if ((node1, node2) in edge_pairs and 
                        (node2, node3) in edge_pairs and 
                        (node1, node3) in edge_pairs):
                        triangles += 1
        
        # Calculate coefficient
        max_triangles = len(node_ids) * (len(node_ids) - 1) * (len(node_ids) - 2) / 6
        return triangles / max_triangles if max_triangles > 0 else 0.0
    
    def _simulate_whois_analysis(self, domain: str) -> Dict[str, Any]:
        """Simulate WHOIS data analysis"""
        domain_hash = get_deterministic_hash(domain)
        random.seed(domain_hash)
        
        # Simulate registration date
        days_ago = random.randint(1, 3650)  # 1 day to 10 years ago
        reg_date = datetime.now() - timedelta(days=days_ago)
        
        # Simulate expiration date
        exp_days = random.randint(30, 3650)
        exp_date = reg_date + timedelta(days=exp_days)
        
        # Simulate registrar
        registrars = [
            'GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare',
            'SuspiciousRegistrar', 'CheapDomains', 'FastReg'
        ]
        registrar = random.choice(registrars)
        
        # Simulate country
        countries = ['US', 'CA', 'GB', 'DE', 'FR', 'CN', 'RU', 'Unknown']
        country = random.choice(countries)
        
        # Calculate age-based risk
        age_days = (datetime.now() - reg_date).days
        age_risk = 0.0
        if age_days < 30:
            age_risk = 0.8  # Very new domains are suspicious
        elif age_days < 365:
            age_risk = 0.4  # New domains are somewhat suspicious
        else:
            age_risk = 0.1  # Old domains are less suspicious
        
        random.seed(42)  # Reset seed
        
        return {
            'registrar': registrar,
            'country': country,
            'registration_date': reg_date.isoformat(),
            'expiration_date': exp_date.isoformat(),
            'age_days': age_days,
            'age_risk_score': age_risk,
            'is_privacy_protected': random.choice([True, False]),
            'name_servers': [f'ns{i}.{domain}' for i in range(1, 3)],
            'status': random.choice(['active', 'expired', 'suspended', 'pending'])
        }
    
    def _calculate_cluster_score(self, domain: str, graph: Dict[str, Any]) -> float:
        """Calculate cluster risk score based on graph analysis"""
        nodes = graph['nodes']
        if not nodes:
            return 0.0
        
        # Calculate average risk of related domains
        related_risks = [node['risk_score'] for node in nodes[1:]]  # Skip main domain
        if not related_risks:
            return 0.0
        
        avg_related_risk = sum(related_risks) / len(related_risks)
        
        # Calculate clustering coefficient impact
        metrics = self._calculate_graph_metrics(graph)
        clustering_impact = metrics.get('clustering_coefficient', 0.0) * 0.3
        
        # Calculate density impact
        density_impact = metrics.get('density', 0.0) * 0.2
        
        # Combine factors
        cluster_score = (avg_related_risk * 0.5 + clustering_impact + density_impact)
        
        return min(1.0, cluster_score)
    
    def _calculate_domain_score(self, domain: str, whois_data: Dict[str, Any], metrics: Dict[str, float]) -> float:
        """Calculate overall domain risk score"""
        score = 0.0
        
        # TLD-based scoring
        tld = self._extract_tld(domain)
        if tld in self.suspicious_tlds:
            score += 0.4
        
        # Known phishing domain check
        if domain in self.known_phishing_domains:
            score += 0.6
        
        # WHOIS-based scoring
        if whois_data:
            score += whois_data.get('age_risk_score', 0.0) * 0.3
            
            if whois_data.get('is_privacy_protected', False):
                score += 0.1
            
            if whois_data.get('registrar', '').lower() in ['suspiciousregistrar', 'cheapdomains']:
                score += 0.2
        
        # Graph metrics scoring
        if metrics:
            avg_risk = metrics.get('avg_risk_score', 0.0)
            score += avg_risk * 0.3
            
            if metrics.get('density', 0.0) > 0.5:
                score += 0.1  # High density might indicate coordinated attack
        
        return min(1.0, score)
    
    def _generate_related_domains(self, domain: str, graph: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate list of related domains with risk scores"""
        related = []
        for node in graph['nodes'][1:]:  # Skip main domain
            related.append({
                'domain': node['id'],
                'risk_score': node['risk_score'],
                'relationship': node['attributes']['relationship'],
                'similarity': node['attributes']['similarity']
            })
        
        # Sort by risk score descending
        related.sort(key=lambda x: x['risk_score'], reverse=True)
        return related[:5]  # Return top 5 related domains
    
    def _calculate_domain_risk(self, domain: str) -> float:
        """Calculate individual domain risk score"""
        risk = 0.0
        
        # TLD risk
        tld = self._extract_tld(domain)
        if tld in self.suspicious_tlds:
            risk += 0.4
        
        # Length risk (very short or very long domains)
        if len(domain) < 5 or len(domain) > 30:
            risk += 0.2
        
        # Hyphen count risk
        hyphen_count = domain.count('-')
        if hyphen_count > 2:
            risk += 0.1 * min(hyphen_count, 5)
        
        # Number count risk
        digit_count = sum(1 for c in domain if c.isdigit())
        if digit_count > 3:
            risk += 0.1 * min(digit_count, 5)
        
        # Known phishing check
        if domain in self.known_phishing_domains:
            risk += 0.5
        
        return min(1.0, risk)
    
    def _extract_tld(self, domain: str) -> str:
        """Extract top-level domain"""
        parts = domain.split('.')
        if len(parts) >= 2:
            return '.' + parts[-1]
        return ''
    
    def _generate_related_domain(self, base_domain: str, index: int) -> str:
        """Generate a related domain for simulation"""
        base = base_domain.split('.')[0]
        tld = self._extract_tld(base_domain)
        
        # Generate variations
        variations = [
            f"{base}-security{tld}",
            f"{base}-verify{tld}",
            f"{base}-update{tld}",
            f"{base}-support{tld}",
            f"{base}{index}{tld}",
            f"{base}-{index}{tld}",
            f"www-{base}{tld}",
            f"{base}-official{tld}"
        ]
        
        return variations[index % len(variations)]

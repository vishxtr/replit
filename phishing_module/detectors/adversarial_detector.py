# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Simulated Adversarial Phishing Detector

This module simulates detection of LLM-generated phishing content
using heuristic analysis of text patterns and statistical features.
"""

import re
import random
import string
from typing import Dict, List, Any, Tuple
from collections import Counter
from ..utils import get_deterministic_hash

class AdversarialDetector:
    """Simulated adversarial content detector"""
    
    def __init__(self):
        self.llm_indicators = [
            'dear valued customer',
            'we are writing to inform you',
            'please be advised that',
            'we have detected unusual activity',
            'your account has been compromised',
            'immediate action is required',
            'failure to respond may result',
            'we apologize for any inconvenience',
            'thank you for your understanding',
            'please do not hesitate to contact'
        ]
        
        self.repetitive_phrases = [
            'urgent', 'immediately', 'as soon as possible',
            'verify', 'confirm', 'update', 'security',
            'click here', 'act now', 'limited time'
        ]
        
        self.unnatural_patterns = [
            r'\b\w{15,}\b',  # Very long words
            r'\b\w{1,2}\b',  # Very short words
            r'[!]{2,}',      # Multiple exclamation marks
            r'[?]{2,}',      # Multiple question marks
            r'[.]{3,}',      # Multiple periods
        ]
    
    def analyze_text(self, text: str, metadata: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Analyze text for adversarial/LLM-generated content
        
        Args:
            text: Input text to analyze
            metadata: Additional metadata
            
        Returns:
            Dictionary containing adversarial analysis results
        """
        if not text:
            return self._empty_analysis()
        
        # Simulate processing time
        processing_time = random.uniform(0.02, 0.06)
        
        # Extract features
        features = self._extract_adversarial_features(text)
        
        # Calculate scores
        llm_score = self._calculate_llm_score(text)
        repetition_score = self._calculate_repetition_score(text)
        unnatural_score = self._calculate_unnatural_score(text)
        statistical_score = self._calculate_statistical_score(text)
        
        # Calculate overall adversarial score
        adversarial_score = self._calculate_adversarial_score(
            llm_score, repetition_score, unnatural_score, statistical_score
        )
        
        # Generate explanations
        explanations = self._generate_explanations(features, adversarial_score)
        
        return {
            'score': min(1.0, adversarial_score),
            'confidence': self._calculate_confidence(adversarial_score),
            'llm_score': llm_score,
            'repetition_score': repetition_score,
            'unnatural_score': unnatural_score,
            'statistical_score': statistical_score,
            'features': features,
            'explanations': explanations,
            'processing_time': processing_time,
            'model_version': 'simulated-adversarial-v1.0'
        }
    
    def _empty_analysis(self) -> Dict[str, Any]:
        """Return empty analysis for invalid input"""
        return {
            'score': 0.0,
            'confidence': 0.0,
            'llm_score': 0.0,
            'repetition_score': 0.0,
            'unnatural_score': 0.0,
            'statistical_score': 0.0,
            'features': {},
            'explanations': {},
            'processing_time': 0.0,
            'model_version': 'simulated-adversarial-v1.0'
        }
    
    def _extract_adversarial_features(self, text: str) -> Dict[str, Any]:
        """Extract features that indicate adversarial/LLM-generated content"""
        features = {
            'length': len(text),
            'word_count': len(text.split()),
            'sentence_count': len(re.split(r'[.!?]+', text)),
            'paragraph_count': len(text.split('\n\n')),
            'avg_word_length': sum(len(word) for word in text.split()) / len(text.split()) if text.split() else 0,
            'avg_sentence_length': len(text.split()) / len(re.split(r'[.!?]+', text)) if re.split(r'[.!?]+', text) else 0,
            'punctuation_ratio': sum(1 for c in text if c in string.punctuation) / len(text) if text else 0,
            'uppercase_ratio': sum(1 for c in text if c.isupper()) / len(text) if text else 0,
            'digit_ratio': sum(1 for c in text if c.isdigit()) / len(text) if text else 0,
            'space_ratio': sum(1 for c in text if c.isspace()) / len(text) if text else 0,
            'unique_word_ratio': len(set(word.lower() for word in text.split())) / len(text.split()) if text.split() else 0,
            'repeated_word_count': 0,
            'llm_phrase_count': 0,
            'unnatural_pattern_count': 0,
            'exclamation_count': text.count('!'),
            'question_count': text.count('?'),
            'period_count': text.count('.'),
            'comma_count': text.count(','),
            'semicolon_count': text.count(';'),
            'colon_count': text.count(':'),
            'quotation_count': text.count('"') + text.count("'"),
            'parentheses_count': text.count('(') + text.count(')'),
            'bracket_count': text.count('[') + text.count(']'),
            'has_emails': bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)),
            'has_urls': bool(re.search(r'https?://', text)),
            'has_phone_numbers': bool(re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', text)),
            'has_dates': bool(re.search(r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b', text)),
            'has_times': bool(re.search(r'\b\d{1,2}:\d{2}\s*(AM|PM|am|pm)?\b', text)),
            'has_currency': bool(re.search(r'\$[\d,]+\.?\d*', text)),
            'has_percentages': bool(re.search(r'\d+%', text))
        }
        
        # Count repeated words
        words = text.lower().split()
        word_counts = Counter(words)
        features['repeated_word_count'] = sum(1 for count in word_counts.values() if count > 1)
        
        # Count LLM phrases
        text_lower = text.lower()
        features['llm_phrase_count'] = sum(1 for phrase in self.llm_indicators if phrase in text_lower)
        
        # Count unnatural patterns
        features['unnatural_pattern_count'] = sum(
            1 for pattern in self.unnatural_patterns if re.search(pattern, text)
        )
        
        return features
    
    def _calculate_llm_score(self, text: str) -> float:
        """Calculate score based on LLM-generated content indicators"""
        text_lower = text.lower()
        score = 0.0
        
        # Check for common LLM phrases
        for phrase in self.llm_indicators:
            if phrase in text_lower:
                score += 0.1
        
        # Check for formal language patterns
        formal_patterns = [
            r'we are writing to',
            r'please be advised',
            r'we have detected',
            r'we apologize for',
            r'thank you for your',
            r'please do not hesitate'
        ]
        
        for pattern in formal_patterns:
            if re.search(pattern, text_lower):
                score += 0.05
        
        # Check for repetitive sentence structures
        sentences = re.split(r'[.!?]+', text)
        if len(sentences) > 2:
            # Check for similar sentence starts
            sentence_starts = [s.strip().split()[0:3] for s in sentences if s.strip()]
            if len(sentence_starts) > 1:
                similar_starts = 0
                for i in range(len(sentence_starts)):
                    for j in range(i + 1, len(sentence_starts)):
                        if sentence_starts[i] == sentence_starts[j]:
                            similar_starts += 1
                
                if similar_starts > 0:
                    score += min(0.3, similar_starts * 0.1)
        
        return min(1.0, score)
    
    def _calculate_repetition_score(self, text: str) -> float:
        """Calculate score based on repetitive content"""
        words = text.lower().split()
        if not words:
            return 0.0
        
        word_counts = Counter(words)
        total_words = len(words)
        unique_words = len(word_counts)
        
        # Calculate repetition ratio
        repetition_ratio = 1 - (unique_words / total_words)
        
        # Check for specific repetitive phrases
        repetitive_count = 0
        for phrase in self.repetitive_phrases:
            phrase_words = phrase.split()
            for i in range(len(words) - len(phrase_words) + 1):
                if words[i:i+len(phrase_words)] == phrase_words:
                    repetitive_count += 1
        
        # Calculate score
        score = repetition_ratio * 0.5 + min(0.5, repetitive_count * 0.1)
        
        return min(1.0, score)
    
    def _calculate_unnatural_score(self, text: str) -> float:
        """Calculate score based on unnatural text patterns"""
        score = 0.0
        
        # Check for unnatural patterns
        for pattern in self.unnatural_patterns:
            matches = re.findall(pattern, text)
            if matches:
                score += min(0.2, len(matches) * 0.05)
        
        # Check for unusual punctuation patterns
        if re.search(r'[!]{3,}', text):
            score += 0.1
        
        if re.search(r'[?]{3,}', text):
            score += 0.1
        
        if re.search(r'[.]{3,}', text):
            score += 0.1
        
        # Check for unusual capitalization
        words = text.split()
        if words:
            all_caps_count = sum(1 for word in words if word.isupper() and len(word) > 1)
            if all_caps_count > len(words) * 0.1:  # More than 10% all caps
                score += 0.1
        
        # Check for unusual spacing
        if re.search(r'\s{3,}', text):  # Multiple spaces
            score += 0.05
        
        return min(1.0, score)
    
    def _calculate_statistical_score(self, text: str) -> float:
        """Calculate score based on statistical text features"""
        features = self._extract_adversarial_features(text)
        score = 0.0
        
        # Unusual word length distribution
        if features['avg_word_length'] > 8:  # Very long average word length
            score += 0.2
        elif features['avg_word_length'] < 3:  # Very short average word length
            score += 0.1
        
        # Unusual sentence length distribution
        if features['avg_sentence_length'] > 25:  # Very long sentences
            score += 0.1
        elif features['avg_sentence_length'] < 5:  # Very short sentences
            score += 0.1
        
        # Unusual punctuation usage
        if features['punctuation_ratio'] > 0.1:  # High punctuation ratio
            score += 0.1
        
        # Low unique word ratio (repetitive)
        if features['unique_word_ratio'] < 0.5:
            score += 0.2
        
        # Unusual character distribution
        if features['uppercase_ratio'] > 0.3:  # Too many uppercase
            score += 0.1
        
        if features['digit_ratio'] > 0.2:  # Too many digits
            score += 0.1
        
        return min(1.0, score)
    
    def _calculate_adversarial_score(self, llm_score: float, repetition_score: float, 
                                   unnatural_score: float, statistical_score: float) -> float:
        """Calculate overall adversarial score"""
        weights = {
            'llm': 0.3,
            'repetition': 0.25,
            'unnatural': 0.25,
            'statistical': 0.2
        }
        
        score = (llm_score * weights['llm'] + 
                repetition_score * weights['repetition'] + 
                unnatural_score * weights['unnatural'] + 
                statistical_score * weights['statistical'])
        
        return min(1.0, score)
    
    def _calculate_confidence(self, score: float) -> float:
        """Calculate confidence in the adversarial detection"""
        # Higher confidence for extreme scores
        if score > 0.8 or score < 0.2:
            return 0.9
        elif score > 0.6 or score < 0.4:
            return 0.7
        else:
            return 0.5
    
    def _generate_explanations(self, features: Dict[str, Any], score: float) -> Dict[str, Any]:
        """Generate explanations for the adversarial detection"""
        explanations = {}
        
        if features['llm_phrase_count'] > 0:
            explanations['llm_phrases'] = f"Found {features['llm_phrase_count']} common LLM-generated phrases"
        
        if features['repeated_word_count'] > 5:
            explanations['repetition'] = f"High repetition detected: {features['repeated_word_count']} repeated words"
        
        if features['unnatural_pattern_count'] > 0:
            explanations['unnatural_patterns'] = f"Found {features['unnatural_pattern_count']} unnatural text patterns"
        
        if features['avg_word_length'] > 8:
            explanations['long_words'] = f"Unusually long average word length: {features['avg_word_length']:.1f} characters"
        
        if features['unique_word_ratio'] < 0.5:
            explanations['low_diversity'] = f"Low vocabulary diversity: {features['unique_word_ratio']:.1%} unique words"
        
        if features['punctuation_ratio'] > 0.1:
            explanations['excessive_punctuation'] = f"High punctuation ratio: {features['punctuation_ratio']:.1%}"
        
        # Determine primary reason
        if score > 0.7:
            if features['llm_phrase_count'] > 0:
                primary_reason = "llm_generated_content"
            elif features['repetition_score'] > 0.5:
                primary_reason = "excessive_repetition"
            elif features['unnatural_score'] > 0.5:
                primary_reason = "unnatural_patterns"
            else:
                primary_reason = "statistical_anomalies"
        else:
            primary_reason = "natural_content"
        
        return {
            'primary_reason': primary_reason,
            'details': explanations,
            'confidence_level': 'high' if score > 0.8 or score < 0.2 else 'medium' if score > 0.6 or score < 0.4 else 'low'
        }

# SIMULATION ONLY — DO NOT USE IN PRODUCTION
"""
Evaluation Script for Phishing Detection Simulation

This script evaluates the performance of the simulated phishing detection
system using the sample test cases and prints metrics.
"""

import json
import time
import sys
import os
from typing import Dict, List, Any, Tuple
from pathlib import Path

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(__file__))

from detectors.model_simulator import ModelSimulator
from utils import load_mock_data

class PhishingDetectionEvaluator:
    """Evaluator for phishing detection simulation"""
    
    def __init__(self):
        self.simulator = ModelSimulator()
        self.test_cases = []
        self.results = []
        
    def load_test_cases(self) -> bool:
        """Load test cases from JSON file"""
        try:
            test_data = load_mock_data('sample_phishing_cases.json')
            self.test_cases = test_data.get('test_cases', [])
            print(f"✅ Loaded {len(self.test_cases)} test cases")
            return True
        except Exception as e:
            print(f"❌ Failed to load test cases: {e}")
            return False
    
    def run_evaluation(self) -> Dict[str, Any]:
        """Run evaluation on all test cases"""
        print("\n🔍 Running evaluation...")
        
        total_cases = len(self.test_cases)
        correct_predictions = 0
        total_latency = 0
        
        # Confusion matrix
        confusion_matrix = {
            'true_positive': 0,    # Correctly identified as malicious
            'true_negative': 0,    # Correctly identified as safe
            'false_positive': 0,   # Incorrectly identified as malicious
            'false_negative': 0    # Incorrectly identified as safe
        }
        
        # Per-verdict accuracy
        verdict_accuracy = {'safe': 0, 'suspicious': 0, 'malicious': 0}
        verdict_counts = {'safe': 0, 'suspicious': 0, 'malicious': 0}
        
        for i, test_case in enumerate(self.test_cases):
            print(f"  Processing case {i+1}/{total_cases}: {test_case['name']}")
            
            # Run analysis
            start_time = time.time()
            result = self.simulator.analyze_content(
                content=test_case['content'],
                content_type=test_case['type'],
                metadata=test_case.get('metadata', {}),
                url=test_case.get('url')
            )
            end_time = time.time()
            
            # Calculate latency
            latency = (end_time - start_time) * 1000
            total_latency += latency
            
            # Check if prediction is correct
            predicted_verdict = result['verdict']
            expected_verdict = test_case['expected_verdict']
            
            is_correct = predicted_verdict == expected_verdict
            if is_correct:
                correct_predictions += 1
                verdict_accuracy[expected_verdict] += 1
            
            verdict_counts[expected_verdict] += 1
            
            # Update confusion matrix
            if expected_verdict == 'malicious':
                if predicted_verdict == 'malicious':
                    confusion_matrix['true_positive'] += 1
                else:
                    confusion_matrix['false_negative'] += 1
            elif expected_verdict == 'safe':
                if predicted_verdict == 'safe':
                    confusion_matrix['true_negative'] += 1
                else:
                    confusion_matrix['false_positive'] += 1
            
            # Store result
            self.results.append({
                'test_case': test_case,
                'result': result,
                'latency_ms': latency,
                'correct': is_correct
            })
        
        # Calculate metrics
        accuracy = correct_predictions / total_cases
        avg_latency = total_latency / total_cases
        
        # Calculate per-verdict accuracy
        for verdict in verdict_accuracy:
            if verdict_counts[verdict] > 0:
                verdict_accuracy[verdict] = verdict_accuracy[verdict] / verdict_counts[verdict]
        
        # Calculate TPR and FPR
        tp = confusion_matrix['true_positive']
        tn = confusion_matrix['true_negative']
        fp = confusion_matrix['false_positive']
        fn = confusion_matrix['false_negative']
        
        tpr = tp / (tp + fn) if (tp + fn) > 0 else 0
        fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
        
        # Calculate precision and recall
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall = tpr
        
        # Calculate F1 score
        f1_score = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
        
        return {
            'total_cases': total_cases,
            'correct_predictions': correct_predictions,
            'accuracy': accuracy,
            'avg_latency_ms': avg_latency,
            'confusion_matrix': confusion_matrix,
            'tpr': tpr,
            'fpr': fpr,
            'precision': precision,
            'recall': recall,
            'f1_score': f1_score,
            'verdict_accuracy': verdict_accuracy,
            'verdict_counts': verdict_counts
        }
    
    def print_results(self, metrics: Dict[str, Any]):
        """Print evaluation results"""
        print("\n" + "=" * 60)
        print("📊 PHISHING DETECTION SIMULATION EVALUATION RESULTS")
        print("=" * 60)
        
        print(f"\n📈 Overall Performance:")
        print(f"  Total Test Cases: {metrics['total_cases']}")
        print(f"  Correct Predictions: {metrics['correct_predictions']}")
        print(f"  Accuracy: {metrics['accuracy']:.1%}")
        print(f"  Average Latency: {metrics['avg_latency_ms']:.1f}ms")
        
        print(f"\n🎯 Detection Metrics:")
        print(f"  True Positive Rate (TPR): {metrics['tpr']:.1%}")
        print(f"  False Positive Rate (FPR): {metrics['fpr']:.1%}")
        print(f"  Precision: {metrics['precision']:.1%}")
        print(f"  Recall: {metrics['recall']:.1%}")
        print(f"  F1 Score: {metrics['f1_score']:.1%}")
        
        print(f"\n📋 Confusion Matrix:")
        cm = metrics['confusion_matrix']
        print(f"  True Positives:  {cm['true_positive']:3d}")
        print(f"  True Negatives:  {cm['true_negative']:3d}")
        print(f"  False Positives: {cm['false_positive']:3d}")
        print(f"  False Negatives: {cm['false_negative']:3d}")
        
        print(f"\n🎭 Per-Verdict Accuracy:")
        for verdict, accuracy in metrics['verdict_accuracy'].items():
            count = metrics['verdict_counts'][verdict]
            print(f"  {verdict.capitalize():12s}: {accuracy:.1%} ({count} cases)")
        
        print(f"\n⚡ Performance Targets:")
        target_tpr = 0.95
        target_fpr = 0.02
        print(f"  Target TPR: {target_tpr:.1%} {'✅' if metrics['tpr'] >= target_tpr else '❌'}")
        print(f"  Target FPR: {target_fpr:.1%} {'✅' if metrics['fpr'] <= target_fpr else '❌'}")
        
        # Overall assessment
        meets_targets = metrics['tpr'] >= target_tpr and metrics['fpr'] <= target_fpr
        print(f"\n🏆 Overall Assessment: {'✅ MEETS TARGETS' if meets_targets else '❌ NEEDS IMPROVEMENT'}")
        
        print("\n" + "=" * 60)
    
    def print_detailed_results(self):
        """Print detailed results for each test case"""
        print("\n📝 Detailed Results:")
        print("-" * 60)
        
        for i, result in enumerate(self.results):
            test_case = result['test_case']
            analysis = result['result']
            
            status = "✅" if result['correct'] else "❌"
            print(f"\n{status} Case {i+1}: {test_case['name']}")
            print(f"  Expected: {test_case['expected_verdict']}")
            print(f"  Predicted: {analysis['verdict']}")
            print(f"  Confidence: {analysis['confidence']:.1%}")
            print(f"  Latency: {result['latency_ms']:.1f}ms")
            
            # Show component scores
            if 'component_scores' in analysis:
                print(f"  Component Scores:")
                for component, data in analysis['component_scores'].items():
                    if isinstance(data, dict) and 'score' in data:
                        print(f"    {component}: {data['score']:.2f}")
    
    def save_results(self, metrics: Dict[str, Any], filename: str = "evaluation_results.json"):
        """Save evaluation results to JSON file"""
        try:
            results_data = {
                'metrics': metrics,
                'detailed_results': self.results,
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'simulation_mode': True
            }
            
            with open(filename, 'w') as f:
                json.dump(results_data, f, indent=2, default=str)
            
            print(f"\n💾 Results saved to {filename}")
        except Exception as e:
            print(f"❌ Failed to save results: {e}")

def main():
    """Main evaluation function"""
    print("🛡️  PHISHING DETECTION SIMULATION EVALUATION")
    print("=" * 60)
    print("⚠️  SIMULATION ONLY - DO NOT USE IN PRODUCTION")
    print("=" * 60)
    
    # Initialize evaluator
    evaluator = PhishingDetectionEvaluator()
    
    # Load test cases
    if not evaluator.load_test_cases():
        return False
    
    # Run evaluation
    metrics = evaluator.run_evaluation()
    
    # Print results
    evaluator.print_results(metrics)
    
    # Print detailed results
    evaluator.print_detailed_results()
    
    # Save results
    evaluator.save_results(metrics)
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

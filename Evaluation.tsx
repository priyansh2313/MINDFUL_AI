import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const Evaluation = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "How often have you felt down or depressed in the last week?",
    "How would you rate your anxiety levels currently?",
    "How well have you been sleeping lately?",
    "How would you rate your stress levels?",
    "How often do you feel overwhelmed by your emotions?"
  ];

  const options = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

  const calculateScore = () => {
    const total = answers.reduce((acc, curr) => acc + curr, 0);
    const maxScore = (questions.length * 4); // 4 is max score per question
    const percentage = (total / maxScore) * 100;
    return {
      score: total,
      maxScore,
      percentage,
      level: percentage <= 25 ? 'Low Risk' : percentage <= 50 ? 'Moderate Risk' : percentage <= 75 ? 'High Risk' : 'Severe Risk'
    };
  };

  const getRecommendations = (level: string) => {
    switch (level) {
      case 'Low Risk':
        return [
          "Continue your current self-care practices",
          "Regular exercise and meditation",
          "Maintain healthy sleep schedule"
        ];
      case 'Moderate Risk':
        return [
          "Consider talking to a friend or family member",
          "Practice stress-reduction techniques",
          "Try journaling your thoughts and feelings"
        ];
      case 'High Risk':
        return [
          "Consider speaking with a mental health professional",
          "Increase self-care activities",
          "Use our journal feature to track your emotions"
        ];
      case 'Severe Risk':
        return [
          "We strongly recommend professional help",
          "Reach out to support systems",
          "Practice daily mindfulness exercises"
        ];
      default:
        return [];
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const result = calculateScore();
    const recommendations = getRecommendations(result.level);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Mental Health Assessment Results</h2>
            <div className="inline-block bg-indigo-100 rounded-full px-6 py-2 text-indigo-800 font-semibold text-lg">
              {result.level}
            </div>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-600">
              Score: {result.score} out of {result.maxScore} ({Math.round(result.percentage)}%)
            </p>
          </div>

          {result.level === 'High Risk' || result.level === 'Severe Risk' ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">
                  Based on your responses, we strongly recommend speaking with a mental health professional.
                </p>
              </div>
            </div>
          ) : null}

          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Recommendations:</h3>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-center text-indigo-800">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/journal')}
              className="bg-indigo-600 text-white rounded-lg px-6 py-3 hover:bg-indigo-700 transition-colors"
            >
              Start Journaling
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-indigo-600 mb-6 hover:text-indigo-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mental Health Evaluation</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-700">
              <strong>Privacy Notice:</strong> This evaluation is completely anonymous. We do not collect or store any personally identifiable information. Your responses are used only to provide you with personalized recommendations.
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            This evaluation consists of {questions.length} questions and will take approximately 5 minutes to complete. Please answer honestly for the most accurate results.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="w-full bg-indigo-600 text-white rounded-md py-3 hover:bg-indigo-700 transition-colors"
          >
            Start Evaluation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-6">{questions[currentQuestion]}</h3>

        <div className="space-y-4">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-4 rounded-lg border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
import React, { useState } from 'react';
import { CheckCircle, Circle, Upload, FileText, CreditCard, Award, User, Shield } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ElementType;
}

function InterpreterOnboarding() {
  const [steps] = useState<OnboardingStep[]>([
    {
      id: '1',
      title: 'Upload Identity Documents',
      description: 'Provide valid government-issued ID and Social Security card',
      completed: true,
      icon: User
    },
    {
      id: '2',
      title: 'Upload Resume/CV',
      description: 'Submit your current resume highlighting interpretation experience',
      completed: true,
      icon: FileText
    },
    {
      id: '3',
      title: 'Sign Service Agreement',
      description: 'Review and electronically sign the interpreter service agreement',
      completed: false,
      icon: Shield
    },
    {
      id: '4',
      title: 'Complete Skills Assessment',
      description: 'Take the language proficiency and interpretation skills test',
      completed: false,
      icon: Award
    },
    {
      id: '5',
      title: 'Set Up Payment Information',
      description: 'Configure your preferred payment method for earnings',
      completed: false,
      icon: CreditCard
    },
    {
      id: '6',
      title: 'Final Review & Activation',
      description: 'Admin review and account activation',
      completed: false,
      icon: CheckCircle
    }
  ]);

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Checklist</h1>
          <p className="text-gray-600 mt-2">Complete all steps to activate your interpreter account</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{completedSteps}/6</div>
          <div className="text-sm text-gray-500">Steps Completed</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isNext = !step.completed && steps.slice(0, index).every(s => s.completed);
          
          return (
            <div 
              key={step.id}
              className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-all ${
                step.completed 
                  ? 'border-green-200 bg-green-50' 
                  : isNext 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : isNext 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    {step.completed && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                    {isNext && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Next Step
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{step.description}</p>

                  {/* Step-specific content */}
                  {step.id === '3' && isNext && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Service Agreement</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Please review the interpreter service agreement carefully before signing.
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Review Agreement
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Download PDF
                        </button>
                      </div>
                    </div>
                  )}

                  {step.id === '4' && isNext && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Skills Assessment</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        This assessment tests your language proficiency and interpretation skills. 
                        It typically takes 45-60 minutes to complete.
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Start Assessment
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Practice Test
                        </button>
                      </div>
                    </div>
                  )}

                  {step.id === '5' && isNext && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Payment Setup</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Configure how you'd like to receive your earnings. We support multiple payment methods.
                      </p>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Set Up Payment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      {completedSteps < steps.length && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What's Next?</h3>
          <p className="text-blue-800 mb-4">
            Complete the remaining {steps.length - completedSteps} steps to activate your account 
            and start receiving interpretation assignments.
          </p>
          <div className="flex space-x-3">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Continue Onboarding
            </button>
            <button className="px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      )}

      {completedSteps === steps.length && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">Onboarding Complete!</h3>
              <p className="text-green-800 mt-1">
                Your account is now active and you can start receiving interpretation assignments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterpreterOnboarding;
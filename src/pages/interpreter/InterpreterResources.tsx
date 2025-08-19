import React from 'react';
import { useData } from '../../contexts/DataContext';
import { FileText, Video, BookOpen, Download, ExternalLink } from 'lucide-react';

function InterpreterResources() {
  const { resources } = useData();

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'guide': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-700';
      case 'video': return 'bg-purple-100 text-purple-700';
      case 'guide': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training Resources</h1>
          <p className="text-gray-600 mt-2">Access training materials, guides, and educational content</p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Documents</h3>
          </div>
          <p className="text-blue-800 text-sm">
            Reference materials, guidelines, and essential documentation for interpreters.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900">Videos</h3>
          </div>
          <p className="text-purple-800 text-sm">
            Interactive training videos and webinars to enhance your interpretation skills.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900">Guides</h3>
          </div>
          <p className="text-green-800 text-sm">
            Step-by-step guides and best practices for various interpretation scenarios.
          </p>
        </div>
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Resources</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {resources.map((resource) => {
            const Icon = getIcon(resource.type);
            
            return (
              <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Added {resource.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {resources.length === 0 && (
          <div className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Resources Available</h3>
            <p className="text-gray-500">Training resources will appear here once they're added by the admin.</p>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How often are new training materials added?</h3>
            <p className="text-gray-600">
              We regularly update our training library with new materials. Check back weekly for the latest resources 
              and industry best practices.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Are there certification programs available?</h3>
            <p className="text-gray-600">
              Yes, we offer various certification tracks for specialized interpretation areas including medical, 
              legal, and conference interpretation. Contact support for more information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Can I suggest new training topics?</h3>
            <p className="text-gray-600">
              Absolutely! We welcome suggestions from our interpreter community. Use the feedback feature 
              in your dashboard or contact our training team directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterpreterResources;
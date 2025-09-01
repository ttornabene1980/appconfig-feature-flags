"use client";

import React, { useState, useRef } from 'react';
import { 
  Database, 
  Upload, 
  Search, 
  Brain, 
  FileText, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Plus,
  Filter,
  Download,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Server,
  Zap,
  MessageSquare,
  TrendingUp,
  Users,
  Shield,
  Home
} from 'lucide-react';

const RAGPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Tax Compliance Dataset', status: 'active', documents: 1247, accuracy: 94.2 },
    { id: 2, name: 'Citizen Services KB', status: 'training', documents: 892, accuracy: 87.5 },
    { id: 3, name: 'Regulatory Updates', status: 'ready', documents: 2103, accuracy: 96.1 }
  ]);
  const fileInputRef = useRef(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'data-import', label: 'Data Import', icon: Upload },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'vector-search', label: 'Vector Search', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleFileUpload = () => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const DataImportSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Data Import & Training</h2>
        <p className="opacity-90">Upload and process data from multiple sources to enhance your AI models</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <FileSpreadsheet className="h-8 w-8 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold">File Upload</h3>
          </div>
          <p className="text-gray-600 mb-4">Support for CSV, Excel, Parquet, and text files</p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Choose Files
          </button>q
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept=".csv,.xlsx,.parquet,.txt,.pdf"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <Server className="h-8 w-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold">Database Connection</h3>
          </div>
          <p className="text-gray-600 mb-4">Connect to Oracle, PostgreSQL, MySQL</p>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
            Configure DB
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold">Real-time Sync</h3>
          </div>
          <p className="text-gray-600 mb-4">Automatic data synchronization</p>
          <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
            Setup Sync
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Processing Data</h3>
            <span className="text-sm text-gray-500">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const DashboardSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Projects</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Documents Processed</p>
              <p className="text-2xl font-bold text-gray-800">45.2K</p>
            </div>
            <Database className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Query Accuracy</p>
              <p className="text-2xl font-bold text-gray-800">94.7%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-gray-800">1,247</p>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.documents} documents</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    project.status === 'active' ? 'text-green-600' : 
                    project.status === 'training' ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {project.status}
                  </p>
                  <p className="text-sm text-gray-500">{project.accuracy}% accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-lg font-semibold mb-4">RAG Pipeline Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Data Ingestion</span>
              </div>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Vector Indexing</span>
              </div>
              <span className="text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                <span>Model Training</span>
              </div>
              <span className="text-orange-600 font-medium">In Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VectorSearchSection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border">
        <h3 className="text-lg font-semibold mb-4">Semantic Search</h3>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter your query to search across all documents..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Tax Regulations
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Citizen Services
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            Compliance
          </button>
        </div>

        <div className="border-t pt-4">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium text-blue-600 mb-2">Tax Code Section 401(k) Contributions</h4>
              <p className="text-gray-600 text-sm mb-2">Employees may contribute up to the annual limit for 401(k) plans, with additional catch-up contributions...</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Relevance: 94.2%</span>
                <span>Document: IRS_Publication_590.pdf</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium text-blue-600 mb-2">Citizen Identity Verification Process</h4>
              <p className="text-gray-600 text-sm mb-2">The standard process for verifying citizen identity requires two forms of documentation...</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Relevance: 87.3%</span>
                <span>Document: Identity_Verification_Guidelines.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AIAssistantSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border h-96 flex flex-col">
        <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
          <h3 className="text-lg font-semibold">AI Tax & Citizen Services Assistant</h3>
          <p className="text-sm opacity-90">Get instant answers from your knowledge base</p>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
              <p className="text-sm">Hello! I can help you with tax regulations, citizen services, and compliance questions. What would you like to know?</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
              <p className="text-sm">What are the current 401(k) contribution limits for 2024?</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-md">
              <p className="text-sm">For 2024, the 401(k) contribution limit is $23,000 for employees under 50. Those 50 and older can contribute an additional $7,500 as a catch-up contribution, for a total of $30,500.</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about tax laws, regulations, or citizen services..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardSection />;
      case 'data-import': return <DataImportSection />;
      case 'vector-search': return <VectorSearchSection />;
      case 'ai-chat': return <AIAssistantSection />;
      case 'projects':
        return (
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-lg font-semibold mb-4">Project Management</h3>
            <p className="text-gray-600">Manage your AI training projects and datasets.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-lg font-semibold mb-4">Analytics & Insights</h3>
            <p className="text-gray-600">View performance metrics and usage analytics.</p>
          </div>
        );
      case 'integrations':
        return (
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-lg font-semibold mb-4">Database Integrations</h3>
            <p className="text-gray-600">Configure connections to external databases and APIs.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-lg font-semibold mb-4">System Settings</h3>
            <p className="text-gray-600">Configure system preferences and user management.</p>
          </div>
        );
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-xl font-bold text-gray-800">AI RAG Platform</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Shield className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>System Operational</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default RAGPlatform;

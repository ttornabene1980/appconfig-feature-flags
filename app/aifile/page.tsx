"use client";
 
import React, { useState } from 'react';
import { Upload, FileText, Brain, Sparkles, BarChart3, Trash2, CheckCircle, ArrowRight, Table, Eye, Settings } from 'lucide-react';

const DataWizardWireframe = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);

  const steps = [
    { id: 1, title: 'Upload File', icon: Upload },
    { id: 2, title: 'Extract & View', icon: Eye },
    { id: 3, title: 'AI Model Creation', icon: Brain },
    { id: 4, title: 'Clean Data', icon: Trash2 },
    { id: 5, title: 'Analysis & Charts', icon: BarChart3 },
    { id: 6, title: 'Form Organization', icon: Settings }
  ];

  const handleFileUpload = () => {
    setUploadedFile('sample_data.csv');
    setCurrentStep(2);
  };

  const StepIndicator = () => (
    <div className="flex justify-between mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            currentStep >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            <step.icon size={20} />
          </div>
          <span className="text-xs mt-2 text-center">{step.title}</span>
          {index < steps.length - 1 && (
            <ArrowRight className="absolute mt-5 ml-12 text-gray-300" size={16} />
          )}
        </div>
      ))}
    </div>
  );

  const Step1Upload = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Data File</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-lg mb-4">Drag & drop your file here or click to browse</p>
        <p className="text-sm text-gray-500 mb-6">Supports CSV, Excel, JSON, XML, PDF files</p>
        <button 
          onClick={handleFileUpload}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Choose File
        </button>
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">💡 Chat Assistant Available</h3>
        <p className="text-sm text-gray-600">Ask me anything about your data processing needs!</p>
      </div>
    </div>
  );

  const Step2Extract = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Data Extraction & View</h2>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          📄 {uploadedFile} loaded
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Table View</h3>
              <button className="text-blue-500 text-sm">Switch to Text View</button>
            </div>
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Age</th>
                    <th className="border p-2 text-left">Department</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">John Doe</td><td className="border p-2">john@email.com</td><td className="border p-2">28</td><td className="border p-2">Engineering</td></tr>
                  <tr><td className="border p-2">Jane Smith</td><td className="border p-2">jane@email.com</td><td className="border p-2">32</td><td className="border p-2">Marketing</td></tr>
                  <tr><td className="border p-2">Bob Johnson</td><td className="border p-2">bob@email.com</td><td className="border p-2">45</td><td className="border p-2">Sales</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white border rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-3">Tokenization Analysis</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span>Total Rows:</span><span>1,247</span></div>
              <div className="flex justify-between"><span>Columns:</span><span>12</span></div>
              <div className="flex justify-between"><span>Missing Values:</span><span>23</span></div>
              <div className="flex justify-between"><span>Data Types:</span><span>Mixed</span></div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Quick Insights</h3>
            <ul className="text-sm space-y-1">
              <li>• Email format validation needed</li>
              <li>• Age column has outliers</li>
              <li>• Department field standardization required</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setCurrentStep(3)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          Create AI Model <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const Step3AIModel = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">AI Model & Dynamic Form Creation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="text-purple-500" size={20} />
            AI Model Suggestions
          </h3>
          <div className="space-y-4">
            <div className="p-3 border rounded bg-purple-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Employee Data Validation</h4>
                <span className="text-xs bg-purple-200 px-2 py-1 rounded">Recommended</span>
              </div>
              <p className="text-sm text-gray-600">Validate employee records with email, age, and department rules</p>
              <div className="mt-2 text-xs text-purple-600">Confidence: 94%</div>
            </div>
            
            <div className="p-3 border rounded">
              <h4 className="font-medium">Contact Form Generator</h4>
              <p className="text-sm text-gray-600">Create contact forms based on data structure</p>
              <div className="mt-2 text-xs text-gray-500">Confidence: 78%</div>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
            Generate AI Model
          </button>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="text-yellow-500" size={20} />
            Dynamic Form Preview
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input className="w-full border rounded px-3 py-2" placeholder="Enter full name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address *</label>
              <input className="w-full border rounded px-3 py-2" placeholder="name@company.com" />
              <p className="text-xs text-gray-500 mt-1">AI validation: Email format check</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input className="w-full border rounded px-3 py-2" type="number" placeholder="25" />
              <p className="text-xs text-gray-500 mt-1">AI validation: 18-65 range</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>HR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setCurrentStep(4)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          Clean Data <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const Step4Clean = () => (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Data Cleaning & Validation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Cleaning Operations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                <div>
                  <span className="font-medium">Remove duplicates</span>
                  <p className="text-sm text-gray-600">Found 12 duplicate entries</p>
                </div>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Fix</button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                <div>
                  <span className="font-medium">Standardize emails</span>
                  <p className="text-sm text-gray-600">23 emails need formatting</p>
                </div>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Fix</button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <div>
                  <span className="font-medium">Validate age ranges</span>
                  <p className="text-sm text-gray-600">All ages within valid range</p>
                </div>
                <CheckCircle className="text-green-500" size={20} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Cleaning Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Original rows:</span>
                <span>1,247</span>
              </div>
              <div className="flex justify-between">
                <span>After cleaning:</span>
                <span className="text-green-600">1,235</span>
              </div>
              <div className="flex justify-between">
                <span>Issues fixed:</span>
                <span className="text-blue-600">35</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setCurrentStep(5)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          Analyze Data <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const Step5Analysis = () => (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Data Analysis & Insights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Department Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Engineering</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <span className="text-sm">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Marketing</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  <span className="text-sm">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-3">📊 Top Insights</h3>
            <ul className="space-y-2 text-sm">
              <li className="p-2 bg-blue-50 rounded">Most common age: 28-35 years</li>
              <li className="p-2 bg-green-50 rounded">Email domains: gmail.com leads</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setCurrentStep(6)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          Organize Forms <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const Step6Organization = () => (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Form Organization & Validation</h2>
      
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold mb-4">📋 Form Structure Generated</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="p-3 border rounded bg-gray-50">
              <h4 className="font-medium mb-2">Section 1: Personal Info</h4>
              <ul className="text-sm space-y-1">
                <li>• Full Name (required)</li>
                <li>• Email Address (required, email validation)</li>
                <li>• Age (optional, 18-65 range)</li>
              </ul>
            </div>
            
            <div className="p-3 border rounded bg-gray-50">
              <h4 className="font-medium mb-2">Section 2: Professional Info</h4>
              <ul className="text-sm space-y-1">
                <li>• Department (dropdown)</li>
                <li>• Position (optional)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded text-xs font-mono">
            <div className="text-green-400">// React + Next.js Form</div>
            <div className="text-blue-400">import</div> {`{ useForm } `}<div className="text-blue-400">from</div> <div className="text-yellow-400">'react-hook-form'</div>;<br/><br/>
            
            <div className="text-blue-400">export default function</div> <div className="text-yellow-400">Form</div>() {`{`}<br/>
            &nbsp;&nbsp;<div className="text-blue-400">const</div> {`{ register, handleSubmit } = useForm();`}<br/><br/>
            
            &nbsp;&nbsp;<div className="text-blue-400">return</div> (<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<div className="text-red-400">form</div>&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<div className="text-red-400">input</div> {`{...register("name", { required: true })}`} /&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<div className="text-red-400">input</div> {`{...register("email", { required: true })}`} /&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<div className="text-red-400">form</div>&gt;<br/>
            &nbsp;&nbsp;);<br/>
            {`}`}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">🎉 Wizard Complete!</h3>
          <p className="text-green-700">Your AI-powered data processing workflow is ready!</p>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch(currentStep) {
      case 1: return <Step1Upload />;
      case 2: return <Step2Extract />;
      case 3: return <Step3AIModel />;
      case 4: return <Step4Clean />;
      case 5: return <Step5Analysis />;
      case 6: return <Step6Organization />;
      default: return <Step1Upload />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Data Processing Wizard</h1>
          <p className="text-gray-600">Transform your data with intelligent processing and form generation</p>
        </div>
        
        <StepIndicator />
        {renderStep()}
      </div>
    </div>
  );
};

export default DataWizardWireframe;
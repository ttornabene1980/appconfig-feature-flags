"use client";
 
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  BarChart3, 
  Map, 
  Code, 
  MessageSquare, 
  TestTube,
  Home,
  Bell,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Download,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const LombardyTaxSystem = () => {
  const [activeRole, setActiveRole] = useState('citizen');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('dashboard');

  const roles = {
    citizen: { name: 'Cittadino', icon: Users, color: 'bg-green-600' },
    institutional: { name: 'Istituzionale', icon: BarChart3, color: 'bg-blue-600' },
    datascience: { name: 'Data Science', icon: Map, color: 'bg-purple-600' },
    devops: { name: 'DevOps', icon: Code, color: 'bg-orange-600' },
    testing: { name: 'Test Automation', icon: TestTube, color: 'bg-red-600' }
  };

  const features = {
    citizen: [
      { id: 'sdd', name: 'Gestione SDD', icon: CreditCard },
      { id: 'history', name: 'Storico Richieste', icon: Clock },
      { id: 'payments', name: 'Pagamenti', icon: CheckCircle }
    ],
    institutional: [
      { id: 'aggregation', name: 'Dati Aggregati', icon: BarChart3 },
      { id: 'ai-reports', name: 'Report AI', icon: Download },
      { id: 'tax-lex', name: 'AI Tax Lex', icon: Search }
    ],
    datascience: [
      { id: 'map-view', name: 'Mappa Città', icon: Map },
      { id: 'timeline', name: 'Timeline Analisi', icon: Calendar },
      { id: 'ai-query', name: 'Query AI', icon: Search }
    ],
    devops: [
      { id: 'live-deploy', name: 'Deploy Live', icon: Code },
      { id: 'monitoring', name: 'Monitoraggio', icon: Eye },
      { id: 'artifacts', name: 'Gestione Artifact', icon: Settings }
    ],
    testing: [
      { id: 'auto-test', name: 'Test Automatici', icon: TestTube },
      { id: 'performance', name: 'Performance', icon: BarChart3 },
      { id: 'security', name: 'Security Test', icon: AlertTriangle }
    ]
  };

  const renderCitizenSDD = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attiva Nuovo SDD</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="IT60 X054 2811 1010 0000 0123 456" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SWIFT/BIC</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="BCITITMM" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Mario" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cognome</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Rossi" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Codice Fiscale</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="RSSMRA80A01F205X" />
            </div>
          </div>
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
            Attiva SDD
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SDD Attivi</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Intesa Sanpaolo</div>
                <div className="text-sm text-gray-600">****1234 • 15/03/2024</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Attivo
                </span>
                <button className="text-red-600 hover:text-red-800">
                  <XCircle size={16} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">UniCredit</div>
                <div className="text-sm text-gray-600">****5678 • 12/02/2024</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                  Sospeso
                </span>
                <button className="text-red-600 hover:text-red-800">
                  <XCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInstitutionalView = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Costi Totali</p>
                <p className="text-2xl font-bold text-gray-900">€2.4M</p>
              </div>
              <BarChart3 className="text-blue-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SDD Attivi</p>
                <p className="text-2xl font-bold text-gray-900">15,423</p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Richieste Pending</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
              <Clock className="text-orange-600" size={32} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">AI Tax Lex Assistant</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Nuovo Report
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">Analisi Compliance 2024</div>
              <div className="text-sm text-blue-700 mt-1">Report generato automaticamente su normative fiscali aggiornate</div>
              <div className="flex gap-2 mt-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Visualizza</button>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDataScienceView = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Mappa Analisi per Città</h3>
            <div className="flex gap-2">
              <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                <Filter size={16} className="inline mr-1" />
                Filtri
              </button>
              <button className="border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                <Calendar size={16} className="inline mr-1" />
                Timeline
              </button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Map size={48} className="text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Mappa Interattiva Lombardia</p>
              <p className="text-sm text-gray-500">Visualizzazione dati per comune</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Query Builder</h3>
          <div className="space-y-3">
            <textarea 
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-20" 
              placeholder="Scrivi una query in linguaggio naturale: 'Mostra i comuni con più richieste SDD negli ultimi 6 mesi'"
            />
            <div className="flex gap-2">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Esegui Query
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                Salva Query
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDevOpsView = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Live Deploy Dashboard</h3>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
              <Plus size={16} className="inline mr-1" />
              New Deploy
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Frontend v2.1.3</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Live</span>
              </div>
              <div className="text-sm text-gray-600">Deploy: 30 min ago</div>
              <div className="flex gap-2 mt-2">
                <button className="text-orange-600 hover:text-orange-800 text-sm">Rollback</button>
                <button className="text-orange-600 hover:text-orange-800 text-sm">Logs</button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">API v1.8.2</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Live</span>
              </div>
              <div className="text-sm text-gray-600">Deploy: 2 hours ago</div>
              <div className="flex gap-2 mt-2">
                <button className="text-orange-600 hover:text-orange-800 text-sm">Rollback</button>
                <button className="text-orange-600 hover:text-orange-800 text-sm">Logs</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Claude Code Integration</h3>
          <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
            <div>$ claude-code generate --feature "tax-calculator"</div>
            <div className="text-gray-500">Generating React component...</div>
            <div className="text-gray-500">✓ Component created: TaxCalculator.tsx</div>
            <div className="text-gray-500">✓ Tests generated: TaxCalculator.test.tsx</div>
            <div className="text-gray-500">✓ Ready for deployment</div>
          </div>
        </div>
      </div>
    );
  };

  const renderTestingView = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Test Coverage</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <TestTube className="text-green-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Performance Score</p>
                <p className="text-2xl font-bold text-gray-900">87/100</p>
              </div>
              <BarChart3 className="text-blue-600" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security Issues</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <AlertTriangle className="text-orange-600" size={32} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Automated Test Suite</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">SDD Integration Tests</div>
                <div className="text-sm text-gray-600">Coverage: 98% • Time: 2.3s</div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Passed
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">API Security Tests</div>
                <div className="text-sm text-gray-600">Coverage: 85% • Time: 5.1s</div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                Failed
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">Performance Tests</div>
                <div className="text-sm text-gray-600">Coverage: 92% • Time: 12.7s</div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Passed
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHelpDeskMessages = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Centro Assistenza</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            <MessageSquare size={16} className="inline mr-1" />
            Nuovo Ticket
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">#12345 - Problema attivazione SDD</div>
              <div className="text-sm text-gray-600">29/08/2025</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                Alta
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                In corso
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">#12344 - Richiesta report personalizzato</div>
              <div className="text-sm text-gray-600">28/08/2025</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                Media
              </span>
              <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Risolto
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    switch (selectedFeature) {
      case 'sdd':
        return renderCitizenSDD();
      case 'dashboard':
        if (activeRole === 'institutional') return renderInstitutionalView();
        if (activeRole === 'datascience') return renderDataScienceView();
        if (activeRole === 'devops') return renderDevOpsView();
        if (activeRole === 'testing') return renderTestingView();
        return renderCitizenSDD();
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="text-gray-400 mb-2">Feature in sviluppo</div>
            <div className="text-sm text-gray-600">Questa sezione sarà disponibile prossimamente</div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Logo Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
              RL
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="font-bold text-green-700">Regione Lombardia</div>
                <div className="text-xs text-gray-600">Tax AI System</div>
              </div>
            )}
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute right-0 top-4 transform translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Role Selector */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ruolo Attivo</label>
            <select 
              value={activeRole} 
              onChange={(e) => setActiveRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {Object.entries(roles).map(([key, role]) => (
                <option key={key} value={key}>{role.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setSelectedFeature('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedFeature === 'dashboard' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>
            
            {features[activeRole] && features[activeRole].map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedFeature === feature.id ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
                }`}
              >
                <feature.icon size={20} />
                {!sidebarCollapsed && <span>{feature.name}</span>}
              </button>
            ))}
            
            <button
              onClick={() => setSelectedFeature('messages')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedFeature === 'messages' ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={20} />
              {!sidebarCollapsed && <span>Assistenza</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {roles[activeRole].name} Dashboard
              </h1>
              <p className="text-sm text-gray-600">Sistema di gestione fiscale AI-powered</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${roles[activeRole].color} rounded-full flex items-center justify-center text-white`}>
                  {React.createElement(roles[activeRole].icon, { size: 16 })}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {activeRole === 'citizen' ? 'Mario Rossi' : 'Operatore Sistema'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderMainContent()}
          {selectedFeature !== 'messages' && renderHelpDeskMessages()}
        </main>
      </div>
    </div>
  );
};

export default LombardyTaxSystem;
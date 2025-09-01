"use client";

import React, { useState } from 'react';
import { 
  Menu, X, Home, Users, BarChart3, Database, Settings, 
  MessageSquare, Bot, TestTube, Shield, CreditCard, MapPin,
  Clock, Search, FileText, AlertCircle, CheckCircle, XCircle,
  Send, Download, Upload, Play, RotateCcw,
  TrendingUp, Activity, Bell, User
} from 'lucide-react';

const TaxAIPlatform = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [userRole, setUserRole] = useState('citizen');
  const [notifications] = useState(3);
  const [helpDeskMessages, setHelpDeskMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [priority, setPriority] = useState('medium');

  const sddRequests = [
    { id: 1, status: 'active', iban: 'IT60X0542811101000000123456', name: 'Mario Rossi', cf: 'RSSMRA80A01H501Z', date: '2024-08-15', amount: 150.00 },
    { id: 2, status: 'pending', iban: 'IT89F0300203280123456789012', name: 'Giulia Bianchi', cf: 'BNCGLI85B15F205Y', date: '2024-08-20', amount: 200.00 },
    { id: 3, status: 'rejected', iban: 'IT45L1234512345123456789012', name: 'Luca Verdi', cf: 'VRDLCU90C20G273W', date: '2024-08-18', amount: 75.50 }
  ];

  const roles = {
    citizen: 'Cittadino',
    institutional: 'Attore Istituzionale', 
    data_scientist: 'Data Scientist',
    devops: 'DevOps Engineer',
    ai_expert: 'AI Expert',
    tester: 'Test Automation'
  };

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'help', label: 'Help Desk', icon: MessageSquare, badge: notifications }
    ];

    const roleSpecificItems = {
      citizen: [
        { id: 'sdd', label: 'SDD Management', icon: CreditCard },
        { id: 'payments', label: 'Payments History', icon: Clock },
        { id: 'profile', label: 'Profile', icon: User }
      ],
      institutional: [
        { id: 'analytics', label: 'Data Analytics', icon: BarChart3 },
        { id: 'reports', label: 'AI Reports', icon: FileText },
        { id: 'costs', label: 'Cost Analysis', icon: TrendingUp }
      ],
      data_scientist: [
        { id: 'datasets', label: 'Datasets', icon: Database },
        { id: 'maps', label: 'Geographic Analysis', icon: MapPin },
        { id: 'queries', label: 'Custom Queries', icon: Search }
      ],
      devops: [
        { id: 'deployment', label: 'Deployment', icon: Upload },
        { id: 'monitoring', label: 'Monitoring', icon: Activity },
        { id: 'logs', label: 'System Logs', icon: FileText }
      ],
      ai_expert: [
        { id: 'ml', label: 'ML Tasks', icon: Bot },
        { id: 'agents', label: 'AI Agents', icon: Settings },
        { id: 'workflows', label: 'AI Workflows', icon: Activity }
      ],
      tester: [
        { id: 'testing', label: 'Test Suite', icon: TestTube },
        { id: 'security', label: 'Security Tests', icon: Shield },
        { id: 'performance', label: 'Performance', icon: TrendingUp }
      ]
    };

    return [...baseItems, ...roleSpecificItems[userRole] || []];
  };

  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">RL</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Tax AI Management</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Object.entries(roles).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
          
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );

  const Sidebar = () => (
    <div className={`
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out
      lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200
    `}>
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-green-700 to-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">RL</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Regione</div>
            <div className="text-sm text-green-600 font-medium">Lombardia</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {getNavItems().map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                activeModule === item.id 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  const CitizenSDD = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Richiesta Attivazione SDD</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="IBAN"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="SWIFT/BIC"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Nome"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Cognome"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Codice Fiscale"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Importo"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Invia Richiesta
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Storico Richieste SDD</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Data</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">IBAN</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Importo</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {sddRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{request.date}</td>
                  <td className="py-3 px-4 font-mono text-sm">{request.iban}</td>
                  <td className="py-3 px-4">€{request.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'active' ? 'bg-green-100 text-green-800' :
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'active' ? 'Attivo' : 
                       request.status === 'pending' ? 'In attesa' : 'Rifiutato'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {request.status === 'active' && (
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Annulla
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const DataAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">SDD Attivi</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Volume Mensile</p>
              <p className="text-2xl font-bold text-gray-900">€2.4M</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasso Successo</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">AI Report Generator</h3>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Report Mensile</option>
              <option>Report Trimestrale</option>
              <option>Report Annuale</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <span>Genera Report AI</span>
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Utilizzo l'AI per analizzare i trend dei pagamenti SDD e generare insight personalizzati...
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const HelpDesk = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Nuovo Messaggio Help Desk</h2>
        <div className="space-y-4">
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="low">Priorità Bassa</option>
            <option value="medium">Priorità Media</option>
            <option value="high">Priorità Alta</option>
            <option value="urgent">Urgente</option>
          </select>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Descrivi il tuo problema o richiesta..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button 
            onClick={() => {
              if (newMessage.trim()) {
                setHelpDeskMessages([...helpDeskMessages, {
                  id: Date.now(),
                  message: newMessage,
                  priority,
                  status: 'open',
                  date: new Date().toLocaleDateString('it-IT')
                }]);
                setNewMessage('');
              }
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Invia Messaggio</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Storico Messaggi</h3>
        <div className="space-y-4">
          {helpDeskMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nessun messaggio inviato</p>
          ) : (
            helpDeskMessages.map((msg) => (
              <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    msg.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    msg.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    msg.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {msg.priority === 'urgent' ? 'Urgente' : 
                     msg.priority === 'high' ? 'Alta' :
                     msg.priority === 'medium' ? 'Media' : 'Bassa'}
                  </span>
                  <span className="text-sm text-gray-500">{msg.date}</span>
                </div>
                <p className="text-gray-700">{msg.message}</p>
                <div className="mt-2">
                  <span className="text-xs text-green-600 font-medium">Status: Aperto</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">SDD Attivi</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Utenti Registrati</p>
              <p className="text-2xl font-bold">3,421</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Volume Mensile</p>
              <p className="text-2xl font-bold">€2.4M</p>
            </div>
            <BarChart3 className="w-8 h-8 text-yellow-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">AI Queries</p>
              <p className="text-2xl font-bold">847</p>
            </div>
            <Bot className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Attività Recenti</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">SDD Attivato</p>
                <p className="text-xs text-gray-500">Mario Rossi - 2 minuti fa</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Richiesta in Revisione</p>
                <p className="text-xs text-gray-500">Giulia Bianchi - 5 minuti fa</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">SDD Rifiutato</p>
                <p className="text-xs text-gray-500">Luca Verdi - 10 minuti fa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Funzionalità AI</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Bot className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">AI Assistant</span>
              </div>
              <p className="text-sm text-blue-600">Supporto intelligente per tutte le operazioni</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Document Scanner</span>
              </div>
              <p className="text-sm text-green-600">OCR automatico per documenti fiscali</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-800">Fraud Detection</span>
              </div>
              <p className="text-sm text-red-600">Rilevamento automatico anomalie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'sdd':
        return <CitizenSDD />;
      case 'analytics':
        return <DataAnalytics />;
      case 'help':
        return <HelpDesk />;
      default:
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Modulo {roles[userRole]}</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Funzionalità in Sviluppo</h3>
              <p className="text-sm text-blue-600 mb-4">
                Questo modulo è in fase di sviluppo per il ruolo: <strong>{roles[userRole]}</strong>
              </p>
              <div className="space-y-2 text-sm text-blue-700">
                {userRole === 'data_scientist' && (
                  <div>
                    <p>• Analisi geografica con mappe interattive</p>
                    <p>• Query personalizzate AI-assistite</p>
                    <p>• Timeline analysis con filtri avanzati</p>
                    <p>• Full-text search su dataset</p>
                  </div>
                )}
                {userRole === 'devops' && (
                  <div>
                    <p>• Integrazione Claude Code</p>
                    <p>• Deployment automatizzato</p>
                    <p>• Monitoring in tempo reale</p>
                    <p>• Rollback e versioning</p>
                  </div>
                )}
                {userRole === 'ai_expert' && (
                  <div>
                    <p>• Training modelli ML personalizzati</p>
                    <p>• MCP Server integration</p>
                    <p>• Custom AI workflow builder</p>
                    <p>• Metriche avanzate (precision, recall)</p>
                  </div>
                )}
                {userRole === 'tester' && (
                  <div>
                    <p>• Test automation suite</p>
                    <p>• Security vulnerability scanning</p>
                    <p>• Performance benchmarking</p>
                    <p>• Bug reproduction automatica</p>
                  </div>
                )}
                {userRole === 'institutional' && (
                  <div>
                    <p>• Dashboard analytics avanzate</p>
                    <p>• Report personalizzati con AI</p>
                    <p>• Analisi costi e ROI</p>
                    <p>• Compliance monitoring</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
        <Header />
        <main className="p-6">
          {renderModule()}
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TaxAIPlatform;
r
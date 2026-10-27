import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { DataProfilingView } from './components/DataProfilingView';
import { DataPreviewTable } from './components/DataPreviewTable';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { FileUploadModal } from './components/FileUploadModal';
import { FilterDrawer } from './components/FilterDrawer';
import { AddChartModal } from './components/AddChartModal';
import { ExportModal } from './components/ExportModal';
import { SettingsModal } from './components/SettingsModal';
import { Toast } from './components/Toast';
import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  UploadCloud,
  FileSpreadsheet,
  BrainCircuit
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { dataset, loading, error, activeTab, loadSampleDataset, setIsUploadOpen, isCopilotOpen } = useDashboard();
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-indigo-500/30 selection:text-indigo-400">
      {/* Top Navbar */}
      <Navbar onOpenExport={() => setIsExportOpen(true)} />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Sidebar */}
        <Sidebar />

        {/* Dynamic Content View Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading Overlay */}
            {loading && !dataset && (
              <div className="flex flex-col items-center justify-center py-28 text-center space-y-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 animate-pulse">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin absolute -top-2 -right-2" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Analyzing Dataset & Generating Dashboard...
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1">
                    Inferring column datatypes, detecting outliers, computing correlations, and synthesizing charts.
                  </p>
                </div>
              </div>
            )}

            {/* Error Fallback */}
            {error && !dataset && (
              <div className="p-8 text-center max-w-md mx-auto my-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 text-rose-400" />
                <h3 className="text-base font-bold">Failed to Load Dataset</h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 mb-4">{error}</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => loadSampleDataset('ecommerce')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Load Default E-Commerce Data</span>
                  </button>
                  <button
                    onClick={() => setIsUploadOpen(true)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload CSV / Excel</span>
                  </button>
                </div>
              </div>
            )}

            {/* Loaded Workspace Screens */}
            {dataset && (
              <div id="dashboard-capture-root" className="space-y-6">
                {activeTab === 'dashboard' && <DashboardView />}
                {activeTab === 'profiling' && <DataProfilingView />}
                {activeTab === 'explorer' && <DataPreviewTable />}
                {activeTab === 'insights' && <AIInsightsPanel />}
                {activeTab === 'copilot' && <AICopilotDrawer isDrawer={false} />}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Docked / Floating Copilot on the Bottom Left */}
      {activeTab !== 'copilot' && (
        <AICopilotDrawer isDrawer={true} />
      )}

      {/* Global Modals & Drawers */}
      <FileUploadModal />
      <FilterDrawer />
      <AddChartModal />
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <SettingsModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <DashboardProvider>
      <MainLayout />
    </DashboardProvider>
  );
}

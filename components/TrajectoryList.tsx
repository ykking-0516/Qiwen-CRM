import React, { useState } from 'react';
import { MOCK_TRAJECTORIES } from '../constants';
import { Trajectory, ActivityType } from '../types';
import { 
  Search, Filter, Calendar, Download, RefreshCw, AlertTriangle, 
  List, LayoutList, Grip, Clock, ChevronDown, X, MessageSquare, MapPin, Eye, AlertCircle
} from 'lucide-react';
import TrajectoryAnalysis from './TrajectoryAnalysis';

type ViewMode = 'list' | 'timeline' | 'heatmap';
type Tab = 'data' | 'analysis';

const TrajectoryList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('data');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrajectory, setSelectedTrajectory] = useState<Trajectory | null>(null);

  // Filter States
  const [filters, setFilters] = useState({
    activityType: 'all',
    dateRange: 'today',
    onlyAbnormal: false
  });

  // Filter Logic
  const filteredData = MOCK_TRAJECTORIES.filter(t => {
    const matchesSearch = t.userName.includes(searchTerm) || t.userId.includes(searchTerm);
    const matchesType = filters.activityType === 'all' || t.type === filters.activityType;
    const matchesAbnormal = filters.onlyAbnormal ? t.isAbnormal : true;
    return matchesSearch && matchesType && matchesAbnormal;
  });

  // 5.2.2 Detail Modal
  const renderDetailModal = () => {
    if (!selectedTrajectory) return null;
    const t = selectedTrajectory;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto animate-slide-in-right p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">轨迹详情</h2>
            <button onClick={() => setSelectedTrajectory(null)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {/* 5.2.2 (1) Basic Info Area */}
          <div className="bg-slate-50 p-4 rounded-lg mb-6 grid grid-cols-2 gap-4">
             <div>
               <label className="text-xs text-gray-500 block">用户</label>
               <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">{t.userName} ({t.userId.substring(0,8)}...)</span>
             </div>
             <div>
               <label className="text-xs text-gray-500 block">发生时间</label>
               <span className="text-sm font-medium">{new Date(t.timestamp).toLocaleString()}</span>
             </div>
             <div>
               <label className="text-xs text-gray-500 block">关联门店</label>
               <span className="text-sm font-medium">{t.store || '-'}</span>
             </div>
             <div>
               <label className="text-xs text-gray-500 block">设备</label>
               <span className="text-sm font-medium">{t.device || '-'}</span>
             </div>
             {t.isAbnormal && (
               <div className="col-span-2 bg-red-50 border border-red-200 p-2 rounded text-red-700 text-sm flex items-center gap-2">
                 <AlertTriangle size={16} />
                 <span>异常标记：疑似违规操作 / 系统自动标记</span>
               </div>
             )}
          </div>

          {/* 5.2.2 (2) Content Area - Context Aware */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 border-l-4 border-blue-500 pl-2">行为详情</h3>
            
            {t.type === ActivityType.DigitalHuman ? (
               <div className="border border-gray-200 rounded-lg overflow-hidden">
                 <div className="bg-gray-50 px-4 py-2 border-b text-sm text-gray-500 flex justify-between">
                   <span>主题：{t.details?.topic || '健康咨询'}</span>
                   <span>轮次：{t.details?.rounds || 1}</span>
                 </div>
                 <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
                    {t.details?.chatLog ? (
                      t.details.chatLog.map((log: any, idx: number) => (
                        <div key={idx} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            log.role === 'user' ? 'bg-blue-100 text-blue-900 rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}>
                            {log.content}
                          </div>
                        </div>
                      ))
                    ) : <p className="text-gray-400 text-sm italic">无对话详情</p>}
                 </div>
               </div>
            ) : t.type === ActivityType.Mall ? (
               <div className="border border-gray-200 rounded-lg p-4">
                 <div className="flex items-center gap-4">
                   <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">商品图</div>
                   <div>
                     <p className="font-medium text-gray-800">商品名称：XXX 颈椎按摩仪</p>
                     <p className="text-sm text-gray-500 mt-1">分类：医疗器械 | 价格：¥299.00</p>
                     <p className="text-sm text-blue-600 mt-1">状态：已加入购物车</p>
                   </div>
                 </div>
               </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg text-gray-600 text-sm">
                <p>行为描述：{t.description}</p>
                <p className="mt-2">时长：{t.duration ? `${t.duration}秒` : '-'}</p>
              </div>
            )}
          </div>

          {/* 5.2.2 (3) Context - Before/After Link */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 border-l-4 border-gray-300 pl-2">前后链路</h3>
            <div className="relative border-l-2 border-gray-200 ml-2 space-y-6 py-2">
               <div className="ml-6 relative opacity-60">
                 <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-gray-300"></div>
                 <p className="text-xs text-gray-500">14:15:00</p>
                 <p className="text-sm">浏览商品：颈椎按摩仪</p>
               </div>
               <div className="ml-6 relative">
                 <div className="absolute -left-[32px] top-1.5 h-4 w-4 rounded-full border-2 border-blue-500 bg-white"></div>
                 <p className="text-xs text-blue-600 font-bold">14:30:00 (当前)</p>
                 <p className="text-sm font-medium">{t.description}</p>
               </div>
                <div className="ml-6 relative opacity-60">
                 <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-gray-300"></div>
                 <p className="text-xs text-gray-500">14:42:00</p>
                 <p className="text-sm">退出应用</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 5.2.1 (2) Timeline View
  const renderTimelineView = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 min-h-[500px]">
      <div className="relative border-l-2 border-blue-100 ml-4 space-y-12">
        {filteredData.map((item, index) => {
           // Simulate time gap calculation
           const prevItem = filteredData[index-1];
           const timeGap = prevItem ? '间隔 15 分钟' : '开始';

           return (
            <div key={item.id} className="relative pl-8 group cursor-pointer" onClick={() => setSelectedTrajectory(item)}>
              <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white shadow-sm transition-all group-hover:scale-125 ${
                item.isAbnormal ? 'bg-red-500' : 'bg-blue-500'
              }`}></span>
              
              {/* Gap Label */}
              {index > 0 && (
                <span className="absolute -left-16 -top-10 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                  {timeGap}
                </span>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-4 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-800">{new Date(item.timestamp).toLocaleTimeString()}</span>
                    <span className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-md font-semibold text-blue-700 flex items-center gap-2">
                    {item.type}
                    {item.isAbnormal && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">异常</span>}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <MapPin size={10} /> {item.store} · {item.userName}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                   {item.duration && <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">时长: {item.duration}s</span>}
                </div>
              </div>
            </div>
           );
        })}
      </div>
    </div>
  );

  // 5.2.1 (2) List View
  const renderListView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发生时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">行为类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">行为描述</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时长(s)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((t) => (
              <tr key={t.id} className={`hover:bg-blue-50 transition-colors ${t.isAbnormal ? 'bg-red-50/30' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {new Date(t.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{t.userName}</div>
                  <div className="text-xs text-gray-400">{t.userId.substring(0,8)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                     {t.type}
                   </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs" title={t.description}>
                  {t.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.duration || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {t.isAbnormal ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      异常
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">正常</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => setSelectedTrajectory(t)} className="text-blue-600 hover:text-blue-900">详情</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <Search size={48} className="text-gray-300 mb-2"/>
            未找到匹配的轨迹记录
          </div>
        )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 5.1/5.2 Top Header & Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">用户行为轨迹</h2>
          <p className="text-sm text-gray-500 mt-1">全量监控用户APP端操作行为、异常检测及链路分析</p>
        </div>
        <div className="bg-white p-1 rounded-lg border border-gray-200 flex">
          <button 
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'data' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            轨迹数据
          </button>
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'analysis' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            统计分析
          </button>
        </div>
      </div>

      {activeTab === 'analysis' ? (
        <TrajectoryAnalysis />
      ) : (
        <>
          {/* 5.2.1 (3) Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="搜索用户ID、姓名、手机号、行为描述..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <Filter size={16} className="text-gray-500" />
                <select 
                  className="text-sm bg-transparent outline-none text-gray-700"
                  value={filters.activityType}
                  onChange={(e) => setFilters({...filters, activityType: e.target.value})}
                >
                  <option value="all">所有行为类型</option>
                  {Object.values(ActivityType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

               <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <Calendar size={16} className="text-gray-500" />
                <select 
                  className="text-sm bg-transparent outline-none text-gray-700"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                >
                  <option value="today">今日</option>
                  <option value="7days">近7天</option>
                  <option value="30days">近30天</option>
                  <option value="custom">自定义时间</option>
                </select>
              </div>

               <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                 <input 
                  type="checkbox" 
                  checked={filters.onlyAbnormal}
                  onChange={(e) => setFilters({...filters, onlyAbnormal: e.target.checked})}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                 />
                 <span className={filters.onlyAbnormal ? 'text-red-600 font-medium' : ''}>仅看异常</span>
               </label>
               
               <div className="flex-1 text-right">
                  <button className="text-blue-600 text-sm hover:underline">高级筛选</button>
               </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
               {/* 5.2.1 (2) View Mode Switcher */}
               <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                 <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="列表视图"
                 >
                   <List size={18} />
                 </button>
                 <button 
                    onClick={() => setViewMode('timeline')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'timeline' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="时间轴视图"
                 >
                   <LayoutList size={18} />
                 </button>
                 <button 
                    onClick={() => setViewMode('heatmap')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'heatmap' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    title="热力图视图"
                 >
                   <Grip size={18} />
                 </button>
               </div>

               <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                 <Download size={16} /> 导出数据
               </button>
            </div>
          </div>

          {/* Render Content */}
          {viewMode === 'list' && renderListView()}
          {viewMode === 'timeline' && renderTimelineView()}
          {viewMode === 'heatmap' && (
             <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
               <div className="grid grid-cols-7 gap-2 max-w-3xl mx-auto">
                 {/* Simplified Visual Representation of Heatmap Mode */}
                 {Array.from({length: 28}).map((_, i) => (
                    <div key={i} className={`h-12 w-full rounded ${
                      i % 3 === 0 ? 'bg-blue-100' : i % 5 === 0 ? 'bg-blue-300' : 'bg-gray-50'
                    } flex items-center justify-center text-xs text-gray-400`}>
                      {i + 1}
                    </div>
                 ))}
               </div>
               <p className="mt-4 text-gray-500 text-sm">日历热力图模式：直观展示每日行为频次</p>
             </div>
          )}
        </>
      )}

      {/* Render Detail Modal */}
      {renderDetailModal()}
    </div>
  );
};

export default TrajectoryList;

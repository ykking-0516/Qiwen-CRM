import React, { useState } from 'react';
import { User, ActivityType } from '../types';
import { MOCK_TRAJECTORIES } from '../constants';
import { ArrowLeft, Calendar, MapPin, Phone, User as UserIcon, Activity, FileText, Tag as TagIcon, MoreHorizontal, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UserDetailProps {
  user: User;
  onBack: () => void;
}

const mockWeightData = [
  { date: '2024-03', bmi: 27.2 },
  { date: '2024-04', bmi: 26.8 },
  { date: '2024-05', bmi: 26.5 },
];

const UserDetail: React.FC<UserDetailProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'health' | 'trajectory' | 'tags'>('basic');

  const userTrajectories = MOCK_TRAJECTORIES.filter(t => t.userId === user.id);

  const renderBasicInfo = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">基础信息</h3>
        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">用户ID</span>
            <span className="font-mono text-gray-900">{user.id}</span>
          </div>
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">姓名</span>
            <span className="font-medium text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">性别/年龄</span>
            <span className="text-gray-900">{user.gender} / {user.age}岁</span>
          </div>
           <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">关联门店</span>
            <span className="text-gray-900">{user.store}</span>
          </div>
           <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">负责专员</span>
            <span className="text-gray-900">{user.assignedStaff}</span>
          </div>
        </div>
      </div>
       <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">账户状态</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">当前状态</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.status === '正常' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>{user.status}</span>
          </div>
          <div className="flex justify-between border-b border-gray-50 pb-2">
            <span className="text-gray-500">最后活跃时间</span>
            <span className="text-gray-900">{new Date(user.lastActive).toLocaleString()}</span>
          </div>
          <div className="pt-4">
             <button className="w-full border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 text-sm">冻结账户</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI Cards for Health */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
           <p className="text-sm text-blue-600 mb-1">BMI指数</p>
           <div className="text-2xl font-bold text-blue-900">{user.bmi} <span className="text-xs font-normal text-blue-500">(偏高)</span></div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
           <p className="text-sm text-purple-600 mb-1">主要体质</p>
           <div className="text-lg font-bold text-purple-900">{user.constitution.join('、')}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
           <p className="text-sm text-orange-600 mb-1">疼痛部位</p>
           <div className="text-lg font-bold text-orange-900">{user.painArea?.join('、') || '无'} <span className="text-sm text-orange-600">Level {user.painLevel}</span></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">BMI 变化趋势</h3>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeightData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis domain={[20, 30]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="bmi" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderTrajectory = () => (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-6">用户轨迹</h3>
      <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
        {userTrajectories.map((item) => (
          <div key={item.id} className="relative pl-8">
            <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
              item.isAbnormal ? 'bg-red-500' : 'bg-blue-500'
            }`}></span>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <span className="text-xs text-gray-400 font-mono mb-1 block">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
                <h4 className={`text-md font-semibold ${item.isAbnormal ? 'text-red-600' : 'text-gray-800'}`}>
                  {item.type} {item.isAbnormal && '(异常)'}
                </h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                 {item.type === ActivityType.DigitalHuman && (
                   <div className="mt-2 bg-slate-50 p-2 rounded text-xs text-slate-500 border border-slate-100">
                      <span>对话时长: {item.duration}秒</span>
                   </div>
                 )}
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                   {item.device}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> 返回列表
      </button>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {user.name}
              <span className={`text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-normal`}>
                {user.age}岁
              </span>
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1"><Phone size={14}/> {user.phone}</span>
              <span className="flex items-center gap-1"><MapPin size={14}/> {user.store}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="btn-secondary px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">分配专员</button>
            <button className="btn-primary px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">写跟进</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'basic', label: '基础信息', icon: UserIcon },
            { id: 'health', label: '健康数据', icon: Activity },
            { id: 'trajectory', label: '行为轨迹', icon: Clock },
            { id: 'tags', label: '标签画像', icon: TagIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'health' && renderHealth()}
        {activeTab === 'trajectory' && renderTrajectory()}
        {activeTab === 'tags' && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-blue-500 hover:text-blue-500">
                + 添加标签
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;

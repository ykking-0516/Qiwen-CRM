import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUp, ArrowDown, Users, Clock, MessageCircle, ShoppingBag } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

// Mock data for charts
const activityTrendData = [
  { name: '周一', dau: 120, total: 450 },
  { name: '周二', dau: 132, total: 520 },
  { name: '周三', dau: 101, total: 400 },
  { name: '周四', dau: 134, total: 480 },
  { name: '周五', dau: 190, total: 600 },
  { name: '周六', dau: 230, total: 850 },
  { name: '周日', dau: 210, total: 800 },
];

const activityDistributionData = [
  { name: '数字人对话', value: 35 },
  { name: '知识点击', value: 25 },
  { name: '打卡', value: 20 },
  { name: '商城浏览', value: 15 },
  { name: '预约', value: 5 },
];

const TrajectoryAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 5.2.3 (1) Overview Dashboard - Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="今日活跃用户数" value="1,245" change="+12.5%" icon={<Users className="text-blue-500" />} />
        <MetricCard title="今日行为总次数" value="8,320" change="+5.2%" icon={<Clock className="text-green-500" />} />
        <MetricCard title="数字人对话次数" value="450" change="-2.1%" icon={<MessageCircle className="text-purple-500" />} />
        <MetricCard title="商城下单金额" value="¥12,450" change="+8.4%" icon={<ShoppingBag className="text-orange-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 5.2.3 (2) Activity Type Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">行为类型趋势分析</h3>
            <div className="flex gap-2 text-sm">
              <button className="px-3 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200">日</button>
              <button className="px-3 py-1 bg-blue-100 rounded text-blue-600 font-medium">周</button>
              <button className="px-3 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200">月</button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityTrendData}>
                <defs>
                  <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                <Legend />
                <Area type="monotone" dataKey="dau" name="日活(DAU)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDau)" />
                <Area type="monotone" dataKey="total" name="总行为数" stroke="#10b981" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5.2.3 (2) Activity Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6">行为类型占比</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activityDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {activityDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* 5.2.3 (3) Heatmap - Simulated with Grid */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">用户活跃时段分布 (热力图)</h3>
            <span className="text-sm text-gray-500">颜色越深代表活跃度越高</span>
         </div>
         <div className="grid grid-cols-12 gap-1 text-center text-xs text-gray-500 mb-2">
            {[0,2,4,6,8,10,12,14,16,18,20,22].map(h => <div key={h} className="col-span-1">{h}:00</div>)}
         </div>
         {/* Simple heatmap simulation: 7 days x 12 time blocks */}
         {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, dIndex) => (
           <div key={day} className="flex items-center gap-2 mb-2">
             <span className="w-10 text-xs text-gray-500">{day}</span>
             <div className="flex-1 grid grid-cols-12 gap-1">
               {Array.from({length: 12}).map((_, tIndex) => {
                 // Random intensity for demo
                 const intensity = Math.floor(Math.random() * 4); 
                 const bgClass = [
                   'bg-blue-50', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600'
                 ][intensity];
                 return <div key={tIndex} className={`h-8 rounded-sm ${bgClass} hover:opacity-80 transition-opacity`} title={`活跃度: ${intensity * 25}%`}></div>
               })}
             </div>
           </div>
         ))}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{title: string, value: string, change: string, icon: React.ReactNode}> = ({title, value, change, icon}) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <div className="mt-2 flex items-center text-xs">
        <span className={`flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUp size={12}/> : <ArrowDown size={12}/>}
          {change}
        </span>
        <span className="text-gray-400 ml-2">较昨日</span>
      </div>
    </div>
  );
}

export default TrajectoryAnalysis;

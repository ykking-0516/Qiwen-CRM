import React from 'react';
import { MOCK_TAG_GROUPS } from '../constants';
import { Tag as TagIcon, Plus, Edit2, Trash2, Search, MoreHorizontal } from 'lucide-react';

const TagManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">标签数据</h2>
          <p className="text-sm text-gray-500 mt-1">管理用户标签体系与分组</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
          <Plus size={16} /> 新增标签
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TAG_GROUPS.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
             <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
               <h3 className="font-bold text-gray-800">{group.name}</h3>
               {!group.isSystem && (
                 <div className="flex gap-2">
                   <button className="text-gray-400 hover:text-blue-600"><Edit2 size={14} /></button>
                   <button className="text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                 </div>
               )}
               {group.isSystem && <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded">系统预设</span>}
             </div>
             
             <div className="p-4 flex-1">
                <div className="space-y-3">
                  {group.tags.map(tag => (
                    <div key={tag.id} className="flex items-center justify-between group hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-3">
                        <TagIcon size={16} className="text-blue-500" />
                        <span className="text-sm text-gray-700 font-medium">{tag.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{tag.count}人</span>
                        <MoreHorizontal size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-600" />
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-colors flex items-center justify-center gap-1">
                    <Plus size={12} /> 添加标签至此分组
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagManagement;
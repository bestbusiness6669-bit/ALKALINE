import React, { useState, useRef } from 'react';
import { User, GenealogyTreeNode } from '../../types';
import { MlmEngineService } from '../../services/mlmEngine';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  UserPlus,
  Trash2,
  MoveHorizontal,
  ShieldCheck,
  AlertTriangle,
  Lock,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

interface GenealogyTreeProps {
  currentUser: User;
  allUsers: User[];
  onAddDummyMember: (parentId: string, placement: 'LEFT' | 'RIGHT') => void;
  onDeleteMember: (userId: string) => void;
  onMoveMember?: (userId: string, newParentId: string, newPlacement: 'LEFT' | 'RIGHT') => void;
}

export const GenealogyTree: React.FC<GenealogyTreeProps> = ({
  currentUser,
  allUsers,
  onAddDummyMember,
  onDeleteMember,
  onMoveMember,
}) => {
  const [rootSearchId, setRootSearchId] = useState(currentUser.id);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<User | null>(null);
  const [moveModalUser, setMoveModalUser] = useState<User | null>(null);
  const [newParentInput, setNewParentInput] = useState('');
  const [newPlacementInput, setNewPlacementInput] = useState<'LEFT' | 'RIGHT'>('LEFT');

  // Build tree from root search ID
  const treeRoot = MlmEngineService.buildGenealogyTree(rootSearchId, allUsers);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = allUsers.find(
      (u) => u.id.toLowerCase() === rootSearchId.trim().toLowerCase() || u.name.toLowerCase().includes(rootSearchId.trim().toLowerCase())
    );
    if (found) {
      setRootSearchId(found.id);
    } else {
      alert('Member ID not found!');
    }
  };

  const renderMemberCard = (node: GenealogyTreeNode | null, parentId: string, leg: 'LEFT' | 'RIGHT') => {
    if (!node) {
      return (
        <div className="flex flex-col items-center p-3">
          <div 
            onClick={() => onAddDummyMember(parentId, leg)}
            className="w-36 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-500/10 transition-all text-slate-400 hover:text-amber-500 group shadow-sm"
          >
            <UserPlus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase">Add Member</span>
            <span className="text-[9px] text-slate-400">({leg} LEG)</span>
          </div>
        </div>
      );
    }

    const u = node.user;
    const isActive = u.status === 'ACTIVE';
    const isCapped = u.status === 'CAPPED_INACTIVE';

    return (
      <div className="flex flex-col items-center relative group">
        
        {/* Node Card */}
        <div 
          onClick={() => setSelectedNode(u)}
          className={`w-44 p-3 rounded-2xl border transition-all cursor-pointer shadow-lg hover:scale-105 relative ${
            isActive
              ? 'bg-slate-900 text-white border-amber-500/50 hover:border-amber-400'
              : isCapped
              ? 'bg-rose-950/90 text-white border-rose-500 hover:border-rose-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700'
          }`}
        >
          {/* Status Badge */}
          <div className="flex items-center justify-between text-[9px] font-black uppercase mb-1">
            <span className="text-amber-400">{u.id}</span>
            <span className={`px-1.5 py-0.5 rounded ${
              isActive ? 'bg-emerald-500/20 text-emerald-400' : isCapped ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-500/20 text-slate-400'
            }`}>
              {u.status}
            </span>
          </div>

          {/* User Name */}
          <div className="font-bold text-xs truncate" title={u.name}>
            {u.name}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            Pkg: ₹{u.packagePrice}
          </div>

          {/* Business Volumes */}
          <div className="grid grid-cols-2 gap-1 mt-2 text-[9px] border-t border-slate-800/60 pt-1.5 text-center">
            <div className="bg-blue-500/10 rounded py-0.5">
              <span className="text-blue-400 font-semibold block">L Vol</span>
              <span className="font-bold">₹{u.leftBusiness}</span>
            </div>
            <div className="bg-emerald-500/10 rounded py-0.5">
              <span className="text-emerald-400 font-semibold block">R Vol</span>
              <span className="font-bold">₹{u.rightBusiness}</span>
            </div>
          </div>

          {/* Pairs count */}
          <div className="mt-1 flex justify-between items-center text-[9px] text-slate-400">
            <span>Pairs: <strong className="text-amber-400">{u.lifetimePairs}</strong></span>
            <span>Wallet: <strong className="text-emerald-400">₹{u.incomeWallet}</strong></span>
          </div>
        </div>

        {/* Binary Children Tree Branches */}
        <div className="w-full flex justify-center mt-6 relative">
          
          {/* Connecting Vertical Line */}
          <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-amber-500/50 -translate-x-1/2" />

          {/* Left & Right Legs Split */}
          <div className="flex gap-8 sm:gap-16 items-start relative">
            
            {/* Horizontal Connector bar */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-amber-500/40" />

            {/* Left Node */}
            <div className="relative pt-4">
              <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-amber-500/40 -translate-x-1/2" />
              {renderMemberCard(node.left || null, u.id, 'LEFT')}
            </div>

            {/* Right Node */}
            <div className="relative pt-4">
              <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-amber-500/40 -translate-x-1/2" />
              {renderMemberCard(node.right || null, u.id, 'RIGHT')}
            </div>

          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Binary Genealogy Tree View</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Interactive downline tree canvas with real-time left/right volume calculation
          </p>
        </div>

        {/* Search & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 md:flex-initial">
            <input
              type="text"
              value={rootSearchId}
              onChange={(e) => setRootSearchId(e.target.value)}
              placeholder="Search Member ID..."
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:scale-105 transition-all"
              title="Search ID"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold px-2">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setRootSearchId(currentUser.id);
              }}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              title="Reset Tree"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Scroll Area */}
      <div className="bg-slate-950 rounded-3xl border border-amber-500/30 p-8 min-h-[550px] overflow-auto relative shadow-2xl flex items-center justify-center">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

        {/* Tree Container with Zoom */}
        <div 
          className="relative z-10 py-10 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
        >
          {treeRoot ? (
            renderMemberCard(treeRoot, treeRoot.user.id, 'LEFT')
          ) : (
            <div className="text-center text-slate-400">
              No tree found for ID {rootSearchId}
            </div>
          )}
        </div>
      </div>

      {/* Selected Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-xs font-black text-amber-500 uppercase">{selectedNode.id}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selectedNode.name}</h3>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <span className="text-slate-400 block">Status:</span>
                <strong className="text-emerald-500 font-bold">{selectedNode.status}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <span className="text-slate-400 block">Package:</span>
                <strong className="text-amber-500 font-bold">₹{selectedNode.packagePrice}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <span className="text-slate-400 block">Left Business:</span>
                <strong className="text-blue-400 font-bold">₹{selectedNode.leftBusiness}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <span className="text-slate-400 block">Right Business:</span>
                <strong className="text-emerald-400 font-bold">₹{selectedNode.rightBusiness}</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <span className="text-slate-400 block">Lifetime Pairs:</span>
                <strong className="text-purple-400 font-bold">{selectedNode.lifetimePairs} Pairs</strong>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                <span className="text-slate-400 block">Total Earnings:</span>
                <strong className="text-amber-400 font-bold">₹{selectedNode.totalEarnings}</strong>
              </div>
            </div>

            {/* Admin Sandbox Actions */}
            {currentUser.role === 'ADMIN' && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    onDeleteMember(selectedNode.id);
                    setSelectedNode(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete Member Node
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

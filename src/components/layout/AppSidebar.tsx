import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Brain,
  TrendingUp,
  FileSignature,
  Phone,
  Inbox,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type NavItem = {
  icon: React.FC<{ className?: string }>;
  label: string;
  path: string;
  badge?: string;
  count?: number;
};

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: 'CORE',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: Briefcase, label: 'ERP', path: '/portfolio', badge: 'NEW' },
      { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    ],
  },
  {
    section: 'TOOLS',
    items: [
      { icon: Brain, label: 'CAM AI', path: '/cam-ai' },
      { icon: TrendingUp, label: 'Warrants AI', path: '/warrants-ai' },
      { icon: FileSignature, label: 'E-Sign', path: '/esign' },
      { icon: Phone, label: 'Call Notes', path: '/call-notes' },
    ],
  },
  {
    section: 'ACTIONS',
    items: [
      { icon: Inbox, label: 'Task Inbox', path: '/tasks', count: 3 },
      { icon: FileText, label: 'Reports', path: '/reports' },
      { icon: Bell, label: 'Requests', path: '/requests', count: 1 },
    ],
  },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    path === '/portfolio'
      ? location.pathname.startsWith('/portfolio')
      : location.pathname === path;

  return (
    <aside
      className={`flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out ${collapsed ? 'w-[60px]' : 'w-[240px]'}`}
      style={{
        background: 'linear-gradient(180deg, #070D1F 0%, #0D1733 40%, #14234B 70%, #1A2A55 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 py-[18px] ${collapsed ? 'justify-center' : ''}`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Gradient H logo */}
        <div
          className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #292F80 0%, #3B45A0 100%)',
            boxShadow: '0 2px 8px rgba(41,47,128,0.5)',
          }}
        >
          <span
            className="text-white font-bold text-[13px] tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            H
          </span>
        </div>
        {!collapsed && (
          <div>
            <span
              className="text-white font-bold text-[15px] tracking-tight leading-none"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              HALO
            </span>
            <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>
              Stride Ventures
            </p>
          </div>
        )}
      </div>

      {/* User */}
      <div
        className={`flex items-center gap-3 px-4 py-4 ${collapsed ? 'justify-center' : ''}`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="relative shrink-0">
          <div
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: 'linear-gradient(135deg, #292F80 0%, #5C62B0 100%)' }}
          >
            SM
          </div>
          {/* Online dot */}
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
            style={{
              background: '#10B981',
              borderColor: '#070D1F',
            }}
          />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white text-[13px] font-semibold truncate leading-tight">
              Siddharth Manohar
            </p>
            <p className="text-[11px] font-medium truncate mt-0.5" style={{ color: 'rgba(148,163,184,0.6)' }}>
              RM Lead
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5 scrollbar-none">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <p
                className="px-4 mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em]"
                style={{ color: 'rgba(148,163,184,0.35)' }}
              >
                {section}
              </p>
            )}
            <ul className="space-y-px">
              {items.map(({ icon: Icon, label, path, badge, count }) => {
                const active = isActive(path);
                return (
                  <li key={path} className="relative mx-2">
                    <button
                      onClick={() => navigate(path)}
                      title={collapsed ? label : undefined}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium transition-all duration-150 rounded-[8px] ${
                        collapsed ? 'justify-center' : ''
                      }`}
                      style={
                        active
                          ? {
                              color: '#fff',
                              background: 'rgba(59,69,160,0.16)',
                              boxShadow: 'inset 0 0 0 1px rgba(59,69,160,0.22)',
                            }
                          : {
                              color: 'rgba(148,163,184,0.75)',
                            }
                      }
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)';
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.75)';
                          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        }
                      }}
                    >
                      {/* Active left bar */}
                      {active && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                          style={{ background: 'linear-gradient(180deg, #5C62B0 0%, #3B45A0 100%)' }}
                        />
                      )}
                      <Icon
                        className="w-4 h-4 shrink-0"
                        style={{ color: active ? '#5C62B0' : 'inherit' }}
                      />
                      {!collapsed && (
                        <span className="flex-1 text-left">{label}</span>
                      )}
                      {!collapsed && badge && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-[4px]"
                          style={{
                            background: 'linear-gradient(135deg, #292F80, #5C62B0)',
                            color: '#fff',
                          }}
                        >
                          {badge}
                        </span>
                      )}
                      {!collapsed && count !== undefined && (
                        <span
                          className="w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center"
                          style={{
                            background: 'rgba(59,69,160,0.9)',
                            color: '#fff',
                          }}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="py-3 space-y-px mx-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[13px] font-medium transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          style={{ color: 'rgba(148,163,184,0.6)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.6)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Help & FAQs</span>}
        </button>
        <button
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[13px] font-medium transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          style={{ color: 'rgba(148,163,184,0.6)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#F87171';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.6)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] text-[12px] transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          style={{ color: 'rgba(100,116,139,0.5)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(148,163,184,0.6)';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(100,116,139,0.5)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

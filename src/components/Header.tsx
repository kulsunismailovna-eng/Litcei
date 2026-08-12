import React from 'react';
import { BookOpen, ListFilter, Calculator, GraduationCap, ShoppingBag, FileText, Sparkles } from 'lucide-react';

export type TabType = 'rules' | 'examples' | 'solver' | 'practice' | 'word-problems' | 'worksheet';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  practiceScore: number;
  streak: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  practiceScore,
  streak,
}) => {
  const tabs = [
    { id: 'rules' as TabType, label: 'Эрежелер', icon: BookOpen },
    { id: 'examples' as TabType, label: 'Даяр Мисалдар', icon: ListFilter },
    { id: 'solver' as TabType, label: 'Кадамдуу Калькулятор', icon: Calculator },
    { id: 'practice' as TabType, label: 'Машыгуу & Тест', icon: GraduationCap },
    { id: 'word-problems' as TabType, label: 'Турмуштук Маселелер', icon: ShoppingBag },
    { id: 'worksheet' as TabType, label: 'Шпаргалка / Иш Кагаз', icon: FileText },
  ];

  return (
    <header className="bg-[#343E35] text-[#F9F7F2] border-b border-[#2B332B] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('rules')}>
            <div className="w-10 h-10 rounded-xl bg-[#5D6D5E] border border-[#7A8B7C]/40 flex items-center justify-center text-[#F9F7F2] shadow-sm">
              <Sparkles className="w-5 h-5 text-[#E2DDD3]" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold tracking-wide text-[#F9F7F2] flex items-center gap-2">
                Ондук Бөлчөктөр <span className="text-xs bg-[#5D6D5E]/60 text-[#E0DBCF] border border-[#7A8B7C]/50 px-2.5 py-0.5 rounded-full font-sans font-medium">Кошуу & Кемитүү</span>
              </h1>
              <p className="text-xs text-[#C2BBB0]">Кыргыз тилинде интерактивдүү математикалык нускама</p>
            </div>
          </div>

          {/* User Score Badge */}
          <div className="flex items-center space-x-3 bg-[#2B332B]/90 px-3.5 py-1.5 rounded-xl border border-[#445145]">
            <div className="flex items-center space-x-1.5 text-xs text-[#E3B096]">
              <span className="font-bold text-sm">🔥 {streak}</span>
              <span className="text-[#A39C90]">Ийгилик сызыгы</span>
            </div>
            <div className="h-4 w-px bg-[#445145]" />
            <div className="flex items-center space-x-1.5 text-xs text-[#98B19B]">
              <span className="font-bold text-sm">⭐ {practiceScore}</span>
              <span className="text-[#A39C90]">Упай</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 overflow-x-auto pb-2 pt-1 no-scrollbar border-t border-[#445145]/70">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#5D6D5E] text-white shadow-sm font-semibold border border-[#7A8B7C]/50'
                    : 'text-[#D0C9BD] hover:text-white hover:bg-[#414E42]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#A8A195]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

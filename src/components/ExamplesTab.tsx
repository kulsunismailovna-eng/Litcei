import React, { useState, useMemo } from 'react';
import { EXAMPLES_DATA } from '../data/examplesData';
import { DecimalExample, DifficultyLevel } from '../types';
import { Search, Filter, Copy, Check, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { buildColumnAlignment } from '../utils/mathUtils';

export const ExamplesTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'кошуу' | 'кемитүү'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('add-1'); // default first expanded
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredExamples = useMemo(() => {
    return EXAMPLES_DATA.filter((ex) => {
      const matchCat = selectedCategory === 'all' || ex.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;
      const matchSearch =
        searchQuery === '' ||
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.resultStr.includes(searchQuery);

      return matchCat && matchDiff && matchSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const handleCopy = (ex: DecimalExample) => {
    const text = `Мисал: ${ex.title}\nЖообу: ${ex.resultStr}\nТүшүндүрмө: ${ex.explanation}\nКадамдар:\n${ex.steps
      .map((s) => `${s.stepNumber}. ${s.title}: ${s.description}`)
      .join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ex.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const difficultyBadges: Record<DifficultyLevel, { label: string; color: string }> = {
    easy: { label: 'Жеңил', color: 'bg-[#EFEFE8] text-[#365239] border-[#CCD8CC]' },
    medium: { label: 'Орточо', color: 'bg-[#F8EFEA] text-[#9E5D43] border-[#EADAD1]' },
    hard: { label: 'Татаал', color: 'bg-[#FAF2EE] text-[#9E4D32] border-[#ECCFC3]' },
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title & Filters Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3DFD5] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3B3630] flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#5D6D5E]" />
              Ондук Бөлчөктөрдү Кошуу жана Кемитүү Мисалдары
            </h2>
            <p className="text-xs sm:text-sm text-[#736C61]">
              Кадам-кадам чыгарылышы, багандагы жазылышы жана толук нускамасы менен даяр мисалдар.
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#F2EFE9] text-[#5D6D5E] border border-[#E0DBCF] self-start md:self-auto">
            Бардыгы: {filteredExamples.length} мисал
          </span>
        </div>

        {/* Filter inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#A0988A] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Санды же мисалды издөө..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DCD6C9] focus:outline-none focus:ring-2 focus:ring-[#5D6D5E]/40 bg-[#FBF9F5]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-1 bg-[#F2EFE9] p-1 rounded-xl border border-[#E0DBCF]">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all' ? 'bg-white text-[#5D6D5E] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Бардыгы
            </button>
            <button
              onClick={() => setSelectedCategory('кошуу')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'кошуу' ? 'bg-white text-[#5D6D5E] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Кошуу (+)
            </button>
            <button
              onClick={() => setSelectedCategory('кемитүү')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === 'кемитүү' ? 'bg-white text-[#5D6D5E] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Кемитүү (-)
            </button>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center space-x-1 bg-[#F2EFE9] p-1 rounded-xl border border-[#E0DBCF]">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDifficulty === 'all' ? 'bg-white text-[#5D6D5E] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Бардык
            </button>
            <button
              onClick={() => setSelectedDifficulty('easy')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDifficulty === 'easy' ? 'bg-white text-[#365239] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Жеңил
            </button>
            <button
              onClick={() => setSelectedDifficulty('medium')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDifficulty === 'medium' ? 'bg-white text-[#9E5D43] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Орточо
            </button>
            <button
              onClick={() => setSelectedDifficulty('hard')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedDifficulty === 'hard' ? 'bg-white text-[#9E4D32] shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
              }`}
            >
              Татаал
            </button>
          </div>
        </div>
      </div>

      {/* Examples Cards List */}
      <div className="space-y-4">
        {filteredExamples.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E3DFD5] text-[#736C61] space-y-2">
            <Filter className="w-8 h-8 text-[#A0988A] mx-auto" />
            <p className="font-medium text-[#3B3630]">Издөө боюнча эч кандай мисал табылган жок</p>
            <p className="text-xs">Фильтрлерди өзгөртүп же издөө сөзүн тазалап көрүңүз</p>
          </div>
        ) : (
          filteredExamples.map((ex) => {
            const isExpanded = expandedId === ex.id;
            const diff = difficultyBadges[ex.difficulty];
            const colData = buildColumnAlignment(ex.num1, ex.num2, ex.operation);

            return (
              <div
                key={ex.id}
                className="bg-white rounded-2xl border border-[#E3DFD5] shadow-xs hover:border-[#5D6D5E]/50 transition-all overflow-hidden"
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-[#3B3630] tracking-tight font-mono">
                        {ex.title} = <span className="text-[#5D6D5E]">{ex.resultStr}</span>
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${diff.color}`}>
                        {diff.label}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-[#F2EFE9] text-[#5C564D] border border-[#E0DBCF]">
                        {ex.category === 'кошуу' ? '➕ Кошуу' : '➖ Кемитүү'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5C564D]">{ex.explanation}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(ex);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#4A453E] transition-colors cursor-pointer border border-[#E0DBCF]"
                      title="Мисалды көчүрүү"
                    >
                      {copiedId === ex.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#365239]" />
                          <span className="text-[#365239]">Көчүрүлдү!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#736C61]" />
                          <span>Көчүрүү</span>
                        </>
                      )}
                    </button>

                    <button className="p-2 rounded-xl text-[#A0988A] hover:text-[#4A453E] hover:bg-[#F2EFE9] transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[#E3DFD5] bg-[#FAF8F5] p-5 sm:p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Left: Column Visual Representation */}
                      <div className="bg-[#1F2420] rounded-2xl p-5 border border-[#3B473C] text-[#F9F7F2] space-y-3 shadow-inner">
                        <div className="text-xs font-semibold text-[#B5AFA3] border-b border-[#3B473C] pb-2 flex items-center justify-between">
                          <span>Багандагы Жазылышы (Column Layout)</span>
                          <span className="text-[#A8C3AB] text-[10px] bg-[#2A362C] px-2 py-0.5 rounded border border-[#3A4B3D]">
                            Нөлдөр теңделди
                          </span>
                        </div>

                        <div className="font-mono text-xl sm:text-2xl flex flex-col items-center justify-center space-y-1.5 py-2 text-[#E2DDD3] tracking-wider">
                          {/* Row 1 */}
                          <div className="flex items-center space-x-2">
                            <span className="w-5 text-[#7E776C] text-sm">{ex.operation}</span>
                            {colData.row1Chars.map((ch, idx) => (
                              <span
                                key={idx}
                                className={`w-7 h-9 flex items-center justify-center rounded ${
                                  ch.isDecimalPoint
                                    ? 'bg-[#A66D55]/30 text-[#E8B8A2] font-bold border border-[#A66D55]/60 scale-105'
                                    : ch.isPaddedZero
                                    ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold border border-[#5D6D5E]/60 ring-1 ring-[#5D6D5E]/40'
                                    : 'bg-[#29312A] border border-[#3A463B]'
                                }`}
                              >
                                {ch.char}
                              </span>
                            ))}
                          </div>

                          {/* Row 2 */}
                          <div className="flex items-center space-x-2">
                            <span className="w-5 text-[#7E776C] text-sm font-bold">{ex.operation}</span>
                            {colData.row2Chars.map((ch, idx) => (
                              <span
                                key={idx}
                                className={`w-7 h-9 flex items-center justify-center rounded ${
                                  ch.isDecimalPoint
                                    ? 'bg-[#A66D55]/30 text-[#E8B8A2] font-bold border border-[#A66D55]/60 scale-105'
                                    : ch.isPaddedZero
                                    ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold border border-[#5D6D5E]/60 ring-1 ring-[#5D6D5E]/40'
                                    : 'bg-[#29312A] border border-[#3A463B]'
                                }`}
                              >
                                {ch.char}
                              </span>
                            ))}
                          </div>

                          {/* Divider */}
                          <div className="w-full h-0.5 bg-[#475448] my-1 rounded-full" />

                          {/* Result */}
                          <div className="flex items-center space-x-2 text-[#A8C3AB] font-bold">
                            <span className="w-5 text-[#7E776C] text-sm">=</span>
                            {colData.resultChars.map((ch, idx) => (
                              <span
                                key={idx}
                                className={`w-7 h-9 flex items-center justify-center rounded ${
                                  ch.isDecimalPoint
                                    ? 'bg-[#A66D55]/40 text-[#E8B8A2] font-extrabold border border-[#A66D55] scale-105'
                                    : 'bg-[#263327] text-[#C1DBC4] border border-[#485B4A]'
                                }`}
                              >
                                {ch.char}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-[11px] text-[#A0988A] text-center pt-1 border-t border-[#3B473C]">
                          Үтүрдүн астында үтүр жайгашып, теңдеш үчүн кошумча 0 сандары кошулган.
                        </p>
                      </div>

                      {/* Right: Detailed Steps List */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-[#5C564D] uppercase tracking-wider">
                          Кадам-кадам Чыгарылышы:
                        </h4>

                        <div className="space-y-2.5">
                          {ex.steps.map((st) => (
                            <div key={st.stepNumber} className="bg-white p-3.5 rounded-xl border border-[#E3DFD5] shadow-2xs space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="w-5 h-5 rounded-full bg-[#F2EFE9] text-[#5D6D5E] border border-[#E0DBCF] text-xs font-bold flex items-center justify-center shrink-0">
                                  {st.stepNumber}
                                </span>
                                <span className="font-semibold text-[#3B3630] text-xs sm:text-sm">{st.title}</span>
                              </div>
                              <p className="text-xs text-[#5C564D] pl-7">{st.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

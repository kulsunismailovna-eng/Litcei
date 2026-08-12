import React, { useState } from 'react';
import { WORD_PROBLEMS } from '../data/wordProblemsData';
import { ShoppingBag, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const WordProblemsTab: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [checkedStatus, setCheckedStatus] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>('wp-1');

  const handleCheck = (id: string, correctAns: number) => {
    const val = parseFloat((userAnswers[id] || '').replace(',', '.'));
    if (!isNaN(val) && Math.abs(val - correctAns) < 0.001) {
      setCheckedStatus((prev) => ({ ...prev, [id]: true }));
    } else {
      setCheckedStatus((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Title */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs space-y-2">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3B3630] flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-[#5D6D5E]" />
          Турмуштук Маселелер (Ондук бөлчөктөрдү турмушта колдонуу)
        </h2>
        <p className="text-xs sm:text-sm text-[#736C61]">
          Соода кылууда, аралыкты же салмакты ченөөдө ондук бөлчөктөрдү аткарууга практикалык мисалдар.
        </p>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {WORD_PROBLEMS.map((prob) => {
          const isExpanded = expandedId === prob.id;
          const isChecked = checkedStatus[prob.id];

          return (
            <div
              key={prob.id}
              className="bg-white rounded-2xl border border-[#E3DFD5] shadow-xs transition-all overflow-hidden"
            >
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#5D6D5E] uppercase tracking-wider bg-[#F0F4F0] px-2.5 py-0.5 rounded-full border border-[#CCD8CC]">
                      {prob.title}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#3B3630] leading-snug pt-1">
                      {prob.story}
                    </h3>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : prob.id)}
                    className="p-2 text-[#8C8476] hover:text-[#3B3630] hover:bg-[#F2EFE9] rounded-xl transition-colors cursor-pointer"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {/* Input Check Row */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder={`Жооп (${prob.unit})`}
                      value={userAnswers[prob.id] || ''}
                      onChange={(e) =>
                        setUserAnswers((prev) => ({ ...prev, [prob.id]: e.target.value }))
                      }
                      className="px-3.5 py-2 text-sm font-semibold rounded-xl border border-[#DCD6C9] focus:outline-none focus:ring-2 focus:ring-[#5D6D5E]/40 bg-[#FBF9F5] text-[#3B3630] w-36"
                    />
                    <span className="text-xs font-semibold text-[#736C61]">{prob.unit}</span>
                  </div>

                  <button
                    onClick={() => handleCheck(prob.id, prob.correctAnswer)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#5D6D5E] hover:bg-[#4E5D4F] text-white font-medium rounded-xl text-xs shadow-xs border border-[#7A8B7C]/50 transition-colors cursor-pointer"
                  >
                    Жоопту Текшерүү
                  </button>

                  {isChecked === true && (
                    <span className="text-xs font-bold text-[#345236] flex items-center gap-1 bg-[#F0F4F0] px-3 py-1.5 rounded-xl border border-[#CCD8CC]">
                      <CheckCircle className="w-4 h-4 text-[#476C4A]" /> Азаматсыз, туура! ({prob.correctAnswer} {prob.unit})
                    </span>
                  )}

                  {isChecked === false && (
                    <span className="text-xs font-bold text-[#9E4D32] bg-[#FAF2EE] px-3 py-1.5 rounded-xl border border-[#ECCFC3]">
                      Туура эмес, кайра байкап көрүңүз!
                    </span>
                  )}
                </div>

                {/* Expanded Solution */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#E3DFD5] space-y-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#E3DFD5]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#3B3630]">
                      <span>Туюнтмасы: <code className="bg-white px-2 py-0.5 rounded border border-[#DCD6C9] font-mono text-[#5D6D5E] text-sm">{prob.expression}</code></span>
                      <span className="text-[#345236]">Туура жообу: {prob.correctAnswer} {prob.unit}</span>
                    </div>

                    <div className="space-y-1 text-xs text-[#5C564D]">
                      <p className="font-semibold text-[#3B3630]">Чыгарылышы:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {prob.steps.map((st, idx) => (
                          <li key={idx}>{st}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

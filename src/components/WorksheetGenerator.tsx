import React, { useState } from 'react';
import { Printer, Copy, Check, Eye, EyeOff, FileText } from 'lucide-react';
import { EXAMPLES_DATA } from '../data/examplesData';

export const WorksheetGenerator: React.FC = () => {
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const lines = EXAMPLES_DATA.map(
      (ex, idx) =>
        `${idx + 1}) ${ex.title} = ${showAnswers ? ex.resultStr : '____'}`
    );
    const text = `ОНДУК БӨЛЧӨКТӨРДҮ КОШУУ ЖАНА КЕМИТҮҮ МИСАЛДАРЫ\n\n` + lines.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Printable Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#E3DFD5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#3B3630] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#5D6D5E]" />
            Шпаргалка жана Жөнөкөй Иш Баракчасы
          </h2>
          <p className="text-xs text-[#736C61]">Үй тапшырмасы же өз алдынча кайталоо үчүн даяр мисалдар жыйнагы.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#4A453E] border border-[#E0DBCF] transition-colors cursor-pointer"
          >
            {showAnswers ? <EyeOff className="w-4 h-4 text-[#736C61]" /> : <Eye className="w-4 h-4 text-[#5D6D5E]" />}
            <span>{showAnswers ? 'Жоопторду жашыруу' : 'Жоопторду көрсөтүү'}</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#4A453E] border border-[#E0DBCF] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#476C4A]" /> : <Copy className="w-4 h-4 text-[#736C61]" />}
            <span>{copied ? 'Көчүрүлдү!' : 'Баракчаны көчүрүү'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-[#5D6D5E] hover:bg-[#4E5D4F] text-white shadow-xs border border-[#7A8B7C]/50 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Басып чыгаруу (Print)</span>
          </button>
        </div>
      </div>

      {/* Printable Worksheet Body */}
      <div className="bg-white rounded-2xl p-8 border border-[#E3DFD5] shadow-xs space-y-8 print:shadow-none print:border-none print:p-0">
        <div className="text-center border-b border-[#E3DFD5] pb-4 space-y-1">
          <h1 className="text-2xl font-serif font-bold text-[#3B3630] tracking-tight">
            ОНДУК БӨЛЧӨКТӨРДҮ КОШУУ ЖАНА КЕМИТҮҮ
          </h1>
          <p className="text-xs text-[#736C61]">
            Окуучунун аты-жөнү: _______________________ &nbsp;&nbsp;|&nbsp;&nbsp; Датасы: ______________
          </p>
        </div>

        {/* Quick Rules Box */}
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E3DFD5] text-xs text-[#5C564D] space-y-1">
          <p className="font-bold text-[#3B3630]">📌 Эстеп калыңыз:</p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>1. Ондук үтүрдү үтүрдүн дал астына жайгаштырыңыз.</li>
            <li>2. Жетишпеген бөлчөк орундарга 0 (нөл) жазып теңдеңиз.</li>
            <li>3. Бүтүн сандар сыяктуу эле оңдон солго аткарыңыз.</li>
          </ul>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {EXAMPLES_DATA.map((ex, idx) => (
            <div key={ex.id} className="p-4 rounded-xl border border-[#E3DFD5] bg-[#FBF9F5] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#8C8476]">
                <span>№{idx + 1} Мисал</span>
                <span className="font-sans text-[10px] bg-white px-2 py-0.5 rounded border border-[#E3DFD5]">
                  {ex.category === 'кошуу' ? 'Кошуу' : 'Кемитүү'}
                </span>
              </div>

              <div className="text-xl font-bold font-mono text-[#3B3630] flex items-center justify-between">
                <span>{ex.title} =</span>
                <span className="text-[#5D6D5E] min-w-16 text-right font-mono font-bold">
                  {showAnswers ? ex.resultStr : '______'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-[#8C8476] border-t border-[#E3DFD5] pt-4">
          Кыргыз тилиндеги математикалык нускама баракчасы
        </div>
      </div>
    </div>
  );
};

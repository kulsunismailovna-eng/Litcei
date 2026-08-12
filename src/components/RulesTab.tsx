import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { buildColumnAlignment } from '../utils/mathUtils';

interface RulesTabProps {
  onStartPractice: () => void;
  onOpenSolver: () => void;
}

export const RulesTab: React.FC<RulesTabProps> = ({ onStartPractice, onOpenSolver }) => {
  const [demoOp, setDemoOp] = useState<'+' | '-'>('+');
  const demoNum1 = demoOp === '+' ? 12.45 : 15.6;
  const demoNum2 = demoOp === '+' ? 3.8 : 7.85;

  const colData = buildColumnAlignment(demoNum1, demoNum2, demoOp);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Hero Welcome Card */}
      <div className="bg-[#384339] rounded-2xl p-6 sm:p-8 text-[#F9F7F2] shadow-sm border border-[#485549] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#5D6D5E]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5D6D5E]/60 text-[#EBE7DE] border border-[#7A8B7C]/40 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#E3B096]" /> Математикалык Негиздер
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-[#F9F7F2] leading-tight">
            Ондук бөлчөктөрдү кошуу жана кемитүүнүн негизги эрежелери
          </h2>
          <p className="text-[#D8D2C5] text-sm sm:text-base leading-relaxed">
            Ондук бөлчөктөрдү амалдар менен аткаруу кадимки бүтүн сандарды кошуу жана кемитүүгө абдан окшош. Эң башкы сыр — <span className="text-[#E3B096] font-bold underline decoration-[#C18C72]/60">ондук үтүрдү туура туташтырып, баганда жазуу!</span>
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={onStartPractice}
              className="inline-flex items-center gap-2 bg-[#5D6D5E] hover:bg-[#4E5D4F] text-white font-medium px-5 py-2.5 rounded-xl border border-[#7A8B7C]/50 transition-all text-sm cursor-pointer shadow-sm"
            >
              Машыгууну Баштоо <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenSolver}
              className="inline-flex items-center gap-2 bg-[#2B332B] hover:bg-[#232B23] text-[#E0DBCF] border border-[#485549] px-5 py-2.5 rounded-xl transition-all text-sm cursor-pointer"
            >
              Кадамдуу Калькулятор
            </button>
          </div>
        </div>
      </div>

      {/* 4 Main Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs hover:border-[#5D6D5E]/40 transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-[#F2EFE9] text-[#5D6D5E] flex items-center justify-center font-serif font-bold text-lg mb-4 border border-[#E0DBCF]">
            1
          </div>
          <h3 className="text-lg font-serif font-bold text-[#3B3630] mb-2">Үтүрдүн астына үтүрдү кошуу</h3>
          <p className="text-[#5C564D] text-sm leading-relaxed">
            Сандарды вертикалдуу (баганда) жазганда, эң биринчи кезектүү кадам — <strong className="text-[#3B3630]">ондук үтүрдү так бир сызыктын астында</strong> тургандай жайгаштыруу.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs hover:border-[#5D6D5E]/40 transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-[#EFEFE8] text-[#425844] flex items-center justify-center font-serif font-bold text-lg mb-4 border border-[#D5D8CF]">
            2
          </div>
          <h3 className="text-lg font-serif font-bold text-[#3B3630] mb-2">Нөлдөрдү кошуп теңдөө</h3>
          <p className="text-[#5C564D] text-sm leading-relaxed">
            Эгерде сандардын бөлчөк бөлүгүндөгү орундардын саны тең эмес болсо (мисалы, <span className="font-mono bg-[#F2EFE9] px-1.5 py-0.5 rounded text-[#5D6D5E]">12.45</span> жана <span className="font-mono bg-[#F2EFE9] px-1.5 py-0.5 rounded text-[#5D6D5E]">3.8</span>), анда аягына <strong className="text-[#425844]">0 (нөл)</strong> кошуп, орундарды теңдейбиз (<span className="font-mono bg-[#E9EFE9] px-1.5 py-0.5 rounded text-[#365239] font-bold">3.80</span>).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs hover:border-[#5D6D5E]/40 transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-[#F8EFEA] text-[#9E5D43] flex items-center justify-center font-serif font-bold text-lg mb-4 border border-[#EADAD1]">
            3
          </div>
          <h3 className="text-lg font-serif font-bold text-[#3B3630] mb-2">Кадимки сандардай кошуу/кемитүү</h3>
          <p className="text-[#5C564D] text-sm leading-relaxed">
            Үтүргө көңүл бурбай туруп, кадимки натуралдык сандардай эле эң оң тараптагы разряддан баштап кошобуз же кемитебиз.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs hover:border-[#5D6D5E]/40 transition-all relative">
          <div className="w-10 h-10 rounded-xl bg-[#F2EFE9] text-[#695D4A] flex items-center justify-center font-serif font-bold text-lg mb-4 border border-[#E2DDD3]">
            4
          </div>
          <h3 className="text-lg font-serif font-bold text-[#3B3630] mb-2">Жоопко үтүрдү так түшүрүү</h3>
          <p className="text-[#5C564D] text-sm leading-relaxed">
            Эсептөө бүткөндөн кийин, жооптогу ондук үтүрдү жогорудагы үтүрдүн дал астына орнотобуз.
          </p>
        </div>
      </div>

      {/* Interactive Visual Alignment Demonstration */}
      <div className="bg-[#2E362F] text-[#F9F7F2] rounded-2xl p-6 sm:p-8 border border-[#404D41] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#404D41] pb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-[#F9F7F2] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#E3B096]" />
              Интерактивдүү Баганда Көрсөтмө (Column View)
            </h3>
            <p className="text-xs text-[#B5AFA3]">Үтүрдүн жайгашуусун жана нөлдүн кошулушун байкаңыз</p>
          </div>

          <div className="inline-flex p-1 bg-[#232924] rounded-xl border border-[#404D41]">
            <button
              onClick={() => setDemoOp('+')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                demoOp === '+' ? 'bg-[#5D6D5E] text-white shadow-xs border border-[#7A8B7C]/50' : 'text-[#A0998E] hover:text-white'
              }`}
            >
              Кошуу (12.45 + 3.8)
            </button>
            <button
              onClick={() => setDemoOp('-')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                demoOp === '-' ? 'bg-[#5D6D5E] text-white shadow-xs border border-[#7A8B7C]/50' : 'text-[#A0998E] hover:text-white'
              }`}
            >
              Кемитүү (15.6 - 7.85)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Visual Grid Column */}
          <div className="bg-[#1F2420] p-6 rounded-2xl border border-[#3B473C] font-mono text-xl sm:text-2xl flex flex-col items-center justify-center space-y-2 text-[#E2DDD3] tracking-widest select-none">
            {/* Number 1 Row */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <span className="w-6 text-[#7E776C] text-base">{demoOp}</span>
              {colData.row1Chars.map((ch, idx) => (
                <span
                  key={idx}
                  className={`w-8 h-10 flex items-center justify-center rounded-lg ${
                    ch.isDecimalPoint
                      ? 'bg-[#A66D55]/30 text-[#E8B8A2] font-bold border border-[#A66D55]/60 scale-105'
                      : ch.isPaddedZero
                      ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold border border-[#5D6D5E]/60 ring-2 ring-[#5D6D5E]/30'
                      : 'bg-[#29312A] border border-[#3A463B]'
                  }`}
                >
                  {ch.char}
                </span>
              ))}
            </div>

            {/* Number 2 Row */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <span className="w-6 text-[#7E776C] text-base font-sans font-bold">{demoOp}</span>
              {colData.row2Chars.map((ch, idx) => (
                <span
                  key={idx}
                  className={`w-8 h-10 flex items-center justify-center rounded-lg ${
                    ch.isDecimalPoint
                      ? 'bg-[#A66D55]/30 text-[#E8B8A2] font-bold border border-[#A66D55]/60 scale-105'
                      : ch.isPaddedZero
                      ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold border border-[#5D6D5E]/60 ring-2 ring-[#5D6D5E]/30'
                      : 'bg-[#29312A] border border-[#3A463B]'
                  }`}
                >
                  {ch.char}
                </span>
              ))}
            </div>

            {/* Separator line */}
            <div className="w-full h-1 bg-[#475448] my-2 rounded-full" />

            {/* Result Row */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 text-[#A8C3AB] font-bold">
              <span className="w-6 text-[#7E776C] text-base">=</span>
              {colData.resultChars.map((ch, idx) => (
                <span
                  key={idx}
                  className={`w-8 h-10 flex items-center justify-center rounded-lg ${
                    ch.isDecimalPoint
                      ? 'bg-[#A66D55]/40 text-[#E8B8A2] font-extrabold border border-[#A66D55] ring-2 ring-[#A66D55]/40 scale-105'
                      : 'bg-[#263327] border border-[#485B4A] text-[#C1DBC4]'
                  }`}
                >
                  {ch.char}
                </span>
              ))}
            </div>
          </div>

          {/* Explanation checklist */}
          <div className="space-y-3 text-sm text-[#D5CF2]">
            <div className="flex items-start gap-3 bg-[#252C26] p-3.5 rounded-xl border border-[#3B473C]">
              <div className="w-3 h-3 rounded-full bg-[#E8B8A2] mt-1 shrink-0" />
              <div>
                <span className="text-white font-semibold">Терракота үтүр:</span> Үтүрдүн астына үтүр жайгаштырылды.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#252C26] p-3.5 rounded-xl border border-[#3B473C]">
              <div className="w-3 h-3 rounded-full bg-[#A8C3AB] mt-1 shrink-0" />
              <div>
                <span className="text-white font-semibold">Жашыл түстөгү нөл:</span> {demoOp === '+' ? '3.8 санына нөл кошулуп 3.80 кылынды' : '15.6 санына нөл кошулуп 15.60 кылынды'}.
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[#252C26] p-3.5 rounded-xl border border-[#3B473C]">
              <CheckCircle2 className="w-5 h-5 text-[#A8C3AB] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold">Жыйынтык:</span> {demoNum1} {demoOp} {demoNum2} = <strong className="text-[#A8C3AB] font-mono text-base ml-1">{colData.resultStr}</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes Comparison */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3DFD5] shadow-xs space-y-6">
        <h3 className="text-xl font-serif font-bold text-[#3B3630] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#C18C72]" /> Көп Кетирилүүчү Каталар (Туура же Ката Жазылыш)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wrong Example */}
          <div className="bg-[#FAF2EE] border border-[#ECCFC3] rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-[#9E4D32] font-bold text-sm">
              <XCircle className="w-5 h-5 text-[#A65B40]" />
              <span>КАТА АТКАРУУ: Үтүр түз астында эмес</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#ECCFC3] font-mono text-[#4A453E] space-y-1">
              <div>&nbsp; 12.45</div>
              <div>+ &nbsp;3.8 &nbsp; <span className="text-[#A65B40] text-xs font-sans font-semibold">(үтүрсүз туташтырылган)</span></div>
              <div className="border-t border-[#E3DFD5] pt-1 font-bold text-[#A65B40]">&nbsp; 16.25 эмес, 15.53 чыгып калат! ❌</div>
            </div>
            <p className="text-xs text-[#824430]">
              Баганда сандарды оң четинен гана түзөп алсак, ондук үлүш менен бүтүн сан кошулуп кетип, ката жооп чыгат.
            </p>
          </div>

          {/* Correct Example */}
          <div className="bg-[#F0F4F0] border border-[#CCD8CC] rounded-2xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-[#345236] font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#476C4A]" />
              <span>ТУУРА АТКАРУУ: Үтүрдүн астында үтүр + нөл кошуу</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#CCD8CC] font-mono text-[#3B3630] space-y-1">
              <div>&nbsp; 12.45</div>
              <div>+ &nbsp;03.8<span className="text-[#476C4A] font-bold underline">0</span></div>
              <div className="border-t border-[#E3DFD5] pt-1 font-bold text-[#345236]">&nbsp; 16.25 ✅</div>
            </div>
            <p className="text-xs text-[#3A5B3D]">
              Үтүр үтүрдүн дал астында, жетишпеген ордуна нөл жазылды. Натыйжа туура чыкты!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

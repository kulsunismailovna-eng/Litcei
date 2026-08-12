import React, { useState } from 'react';
import { Calculator, Play, RefreshCw, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { buildColumnAlignment, roundDecimal, countDecimalPlaces, padToDecimalPlaces } from '../utils/mathUtils';

export const StepByStepSolver: React.FC = () => {
  const [inputNum1, setInputNum1] = useState<string>('15.6');
  const [inputNum2, setInputNum2] = useState<string>('7.85');
  const [operation, setOperation] = useState<'+' | '-'>('-');

  // Error message state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Parsed numbers
  const n1 = parseFloat(inputNum1);
  const n2 = parseFloat(inputNum2);

  const isValid = !isNaN(n1) && !isNaN(n2);

  const handleCalculate = () => {
    if (isNaN(n1) || isNaN(n2)) {
      setErrorMsg('Сураныч, туура сандарды киргизиңиз!');
      return;
    }
    setErrorMsg(null);
  };

  const setPreset = (v1: string, v2: string, op: '+' | '-') => {
    setInputNum1(v1);
    setInputNum2(v2);
    setOperation(op);
    setErrorMsg(null);
  };

  const colData = isValid ? buildColumnAlignment(n1, n2, operation) : null;

  // Generate dynamic step breakdown in Kyrgyz
  const generateDynamicSteps = () => {
    if (!isValid || !colData) return [];

    const steps = [];
    const maxDec = Math.max(countDecimalPlaces(n1), countDecimalPlaces(n2), 1);
    const num1Padded = padToDecimalPlaces(n1, maxDec);
    const num2Padded = padToDecimalPlaces(n2, maxDec);

    steps.push({
      num: 1,
      title: 'Сандарды ондук үтүрдүн негизинде жайгаштыруу',
      text: `Биринчи сан (${n1}) жана экинчи сан (${n2}) баганда үтүр үтүрдүн туура астында болгудай тизилет.`
    });

    if (countDecimalPlaces(n1) !== countDecimalPlaces(n2)) {
      steps.push({
        num: 2,
        title: 'Разряддарды нөл кошуп теңдөө',
        text: `Бөлчөк орундары тең болушу үчүн: ${n1} -> ${num1Padded} жана ${n2} -> ${num2Padded} болуп өзгөртүлдү.`
      });
    }

    if (operation === '+') {
      steps.push({
        num: steps.length + 1,
        title: 'Оңдон солго карай кошуу',
        text: `Оң жактагы ондук/жүздук үлүштөрдөн баштап бүтүн бөлүктөргө чейин сандар кошулат. Кошулуучу сан 10дон ашса, кийинки разрядга өткөрүлөт.`
      });
    } else {
      steps.push({
        num: steps.length + 1,
        title: 'Оңдон солго карай кемитүү',
        text: `Үтүргө карабай туруп, кадимки бүтүн сандардай кемитилет. Эгерде үстүнкү сан кичине болсо, сол жактагы коңшу бүтүн разряддан 1 карызга алынат.`
      });
    }

    steps.push({
      num: steps.length + 1,
      title: 'Жоопко үтүрдү коюу',
      text: `Багандагы үтүрдүн астына дал келтирип үтүр коюлат. Жообу: ${colData.resultStr}.`
    });

    return steps;
  };

  const dynamicSteps = generateDynamicSteps();

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Input Form Box */}
      <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#3B3630] flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#5D6D5E]" />
              Кадамдуу Эсептөө Калькулятору
            </h2>
            <p className="text-xs sm:text-sm text-[#736C61]">
              Каалаган эки ондук бөлчөктү киргизип, алардын багандагы аткарылуусун кадам-кадам көрүңүз.
            </p>
          </div>
        </div>

        {/* Inputs & Operation */}
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center">
          {/* Number 1 Input */}
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-[#5C564D]">Биринчи ондук сан:</label>
            <input
              type="text"
              value={inputNum1}
              onChange={(e) => setInputNum1(e.target.value)}
              placeholder="Мисалы: 12.45"
              className="w-full px-4 py-2.5 text-base sm:text-lg font-mono font-bold rounded-xl border border-[#DCD6C9] focus:outline-none focus:ring-2 focus:ring-[#5D6D5E]/40 bg-[#FBF9F5] text-[#3B3630]"
            />
          </div>

          {/* Operation selector */}
          <div className="sm:col-span-1 space-y-1 text-center">
            <label className="text-xs font-semibold text-[#5C564D] block">Амал:</label>
            <div className="inline-flex p-1 bg-[#F2EFE9] rounded-xl border border-[#E0DBCF] w-full justify-center">
              <button
                type="button"
                onClick={() => setOperation('+')}
                className={`flex-1 py-1.5 rounded-lg text-lg font-bold transition-all cursor-pointer ${
                  operation === '+' ? 'bg-[#5D6D5E] text-white shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
                }`}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setOperation('-')}
                className={`flex-1 py-1.5 rounded-lg text-lg font-bold transition-all cursor-pointer ${
                  operation === '-' ? 'bg-[#5D6D5E] text-white shadow-xs' : 'text-[#736C61] hover:text-[#3B3630]'
                }`}
              >
                -
              </button>
            </div>
          </div>

          {/* Number 2 Input */}
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-[#5C564D]">Экинчи ондук сан:</label>
            <input
              type="text"
              value={inputNum2}
              onChange={(e) => setInputNum2(e.target.value)}
              placeholder="Мисалы: 3.8"
              className="w-full px-4 py-2.5 text-base sm:text-lg font-mono font-bold rounded-xl border border-[#DCD6C9] focus:outline-none focus:ring-2 focus:ring-[#5D6D5E]/40 bg-[#FBF9F5] text-[#3B3630]"
            />
          </div>

          {/* Submit Action */}
          <div className="sm:col-span-2 pt-5">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#5D6D5E] hover:bg-[#4E5D4F] text-white font-medium py-2.5 px-4 rounded-xl shadow-xs border border-[#7A8B7C]/50 transition-all text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#E2DDD3]" />
              <span>Кадамдуу Чыгаруу</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-[#FAF2EE] border border-[#ECCFC3] text-[#9E4D32] rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Quick Presets */}
        <div className="pt-2 border-t border-[#E3DFD5] space-y-2">
          <span className="text-xs text-[#736C61] font-semibold">Даяр мисалдарды тандап көрүңүз:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPreset('12.45', '3.8', '+')}
              className="px-3 py-1 bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#5C564D] hover:text-[#3B3630] rounded-lg text-xs font-mono border border-[#E0DBCF] transition-colors cursor-pointer"
            >
              12.45 + 3.8
            </button>
            <button
              onClick={() => setPreset('15.6', '7.85', '-')}
              className="px-3 py-1 bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#5C564D] hover:text-[#3B3630] rounded-lg text-xs font-mono border border-[#E0DBCF] transition-colors cursor-pointer"
            >
              15.6 - 7.85
            </button>
            <button
              onClick={() => setPreset('25', '14.82', '-')}
              className="px-3 py-1 bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#5C564D] hover:text-[#3B3630] rounded-lg text-xs font-mono border border-[#E0DBCF] transition-colors cursor-pointer"
            >
              25 - 14.82
            </button>
            <button
              onClick={() => setPreset('100', '45.678', '-')}
              className="px-3 py-1 bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#5C564D] hover:text-[#3B3630] rounded-lg text-xs font-mono border border-[#E0DBCF] transition-colors cursor-pointer"
            >
              100 - 45.678
            </button>
            <button
              onClick={() => setPreset('7.89', '0.154', '+')}
              className="px-3 py-1 bg-[#F2EFE9] hover:bg-[#EAE5DA] text-[#5C564D] hover:text-[#3B3630] rounded-lg text-xs font-mono border border-[#E0DBCF] transition-colors cursor-pointer"
            >
              7.89 + 0.154
            </button>
          </div>
        </div>
      </div>

      {/* Output Results & Visual Breakdown */}
      {isValid && colData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column Visual View */}
          <div className="bg-[#1F2420] text-[#F9F7F2] rounded-2xl p-6 border border-[#3B473C] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#3B473C] pb-3">
              <span className="text-xs font-bold text-[#B5AFA3] uppercase tracking-wider">
                Багандагы Жайгашуусу
              </span>
              <span className="text-xs font-mono font-bold text-[#A8C3AB] bg-[#2A362C] border border-[#3A4B3D] px-2.5 py-0.5 rounded-full">
                Жообу: {colData.resultStr}
              </span>
            </div>

            <div className="bg-[#29312A] p-6 rounded-2xl border border-[#3A463B] font-mono text-2xl sm:text-3xl flex flex-col items-center justify-center space-y-2 text-[#E2DDD3] tracking-widest select-none">
              {/* Row 1 */}
              <div className="flex items-center space-x-2">
                <span className="w-6 text-[#7E776C] text-lg">{operation}</span>
                {colData.row1Chars.map((ch, idx) => (
                  <span
                    key={idx}
                    className={`w-9 h-11 flex items-center justify-center rounded-lg ${
                      ch.isDecimalPoint
                        ? 'bg-[#A66D55]/30 text-[#E8B8A2] font-bold border border-[#A66D55]/60 scale-105'
                        : ch.isPaddedZero
                        ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold border border-[#5D6D5E]/60 ring-2 ring-[#5D6D5E]/40'
                        : 'bg-[#1F2420] border border-[#3B473C]'
                    }`}
                  >
                    {ch.char}
                  </span>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex items-center space-x-2">
                <span className="w-6 text-[#7E776C] text-lg font-bold">{operation}</span>
                {colData.row2Chars.map((ch, idx) => (
                  <span
                    key={idx}
                    className={`w-9 h-11 flex items-center justify-center rounded-lg ${
                      ch.isDecimalPoint
                        ? 'bg-[#A66D55]/30 text-[#E8B8A2] font-bold border border-[#A66D55]/60 scale-105'
                        : ch.isPaddedZero
                        ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold border border-[#5D6D5E]/60 ring-2 ring-[#5D6D5E]/40'
                        : 'bg-[#1F2420] border border-[#3B473C]'
                    }`}
                  >
                    {ch.char}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="w-full h-1 bg-[#475448] my-2 rounded-full" />

              {/* Result */}
              <div className="flex items-center space-x-2 text-[#A8C3AB] font-bold">
                <span className="w-6 text-[#7E776C] text-lg">=</span>
                {colData.resultChars.map((ch, idx) => (
                  <span
                    key={idx}
                    className={`w-9 h-11 flex items-center justify-center rounded-lg ${
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

            <div className="space-y-2 text-xs text-[#B5AFA3] pt-2 border-t border-[#3B473C]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8B8A2]" />
                <span>Терракота түс: Ондук үтүр бир сызыкта</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A8C3AB]" />
                <span>Жашыл түс: Орундарды теңдөө үчүн кошулган 0</span>
              </div>
            </div>
          </div>

          {/* Right Column Step Explanations */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3DFD5] shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#3B3630] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#C18C72]" />
              Кадам-кадам Түшүндүрмө
            </h3>

            <div className="space-y-3">
              {dynamicSteps.map((s) => (
                <div key={s.num} className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E3DFD5] space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-[#5D6D5E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {s.num}
                    </span>
                    <span className="font-semibold text-[#3B3630] text-sm">{s.title}</span>
                  </div>
                  <p className="text-xs text-[#5C564D] pl-7 leading-relaxed">{s.text}</p>
                </div>
              ))}

              <div className="p-4 bg-[#F0F4F0] rounded-xl border border-[#CCD8CC] flex items-center space-x-3 text-[#345236]">
                <CheckCircle2 className="w-6 h-6 text-[#476C4A] shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#3A5B3D]">Акыркы Натыйжа:</div>
                  <div className="text-lg font-bold font-mono text-[#345236]">
                    {inputNum1} {operation} {inputNum2} = {colData.resultStr}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

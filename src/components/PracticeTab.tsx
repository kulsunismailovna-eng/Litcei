import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PracticeQuestion, DifficultyLevel, OperationType } from '../types';
import { generateRandomPracticeQuestion, buildColumnAlignment } from '../utils/mathUtils';
import { GraduationCap, CheckCircle, XCircle, Lightbulb, RefreshCw, Trophy, Flame, HelpCircle } from 'lucide-react';

interface PracticeTabProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  score,
  setScore,
  streak,
  setStreak,
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [opFilter, setOpFilter] = useState<OperationType>('mixed');

  const [currentQuestion, setCurrentQuestion] = useState<PracticeQuestion>(() =>
    generateRandomPracticeQuestion('easy', 'mixed')
  );

  const [userAnswer, setUserAnswer] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleNextQuestion = () => {
    setCurrentQuestion(generateRandomPracticeQuestion(difficulty, opFilter));
    setUserAnswer('');
    setStatus('idle');
    setShowHint(false);
    setShowSolution(false);
  };

  useEffect(() => {
    handleNextQuestion();
  }, [difficulty, opFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const parsedUserAns = parseFloat(userAnswer.replace(',', '.'));
    if (isNaN(parsedUserAns)) return;

    const diff = Math.abs(parsedUserAns - currentQuestion.correctAnswer);
    if (diff < 0.0001) {
      // Correct!
      setStatus('correct');
      setScore((prev) => prev + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30));
      setStreak((prev) => prev + 1);

      // Fire confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      // Wrong
      setStatus('wrong');
      setStreak(0);
    }
  };

  const colData = buildColumnAlignment(
    currentQuestion.num1,
    currentQuestion.num2,
    currentQuestion.operation
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Settings & Filters Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#E3DFD5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#3B3630] flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#5D6D5E]" />
            Интерактивдүү Машыгуу жана Тест
          </h2>
          <p className="text-xs text-[#736C61]">Өз билимиңизди сынап, ондук бөлчөктөр боюнча машыгыңыз!</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Difficulty selector */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            className="px-3 py-1.5 rounded-xl border border-[#DCD6C9] text-xs font-semibold text-[#4A453E] bg-[#FBF9F5] focus:outline-none focus:ring-2 focus:ring-[#5D6D5E]/40 cursor-pointer"
          >
            <option value="easy">Жеңил деңгээл</option>
            <option value="medium">Орточо деңгээл</option>
            <option value="hard">Татаал деңгээл</option>
          </select>

          {/* Operation selector */}
          <select
            value={opFilter}
            onChange={(e) => setOpFilter(e.target.value as OperationType)}
            className="px-3 py-1.5 rounded-xl border border-[#DCD6C9] text-xs font-semibold text-[#4A453E] bg-[#FBF9F5] focus:outline-none focus:ring-2 focus:ring-[#5D6D5E]/40 cursor-pointer"
          >
            <option value="mixed">Кошуу жана Кемитүү</option>
            <option value="addition">Кошуу гана (+)</option>
            <option value="subtraction">Кемитүү гана (-)</option>
          </select>
        </div>
      </div>

      {/* Main Practice Question Card */}
      <div className="bg-white rounded-2xl border border-[#E3DFD5] shadow-xs p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#736C61] uppercase tracking-wider">
            {currentQuestion.operation === '+' ? '➕ Кошуу Машыгуусу' : '➖ Кемитүү Машыгуусу'}
          </span>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="flex items-center gap-1 text-[#9E5D43] bg-[#F8EFEA] px-2.5 py-1 rounded-full border border-[#EADAD1]">
              <Flame className="w-3.5 h-3.5 text-[#C18C72]" /> Сызык: {streak}
            </span>
            <span className="flex items-center gap-1 text-[#365239] bg-[#EFEFE8] px-2.5 py-1 rounded-full border border-[#CCD8CC]">
              <Trophy className="w-3.5 h-3.5 text-[#5D6D5E]" /> Упай: {score}
            </span>
          </div>
        </div>

        {/* Expression Box */}
        <div className="text-center space-y-3 py-5 bg-[#FAF8F5] rounded-2xl border border-[#E3DFD5]">
          <p className="text-xs text-[#736C61]">Төмөнкү туюнтманын маанисин табыңыз:</p>
          <div className="text-3xl sm:text-5xl font-extrabold font-mono text-[#3B3630] tracking-tight">
            {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = <span className="text-[#5D6D5E]">?</span>
          </div>
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#5C564D] block text-center">
              Жообуңузду жазыңыз:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={status === 'correct'}
              placeholder="Мисалы: 16.25"
              className={`w-full text-center px-4 py-3 text-2xl font-mono font-bold rounded-xl border focus:outline-none transition-all ${
                status === 'correct'
                  ? 'bg-[#F0F4F0] border-[#CCD8CC] text-[#345236]'
                  : status === 'wrong'
                  ? 'bg-[#FAF2EE] border-[#ECCFC3] text-[#9E4D32]'
                  : 'bg-white border-[#DCD6C9] focus:ring-2 focus:ring-[#5D6D5E]/40 text-[#3B3630]'
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {status !== 'correct' ? (
              <button
                type="submit"
                className="flex-1 bg-[#5D6D5E] hover:bg-[#4E5D4F] text-white font-bold py-3 px-4 rounded-xl shadow-xs border border-[#7A8B7C]/50 transition-all text-sm cursor-pointer"
              >
                Текшерүү
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="flex-1 bg-[#476C4A] hover:bg-[#3B5A3D] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#E2DDD3]" />
                <span>Кийинки Мисал</span>
              </button>
            )}
          </div>
        </form>

        {/* Result Status Alert */}
        {status === 'correct' && (
          <div className="p-4 bg-[#F0F4F0] border border-[#CCD8CC] rounded-xl text-[#345236] flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-[#476C4A] shrink-0" />
            <div>
              <p className="font-bold text-sm">Азаматсыз! Туура жооп! 🎉</p>
              <p className="text-xs text-[#3A5B3D]">
                {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = {currentQuestion.correctAnswer}
              </p>
            </div>
          </div>
        )}

        {status === 'wrong' && (
          <div className="p-4 bg-[#FAF2EE] border border-[#ECCFC3] rounded-xl text-[#9E4D32] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <XCircle className="w-6 h-6 text-[#A65B40] shrink-0" />
              <div>
                <p className="font-bold text-sm">Туура эмес болду!</p>
                <p className="text-xs text-[#824430]">Кайра аракет кылып көрүңүз же төмөндөн туура чыгарылышын караңыз.</p>
              </div>
            </div>
            <button
              onClick={() => setShowSolution(true)}
              className="text-xs font-semibold underline text-[#9E4D32] hover:text-[#783620] cursor-pointer"
            >
              Чыгарылышын көрүү
            </button>
          </div>
        )}

        {/* Hint & Solution Toggles */}
        <div className="pt-4 border-t border-[#E3DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-[#9E5D43] hover:text-[#783E29] font-semibold cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-[#C18C72]" />
            <span>{showHint ? 'Көмөктү жашыруу' : 'Көмөк алуу (Подсказка)'}</span>
          </button>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="inline-flex items-center gap-1.5 text-[#5D6D5E] hover:text-[#3B473C] font-semibold cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#7A8B7C]" />
            <span>{showSolution ? 'Чыгарылышты жашыруу' : 'Толук чыгарылышын көрүү'}</span>
          </button>

          <button
            onClick={handleNextQuestion}
            className="inline-flex items-center gap-1 text-[#736C61] hover:text-[#3B3630] font-medium ml-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Мисалды алмаштыруу
          </button>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="p-3.5 bg-[#F8EFEA] border border-[#EADAD1] rounded-xl text-[#9E5D43] text-xs leading-relaxed space-y-1">
            <span className="font-bold block text-[#783E29]">💡 Көмөк:</span>
            <p>{currentQuestion.hint}</p>
          </div>
        )}

        {/* Full Solution Breakdown */}
        {showSolution && (
          <div className="p-5 bg-[#1F2420] text-[#F9F7F2] rounded-xl border border-[#3B473C] space-y-4">
            <h4 className="text-xs font-bold text-[#B5AFA3] uppercase tracking-wider">
              Толук Кадамдуу Чыгарылышы:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Column view */}
              <div className="bg-[#29312A] p-4 rounded-xl border border-[#3A463B] font-mono text-xl flex flex-col items-center justify-center space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-4 text-[#7E776C] text-sm">{currentQuestion.operation}</span>
                  {colData.row1Chars.map((ch, idx) => (
                    <span
                      key={idx}
                      className={`w-7 h-8 flex items-center justify-center rounded ${
                        ch.isDecimalPoint
                          ? 'bg-[#A66D55]/30 text-[#E8B8A2]'
                          : ch.isPaddedZero
                          ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold'
                          : 'bg-[#1F2420]'
                      }`}
                    >
                      {ch.char}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="w-4 text-[#7E776C] text-sm">{currentQuestion.operation}</span>
                  {colData.row2Chars.map((ch, idx) => (
                    <span
                      key={idx}
                      className={`w-7 h-8 flex items-center justify-center rounded ${
                        ch.isDecimalPoint
                          ? 'bg-[#A66D55]/30 text-[#E8B8A2]'
                          : ch.isPaddedZero
                          ? 'bg-[#5D6D5E]/30 text-[#A8C3AB] font-bold'
                          : 'bg-[#1F2420]'
                      }`}
                    >
                      {ch.char}
                    </span>
                  ))}
                </div>

                <div className="w-full h-0.5 bg-[#475448] my-1" />

                <div className="flex items-center space-x-2 text-[#A8C3AB] font-bold">
                  <span className="w-4 text-[#7E776C] text-sm">=</span>
                  {colData.resultChars.map((ch, idx) => (
                    <span key={idx} className="w-7 h-8 flex items-center justify-center rounded bg-[#263327] text-[#C1DBC4]">
                      {ch.char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps explanation */}
              <div className="space-y-1.5 text-xs text-[#E2DDD3]">
                {currentQuestion.explanationSteps.map((stepStr, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {stepStr}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

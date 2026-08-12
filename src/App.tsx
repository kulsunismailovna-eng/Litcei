/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, TabType } from './components/Header';
import { RulesTab } from './components/RulesTab';
import { ExamplesTab } from './components/ExamplesTab';
import { StepByStepSolver } from './components/StepByStepSolver';
import { PracticeTab } from './components/PracticeTab';
import { WordProblemsTab } from './components/WordProblemsTab';
import { WorksheetGenerator } from './components/WorksheetGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('rules');
  const [practiceScore, setPracticeScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#4A453E] font-sans flex flex-col antialiased">
      {/* Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        practiceScore={practiceScore}
        streak={streak}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'rules' && (
          <RulesTab
            onStartPractice={() => setActiveTab('practice')}
            onOpenSolver={() => setActiveTab('solver')}
          />
        )}

        {activeTab === 'examples' && <ExamplesTab />}

        {activeTab === 'solver' && <StepByStepSolver />}

        {activeTab === 'practice' && (
          <PracticeTab
            score={practiceScore}
            setScore={setPracticeScore}
            streak={streak}
            setStreak={setStreak}
          />
        )}

        {activeTab === 'word-problems' && <WordProblemsTab />}

        {activeTab === 'worksheet' && <WorksheetGenerator />}
      </main>

      {/* Footer */}
      <footer className="bg-[#EBE7DE] text-[#4A453E] border-t border-[#E0DBCF] py-6 text-xs text-center mt-8">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="text-[#5D6D5E] font-serif font-bold text-sm">
            Ондук Бөлчөктөрдү Кошуу жана Кемитүү — Математикалык Нускама
          </p>
          <p className="text-[#8C8476]">
            Бардык эрежелер, кадамдуу көрсөтмөлөр жана мисалдар кыргыз тилинде иштелип чыкты.
          </p>
        </div>
      </footer>
    </div>
  );
}

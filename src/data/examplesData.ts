import { DecimalExample } from '../types';

export const EXAMPLES_DATA: DecimalExample[] = [
  // --- КОШУУ МИСАЛДАРЫ (ADDITION EXAMPLES) ---
  {
    id: 'add-1',
    num1: 2.3,
    num2: 4.5,
    operation: '+',
    result: 6.8,
    difficulty: 'easy',
    category: 'кошуу',
    title: '2.3 + 4.5',
    explanation: 'Бирдей ондук орунга ээ болгон бөлчөктөрдү кошуу.',
    num1PaddedStr: '2.3',
    num2PaddedStr: '4.5',
    resultStr: '6.8',
    steps: [
      {
        stepNumber: 1,
        title: 'Үтүрдүн астына үтүрдү жайгаштыруу',
        description: 'Сандарды ондук үтүрдүн негизинде бир катарда жазабыз: үтүр үтүрдүн астында турушу керек.'
      },
      {
        stepNumber: 2,
        title: 'Бөлчөк бөлүктөрүн кошуу',
        description: 'Оң тараптан баштап ондук үлүштөрдү кошобуз: 3 + 5 = 8.'
      },
      {
        stepNumber: 3,
        title: 'Бүтүн бөлүктөрүн кошуу',
        description: 'Бүтүн бөлүктөрдү кошобуз: 2 + 4 = 6.'
      },
      {
        stepNumber: 4,
        title: 'Үтүрдү ордуна коюу',
        description: 'Жоопко үтүрдү так ошол катардагы ордуна коебуз: 6.8.'
      }
    ]
  },
  {
    id: 'add-2',
    num1: 0.74,
    num2: 0.58,
    operation: '+',
    result: 1.32,
    difficulty: 'easy',
    category: 'кошуу',
    title: '0.74 + 0.58',
    explanation: 'Ойдо тутуу (кийинки разрядга өтүү) менен кошуу.',
    num1PaddedStr: '0.74',
    num2PaddedStr: '0.58',
    resultStr: '1.32',
    steps: [
      {
        stepNumber: 1,
        title: 'Жүздук үлүштөрдү кошуу',
        description: '4 + 8 = 12. 2син жазып, 1ин ойдо тутабыз (ондук үлүшкө өткөрөбүз).'
      },
      {
        stepNumber: 2,
        title: 'Ондук үлүштөрдү кошуу',
        description: '7 + 5 = 12, ойдогу 1ди кошсок 13 болот. 3тү жазып, 1ди бүтүн бөлүккө өткөрөбүз.'
      },
      {
        stepNumber: 3,
        title: 'Бүтүн бөлүктөрдү кошуу',
        description: '0 + 0 = 0, ойдогу 1ди кошсок 1 болот.'
      },
      {
        stepNumber: 4,
        title: 'Жыйынтык',
        description: 'Үтүрдү түз түшүрөбүз: Жообу 1.32.'
      }
    ]
  },
  {
    id: 'add-3',
    num1: 12.45,
    num2: 3.8,
    operation: '+',
    result: 16.25,
    difficulty: 'medium',
    category: 'кошуу',
    title: '12.45 + 3.8',
    explanation: 'Ар кандай ондук орундагы сандарды кошуу (нөл кошуп теңдөө).',
    num1PaddedStr: '12.45',
    num2PaddedStr: '03.80',
    resultStr: '16.25',
    steps: [
      {
        stepNumber: 1,
        title: 'Ондук орундарды нөл менен теңдөө',
        description: '3.8 санынын аягына нөл жазып, 3.80 кылабыз. Ондук үтүрдү бири-биринин астына коёбуз.'
      },
      {
        stepNumber: 2,
        title: 'Жүздук үлүштөрдү кошуу',
        description: '5 + 0 = 5.'
      },
      {
        stepNumber: 3,
        title: 'Ондук үлүштөрдү кошуу',
        description: '4 + 8 = 12. 2син жазып, 1ин ойдо тутабыз.'
      },
      {
        stepNumber: 4,
        title: 'Бүтүн бөлүктөрдү кошуу',
        description: '12 + 3 = 15, ойдогу 1ди кошсок 16 болот.'
      },
      {
        stepNumber: 5,
        title: 'Жыйынтык',
        description: 'Үтүрдү өз ордуна коебуз: 16.25.'
      }
    ]
  },
  {
    id: 'add-4',
    num1: 7.89,
    num2: 0.154,
    operation: '+',
    result: 8.044,
    difficulty: 'medium',
    category: 'кошуу',
    title: '7.89 + 0.154',
    explanation: 'Миңдик үлүшү бар бөлчөктөрдү кошуу.',
    num1PaddedStr: '7.890',
    num2PaddedStr: '0.154',
    resultStr: '8.044',
    steps: [
      {
        stepNumber: 1,
        title: 'Орундарды теңдөө',
        description: '7.89га оң жагынан нөл кошуп 7.890 жасайбыз.'
      },
      {
        stepNumber: 2,
        title: 'Миңдик үлүштөрдү кошуу',
        description: '0 + 4 = 4.'
      },
      {
        stepNumber: 3,
        title: 'Жүздук үлүштөрдү кошуу',
        description: '9 + 5 = 14. 4тү жазып, 1ин ойдо тутабыз.'
      },
      {
        stepNumber: 4,
        title: 'Ондук үлүштөрдү кошуу',
        description: '8 + 1 = 9, ойдогу 1 менен 10. 0дү жазып, 1ин бүтүн бөлүккө өткөрөбүз.'
      },
      {
        stepNumber: 5,
        title: 'Бүтүн бөлүктү кошуу',
        description: '7 + 0 = 7, ойдогу 1ди кошсок 8 болот. Жообу: 8.044.'
      }
    ]
  },
  {
    id: 'add-5',
    num1: 145.8,
    num2: 23.475,
    operation: '+',
    result: 169.275,
    difficulty: 'hard',
    category: 'кошуу',
    title: '145.8 + 23.475',
    explanation: 'Үч орундуу бүтүн жана 3 ондук орундуу сандарды кошуу.',
    num1PaddedStr: '145.800',
    num2PaddedStr: '023.475',
    resultStr: '169.275',
    steps: [
      {
        stepNumber: 1,
        title: 'Нөлдөрдү кошуу',
        description: '145.8 санына эки нөл кошуп 145.800 кылабыз жана баганда үтүрдү бири-биринин астына жазабыз.'
      },
      {
        stepNumber: 2,
        title: 'Оңдон солго карай кошуу',
        description: '0+5=5; 0+7=7; 8+4=12 (2 жазылып 1 ойдо); 5+3+1=9; 4+2=6; 1+0=1.'
      },
      {
        stepNumber: 3,
        title: 'Үтүрдү коюу',
        description: 'Түз ылдый түшүрүп үтүрдү коебуз: 169.275.'
      }
    ]
  },

  // --- КЕМИТҮҮ МИСАЛДАРЫ (SUBTRACTION EXAMPLES) ---
  {
    id: 'sub-1',
    num1: 5.7,
    num2: 2.3,
    operation: '-',
    result: 3.4,
    difficulty: 'easy',
    category: 'кемитүү',
    title: '5.7 - 2.3',
    explanation: 'Жөнөкөй ондук бөлчөктөрдү кемитүү.',
    num1PaddedStr: '5.7',
    num2PaddedStr: '2.3',
    resultStr: '3.4',
    steps: [
      {
        stepNumber: 1,
        title: 'Үтүрдүн астына үтүрдү коюу',
        description: 'Азаюучуну (5.7) жана кемүүчүнү (2.3) үтүр үтүрдүн астында болгудай жазабыз.'
      },
      {
        stepNumber: 2,
        title: 'Ондук үлүштөрдү кемитүү',
        description: '7 - 3 = 4.'
      },
      {
        stepNumber: 3,
        title: 'Бүтүн бөлүктү кемитүү',
        description: '5 - 2 = 3.'
      },
      {
        stepNumber: 4,
        title: 'Жыйынтык',
        description: 'Үтүрдү ошол боюнча түшүрөбүз. Жообу: 3.4.'
      }
    ]
  },
  {
    id: 'sub-2',
    num1: 9.4,
    num2: 4.8,
    operation: '-',
    result: 4.6,
    difficulty: 'easy',
    category: 'кемитүү',
    title: '9.4 - 4.8',
    explanation: 'Бүтүн бөлүктөн убактылуу карыз (1ди) алуу менен кемитүү.',
    num1PaddedStr: '9.4',
    num2PaddedStr: '4.8',
    resultStr: '4.6',
    steps: [
      {
        stepNumber: 1,
        title: 'Ондук үлүштөрдү кемитүү',
        description: '4төн 8ди кемите албайбыз. Демек, бүтүн 9дан 1ди карызга алабыз. 14 - 8 = 6 болот.'
      },
      {
        stepNumber: 2,
        title: 'Бүтүн бөлүктү кемитүү',
        description: '9дан 1ди алганбыз, 8 калды. 8 - 4 = 4.'
      },
      {
        stepNumber: 3,
        title: 'Жыйынтык',
        description: 'Үтүрдү түшүрөбүз. Жообу: 4.6.'
      }
    ]
  },
  {
    id: 'sub-3',
    num1: 15.6,
    num2: 7.85,
    operation: '-',
    result: 7.75,
    difficulty: 'medium',
    category: 'кемитүү',
    title: '15.6 - 7.85',
    explanation: 'Азаюучуга нөл жазып, разряддарды теңдөө.',
    num1PaddedStr: '15.60',
    num2PaddedStr: '07.85',
    resultStr: '07.75',
    steps: [
      {
        stepNumber: 1,
        title: 'Нөл жазып теңдөө',
        description: '15.6 санынын аягына нөл кошуп 15.60 жасайбыз. 15.60 - 7.85.'
      },
      {
        stepNumber: 2,
        title: 'Жүздук үлүштөн кемитүү',
        description: '0дөн 5 азайбайт. 6дан 1ди алабыз: 10 - 5 = 5.'
      },
      {
        stepNumber: 3,
        title: 'Ондук үлүштөн кемитүү',
        description: '6нын ордунда 5 калган. 5тен 8 азайбайт, 15тен 1ди алабыз: 15 - 8 = 7.'
      },
      {
        stepNumber: 4,
        title: 'Бүтүн бөлүктөн кемитүү',
        description: '15тен 1 алынгандыктан 14 калган: 14 - 7 = 7.'
      },
      {
        stepNumber: 5,
        title: 'Жыйынтык',
        description: 'Үтүрдү өз ордуна коебуз: 7.75.'
      }
    ]
  },
  {
    id: 'sub-4',
    num1: 25,
    num2: 14.82,
    operation: '-',
    result: 10.18,
    difficulty: 'hard',
    category: 'кемитүү',
    title: '25 - 14.82',
    explanation: 'Бүтүн сандан ондук бөлчөктү кемитүү.',
    num1PaddedStr: '25.00',
    num2PaddedStr: '14.82',
    resultStr: '10.18',
    steps: [
      {
        stepNumber: 1,
        title: 'Бүтүн санга үтүр жана нөлдөрдү жазуу',
        description: '25 саны бүтүн сан. Анын аягына үтүр коюп, эки нөл жазабыз: 25.00.'
      },
      {
        stepNumber: 2,
        title: 'Баганда жайгаштыруу',
        description: '25.00 санынын астына 14.82 санын үтүрү үтүрдүн астына тургандай жазабыз.'
      },
      {
        stepNumber: 3,
        title: 'Кемитүү процесси',
        description: '25тен 1ди карызга алып, нөлдөргө таратабыз (9 жана 10). 10 - 2 = 8; 9 - 8 = 1; 24 - 14 = 10.'
      },
      {
        stepNumber: 4,
        title: 'Жыйынтык',
        description: 'Жообу: 10.18.'
      }
    ]
  },
  {
    id: 'sub-5',
    num1: 100,
    num2: 45.678,
    operation: '-',
    result: 54.322,
    difficulty: 'hard',
    category: 'кемитүү',
    title: '100 - 45.678',
    explanation: '100 бүтүн санынан 3 ондук орундуу санды кемитүү.',
    num1PaddedStr: '100.000',
    num2PaddedStr: '045.678',
    resultStr: '054.322',
    steps: [
      {
        stepNumber: 1,
        title: '100дүн аягына 3 нөл кошуу',
        description: '100.000 кылып жазабыз.'
      },
      {
        stepNumber: 2,
        title: 'Карызга алуу',
        description: '100дөн карыз алып: 10 - 8 = 2; 9 - 7 = 2; 9 - 6 = 3; 99 - 45 = 54.'
      },
      {
        stepNumber: 3,
        title: 'Үтүрдү түшүрүү',
        description: 'Жообу: 54.322.'
      }
    ]
  }
];

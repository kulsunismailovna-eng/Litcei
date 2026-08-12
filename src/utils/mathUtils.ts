import { PracticeQuestion, ColumnDigit, DifficultyLevel, OperationType } from '../types';

export function roundDecimal(num: number, precision: number = 4): number {
  const factor = Math.pow(10, precision);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

export function countDecimalPlaces(num: number): number {
  if (Math.floor(num) === num) return 0;
  const str = num.toString();
  if (str.indexOf('.') !== -1) {
    return str.split('.')[1].length;
  }
  return 0;
}

export function padToDecimalPlaces(num: number, targetDecimals: number): string {
  const parts = num.toString().split('.');
  const whole = parts[0];
  let dec = parts[1] || '';
  while (dec.length < targetDecimals) {
    dec += '0';
  }
  return targetDecimals > 0 ? `${whole}.${dec}` : whole;
}

export function buildColumnAlignment(num1: number, num2: number, operation: '+' | '-') {
  const dec1 = countDecimalPlaces(num1);
  const dec2 = countDecimalPlaces(num2);
  const maxDec = Math.max(dec1, dec2, 1);

  const num1Padded = padToDecimalPlaces(num1, maxDec);
  const num2Padded = padToDecimalPlaces(num2, maxDec);

  const [w1, f1] = num1Padded.split('.');
  const [w2, f2] = num2Padded.split('.');

  const maxWholeLen = Math.max(w1.length, w2.length);

  const w1Padded = w1.padStart(maxWholeLen, ' ');
  const w2Padded = w2.padStart(maxWholeLen, ' ');

  const result = operation === '+' ? roundDecimal(num1 + num2, maxDec) : roundDecimal(num1 - num2, maxDec);
  const resPadded = padToDecimalPlaces(result, maxDec);
  const [resW, resF] = resPadded.split('.');
  const resWPadded = resW.padStart(maxWholeLen, ' ');

  const row1Chars: ColumnDigit[] = [];
  const row2Chars: ColumnDigit[] = [];
  const resultChars: ColumnDigit[] = [];

  // Add whole digits
  for (let i = 0; i < maxWholeLen; i++) {
    const c1 = w1Padded[i];
    const c2 = w2Padded[i];
    const cr = resWPadded[i];

    row1Chars.push({ char: c1 === ' ' ? '' : c1 });
    row2Chars.push({ char: c2 === ' ' ? '' : c2 });
    resultChars.push({ char: cr === ' ' ? '' : cr });
  }

  // Decimal Point
  row1Chars.push({ char: '.', isDecimalPoint: true });
  row2Chars.push({ char: '.', isDecimalPoint: true });
  resultChars.push({ char: '.', isDecimalPoint: true });

  // Add fractional digits
  for (let i = 0; i < maxDec; i++) {
    const orig1Dec = num1.toString().split('.')[1] || '';
    const orig2Dec = num2.toString().split('.')[1] || '';

    const isPadded1 = i >= orig1Dec.length;
    const isPadded2 = i >= orig2Dec.length;

    row1Chars.push({ char: f1[i] || '0', isPaddedZero: isPadded1 });
    row2Chars.push({ char: f2[i] || '0', isPaddedZero: isPadded2 });
    resultChars.push({ char: resF[i] || '0' });
  }

  return {
    num1Padded,
    num2Padded,
    result,
    resultStr: resPadded,
    row1Chars,
    row2Chars,
    resultChars,
    maxDec
  };
}

export function generateRandomPracticeQuestion(
  difficulty: DifficultyLevel = 'easy',
  opFilter: OperationType = 'mixed'
): PracticeQuestion {
  let operation: '+' | '-' = '+';
  if (opFilter === 'addition') operation = '+';
  else if (opFilter === 'subtraction') operation = '-';
  else operation = Math.random() > 0.5 ? '+' : '-';

  let num1 = 0;
  let num2 = 0;

  if (difficulty === 'easy') {
    // 1 decimal place, single/double digit whole
    num1 = roundDecimal(Math.floor(Math.random() * 90 + 10) / 10, 1);
    num2 = roundDecimal(Math.floor(Math.random() * 80 + 10) / 10, 1);
  } else if (difficulty === 'medium') {
    // 2 decimal places, mixed places
    const decs1 = Math.random() > 0.5 ? 2 : 1;
    const decs2 = Math.random() > 0.5 ? 2 : 1;
    num1 = roundDecimal(Math.floor(Math.random() * 200 + 10) / Math.pow(10, decs1), decs1);
    num2 = roundDecimal(Math.floor(Math.random() * 150 + 10) / Math.pow(10, decs2), decs2);
  } else {
    // Hard: 2-3 decimal places, larger numbers or integer subtraction like 25 - 14.82
    if (operation === '-' && Math.random() > 0.6) {
      num1 = Math.floor(Math.random() * 80 + 20); // whole number like 50, 100, 25
      num2 = roundDecimal(Math.floor(Math.random() * 300 + 10) / 100, 2);
    } else {
      const decs1 = Math.floor(Math.random() * 2) + 2; // 2 or 3
      const decs2 = Math.floor(Math.random() * 2) + 2;
      num1 = roundDecimal(Math.floor(Math.random() * 500 + 100) / Math.pow(10, decs1), decs1);
      num2 = roundDecimal(Math.floor(Math.random() * 400 + 100) / Math.pow(10, decs2), decs2);
    }
  }

  // Ensure positive result for subtraction
  if (operation === '-' && num1 < num2) {
    const temp = num1;
    num1 = num2;
    num2 = temp;
  }

  const maxDec = Math.max(countDecimalPlaces(num1), countDecimalPlaces(num2), 1);
  const rawAnswer = operation === '+' ? num1 + num2 : num1 - num2;
  const correctAnswer = roundDecimal(rawAnswer, maxDec);

  const num1PaddedStr = padToDecimalPlaces(num1, maxDec);
  const num2PaddedStr = padToDecimalPlaces(num2, maxDec);

  const hint = operation === '+' 
    ? `Үтүрдүн астына үтүрдү коюп, ${num1PaddedStr} менен ${num2PaddedStr} сандарын баганда кош.`
    : `Биринчи ${num1} санын ${num1PaddedStr} кылып жазып, ${num2PaddedStr} санын кемит.`;

  const explanationSteps = [
    `1. Үтүрдүн астына үтүрдү так коёбуз: ${num1PaddedStr} жана ${num2PaddedStr}`,
    `2. Нөл жетишпеген орунга 0 кошуп разрядды теңдейбиз.`,
    `3. Кадимки бүтүн сандардай ${operation === '+' ? 'кошууну' : 'кемитүүнү'} аткарабыз.`,
    `4. Жообу: ${correctAnswer}`
  ];

  return {
    id: 'pq-' + Math.random().toString(36).substring(2, 9),
    num1,
    num2,
    operation,
    correctAnswer,
    difficulty,
    num1PaddedStr,
    num2PaddedStr,
    hint,
    explanationSteps
  };
}

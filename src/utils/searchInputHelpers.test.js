import { applyMask, removeMask, sameDigits, lastSubmitted } from './searchInputHelpers';

test('applyMask should return the passed string formatted', () => {
  const string = '04002010',
        expected = '04002-010',
        result = applyMask(string);

  expect(result).toEqual(expected);
})

test('removeMask should return the passed string digits without any symbols', () => {
  const string = '04002-010',
        expected = '04002010',
        result = removeMask(string);

  expect(result).toEqual(expected);
})

test('sameDigits should return true if passed value has the same digit for every position', () => {
  const value = '00000000',
        expected = true,
        result = sameDigits(value);

  expect(result).toEqual(expected);
})

test('sameDigits should return false if passed value does not have the same digit for every position', () => {
  const value = '04002010',
        expected = false,
        result = sameDigits(value);

  expect(result).toEqual(expected);
})

test('lastSubmitted should return true if both passed values are strictly equal', () => {
  const lastValue = '04002010',
        currentValue = '04002010',
        expected = true,
        result = lastSubmitted(lastValue, currentValue);

  expect(result).toEqual(expected);
})

test('lastSubmitted should return false if both passed values are not strictly equal', () => {
  const lastValue = '01310200',
        currentValue = '01310000',
        expected = false,
        result = lastSubmitted(lastValue, currentValue);

  expect(result).toEqual(expected);
})

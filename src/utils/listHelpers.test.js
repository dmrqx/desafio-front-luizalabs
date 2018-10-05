import { addItem, lastPosition } from './listHelpers';

test('addItem should add the passed item to the list', () => {
  const list = ['01310200', '01310000'],
        item = '04002010',
        expected = ['01310200', '01310000', '04002010'],
        result = addItem(list, item);

  expect(result).toEqual(expected);
})

test('addItem should not mutate the existing list', () => {
  const list = ['01310200', '01310000'],
        item = '04002010',
        expected = ['01310200', '01310000', '04002010'],
        result = addItem(list, item);

  expect(result).not.toBe(expected);
})

test('lastPosition should return last item in the list', () => {
  const list = ['01310200', '01310000', '04002010'],
        expected = '04002010',
        result = lastPosition(list);

  expect(result).toEqual(expected);
})
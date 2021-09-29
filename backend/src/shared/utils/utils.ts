import { Talk } from '@modules/talk/talk.entity';

export function transformTalksToObject(talks: Talk[]) {
  const convertArrayToObject = (array, key) =>
    array.reduce(
      (obj, item) => ({
        ...obj,
        [item[key]]: item,
      }),
      {},
    );
  return convertArrayToObject(talks, 'id');
}

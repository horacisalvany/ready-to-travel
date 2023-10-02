import { agruoupations } from '../agroupation/agroupation.mock';
import { List } from './list';

export const lists: List[] = [
  {
    id: 0,
    title: 'Weekend van trip ',
    agroupations: [],
  },
  {
    id: 1,
    title: 'Long van trip ',
    agroupations: agruoupations,
  },
  {
    id: 2,
    title: 'Llançà',
    agroupations: agruoupations,
  },
  {
    id: 3,
    title: 'Short flight trip',
    agroupations: agruoupations,
  },
];

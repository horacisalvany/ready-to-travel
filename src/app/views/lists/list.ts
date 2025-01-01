import { Agroupation } from '../agroupation/agroupation';

export interface List {
  id: number;
  title: string;
  agroupations: Agroupation[];
}

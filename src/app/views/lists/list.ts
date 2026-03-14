import { Section } from '../list/section';

export interface List {
  id: string;
  title: string;
  sections: Section[];
}

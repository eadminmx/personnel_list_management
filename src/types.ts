export interface Person {
  id: string;
  name: string;
  role: string;
  accessLevel: 'low' | 'medium' | 'high';
  isBanned: boolean;
}
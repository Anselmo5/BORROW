export interface Item {
  id: number;
  name: string;
  category: string;
  description: string | null;
  available: boolean;
  ownerId: number;
  createdAt: string;
  owner?: {
    id: number;
    name: string;
  };
}
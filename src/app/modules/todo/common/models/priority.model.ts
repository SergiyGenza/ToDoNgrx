export type TPriority = 'high' | 'medium' | 'low' | 'none';

export interface Priority {
  color: string;
  priority: TPriority;
}

/**
 * Represents a single portfolio item
 */
export interface IItem {
  _id?: string;
  author: string;
  username: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Used to extend types of components where the history object is used
 */
export interface IHistoryProps {
  push: (url: string) => void;
  listen: any;
}

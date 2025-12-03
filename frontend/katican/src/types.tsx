export interface Book {
  _id: string;
  title: string;
  author: string;
  publisher?: string;
  isbn?: string;
  status: 'available' | 'checked out';
  checkedOutBy?: string | null;
  dueDate?: string | null;
  tags?: string[];
  description?: string;
  content?: string;
}
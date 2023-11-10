import { NoteCategory } from "./NoteCategory";

export interface Nota {
    id: number;
    name: string;
    description: string;
    userId:number;
    isArchived: boolean;
    noteCategory: NoteCategory;
    
  }

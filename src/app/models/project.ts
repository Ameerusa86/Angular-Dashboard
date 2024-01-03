// project.ts
export interface Project {
  title: string;
  link: string;
  category: {
    categoryId: string;
    category: string;
  };
  imageUrl?: string;
  content: string;
  images?: string[]; // Add this property for multiple images
  isFeatured: boolean;
  views: number;
  status: string;
  createdAt: Date;
}

import { ProductSortOrder, ReviewSortOrder } from '@/types/data';
import { create } from 'zustand';

interface ProductSortState {
  sortOrder: ProductSortOrder;
  setSortOrder: (newSortOrder: 'recent' | 'rating' | 'reviewCount') => void;
}

interface ReviewSortState {
  sortOrder: ReviewSortOrder;
  setSortOrder: (newSortOrder: 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount') => void;
}

export const useProductSortStore = create<ProductSortState>((set) => ({
  sortOrder: 'recent',
  setSortOrder: (newSortOrder) => set({ sortOrder: newSortOrder }),
}));

export const useReviewSortStore = create<ReviewSortState>((set) => ({
  sortOrder: 'recent',
  setSortOrder: (newSortOrder) => set({ sortOrder: newSortOrder }),
}));

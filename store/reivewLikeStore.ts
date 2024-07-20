import { create } from 'zustand';

interface LikedState {
  isNowLiked: boolean;
  nowLikedCount: number;
  setIsNowLiked: (isLiked: boolean) => void;
  setNowLikedCount: (prev: number) => void;
}

export const useLikedStore = create<LikedState>((set) => ({
  isNowLiked: false,
  nowLikedCount: 0,
  setIsNowLiked: (isLiked) => set({ isNowLiked: isLiked }),
  setNowLikedCount: (count) => set({ nowLikedCount: count }),
}));

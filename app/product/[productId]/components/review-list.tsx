'use client';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { reviewOrderOptions } from '@/constants/sort-order';
import { useState } from 'react';
import ReviewListContent from './review-list-content';

export default function ReviewList({ productId }: { productId: string }) {
  const [sortOrder, setSortOrder] = useState('최신순');

  return (
    <div className="w-full max-w-[980px] px-5 mx-auto my-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
        <SortSelector sort={sortOrder} setSort={setSortOrder} />
      </div>
      <div className="flex flex-col gap-5 mt-[30px]">
        <ReviewListContent
          productId={productId}
          sortOrder={reviewOrderOptions.find((sort) => sort.label === sortOrder)?.id || 'recent'}
        />
      </div>
    </div>
  );
}

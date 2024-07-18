'use client';
import Review from '@/app/_styled-guide/_components/review';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetMyInfo } from '@/hooks/user';
import { useState } from 'react';

export type ReviewOrder = 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';

export const reviewOrderOptions = [
  { id: 'recent', label: '최신순' },
  { id: 'ratingDesc', label: '별점 높은순' },
  { id: 'ratingAsc', label: '별점 낮은순' },
  { id: 'likeCount', label: '좋아요순' },
];

export default function ReviewList({ productId }: { productId: string }) {
  const [order, setOrder] = useState<string>('최신순');

  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
  } = useInfinityScroll({
    productId: productId,
    fetchingType: 'review',
    sortOrder: order,
    threshold: 0.5,
  });
  const { data: currentUserId } = useGetMyInfo();

  if (isPending) return <div>Loading</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="w-full max-w-[980px] px-5 mx-auto my-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
        <SortSelector order={order} setOrder={setOrder} />
      </div>
      <div className="flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.pages.flatMap((page) =>
            page?.list?.map((review) => (
              <Review
                key={review.id}
                {...review}
                currentUserId={currentUserId?.id}
                isSponsored={true}
                reviewRef={ref}
              />
            )),
          )}
      </div>
    </div>
  );
}

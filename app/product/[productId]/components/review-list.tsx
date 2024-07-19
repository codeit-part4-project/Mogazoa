'use client';
import Review from '@/app/_styled-guide/_components/review';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetMyInfo } from '@/hooks/user';
import { useReviewSortStore } from '@/store/sortOrderStore';
import { ReviewResponse } from '@/types/data';
import { useEffect, useState } from 'react';

export default function ReviewList({ productId }: { productId: string | string[] }) {
  const { sortOrder, setSortOrder } = useReviewSortStore();
  return (
    <div className="w-full max-w-[980px] px-5 mx-auto mb-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
        <SortSelector sort={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <ReviewListContent productId={productId} />
    </div>
  );
}

export function ReviewListContent({ productId }: { productId: string | string[] }) {
  const { sortOrder } = useReviewSortStore();
  const [displayReviews, setDisplayReviews] = useState<ReviewResponse[]>();
  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfinityScroll({
    productId: productId,
    queryKey: 'review',
    queryFnUrl: `/products/${productId}/reviews`,
    sortOrder: sortOrder,
  });

  const { data: currentUserId } = useGetMyInfo();

  // isPending 값 및 정렬 변경 감지
  useEffect(() => {
    if (!isPending || hasNextPage) {
      const result = getReviewList as ReviewResponse[];
      setDisplayReviews(result);
    }
  }, [isPending, fetchNextPage, hasNextPage, sortOrder]);

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <div
        className="flex flex-col gap-5 mt-[30px]"
        style={{
          opacity: isPending ? 0.5 : 1,
        }}
      >
        {displayReviews &&
          displayReviews.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          ))}
      </div>
    </>
  );
}

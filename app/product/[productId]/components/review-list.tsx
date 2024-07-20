'use client';
import Review from '@/app/_styled-guide/_components/review';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetMyInfo } from '@/hooks/user';
import { useLikedStore } from '@/store/reivewLikeStore';
import { useReviewSortStore } from '@/store/sortOrderStore';
import { ReviewResponse } from '@/types/data';
import { useDeferredValue, useEffect, useState } from 'react';

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
  const { isNowLiked, nowLikedCount } = useLikedStore();
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

  const deferredValue = useDeferredValue(displayReviews);
  // isPending 값 및 정렬 변경 감지
  useEffect(() => {
    if (!isPending || hasNextPage) {
      const result = getReviewList as ReviewResponse[];
      setDisplayReviews(result);
    }
  }, [isPending, fetchNextPage, hasNextPage, sortOrder, isNowLiked, nowLikedCount]);

  if (isPending)
    return (
      <div className="relative flex flex-col gap-5 mt-[30px]">
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-black-700 opacity-50 z-[1]"></div>
        {deferredValue &&
          deferredValue.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          ))}
      </div>
    );
  if (isError) return <div>ERROR</div>;

  return (
    <>
      <div className="flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          ))}
      </div>
    </>
  );
}

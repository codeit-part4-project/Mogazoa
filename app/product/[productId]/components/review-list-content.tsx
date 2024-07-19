'use client';
import Review from '@/app/_styled-guide/_components/review';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetMyInfo } from '@/hooks/user';

interface ReivewListProps {
  productId: string;
  sortOrder: string;
}

export default function ReviewListContent({ productId, sortOrder }: ReivewListProps) {
  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
  } = useInfinityScroll({
    productId: productId,
    fetchingType: 'review',
    sortOrder: sortOrder ? sortOrder : 'recent',
    threshold: 0.5,
  });

  const { data: currentUserId } = useGetMyInfo();

  if (isPending) return <div>Loading</div>;

  if (isError) return <div>Error</div>;

  return (
    <>
      {getReviewList &&
        getReviewList.pages.flatMap((page) =>
          page?.list?.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          )),
        )}
    </>
  );
}

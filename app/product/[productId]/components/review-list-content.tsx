'use client';
import Review from '@/app/_styled-guide/_components/review';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetMyInfo } from '@/hooks/user';
import { useReviewSortStore } from '@/store/sortOrderStore';

export default function ReviewListContent({ productId }: { productId: string | string[] }) {
  const { sortOrder } = useReviewSortStore();
  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
  } = useInfinityScroll({
    productId: productId,
    queryKey: 'review',
    queryFnUrl: `/products/${productId}/reviews`,
    sortOrder: sortOrder,
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

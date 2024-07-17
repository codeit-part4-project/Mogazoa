'use client';
import Review from '@/app/_styled-guide/_components/review';
import { useGetProductReviews } from '@/hooks/product';
import { useGetMyInfo } from '@/hooks/user';

export type orderType = 'recent' | 'ratingDesc' | 'ratingAsc' | 'likeCount';

interface ProductReviewResponse {
  productId: string | string[];
}

export default function ReviewList({ productId }: ProductReviewResponse) {
  const { data: getReviewList } = useGetProductReviews(Number(productId));
  const { data: currentUserId } = useGetMyInfo();
  console.log('currentUserId');
  return (
    <div className="w-full max-w-[980px] px-5 mx-auto my-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
        {/* <SortSelector /> */}
      </div>
      <div className="flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.list.map((review) => (
            <Review
              key={review.id}
              {...review}
              currentUserId={currentUserId?.id}
              isSponsored={true}
            />
          ))}
      </div>
    </div>
  );
}

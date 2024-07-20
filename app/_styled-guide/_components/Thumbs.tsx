'use client';
import { Button } from '@/components/ui/button';
import { useLikeReview, useUnlikeReview } from '@/hooks/review';
import { cn } from '@/lib/utils';
import { useLikedStore } from '@/store/reivewLikeStore';
import { useQueryClient } from '@tanstack/react-query';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';

interface ThumbsProps {
  reviewId: number;
  isLiked: boolean;
  likeCount: number;
}

const Thumbs = ({ reviewId, isLiked, likeCount }: ThumbsProps) => {
  const queryClient = useQueryClient();
  const { setIsNowLiked, setNowLikedCount } = useLikedStore();

  const invalidateReviewQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['review'] });
  };

  const likeReview = useLikeReview(reviewId, {
    onSuccess: () => {
      const result = Number(likeCount) + 1;
      setIsNowLiked(true);
      setNowLikedCount(result);
      invalidateReviewQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const unlikeReview = useUnlikeReview(reviewId, {
    onSuccess: () => {
      const result = Number(likeCount) + 1;
      setIsNowLiked(true);
      setNowLikedCount(result);
      invalidateReviewQueries();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    if (isLiked) {
      unlikeReview.mutate();
    } else {
      likeReview.mutate();
    }
  };

  return (
    <Button
      variant="outline"
      size="auto"
      onClick={handleClick}
      className="flex items-center px-[10px] rounded-full gap-[2px] py-[2px] lg:py-0"
    >
      {isLiked ? (
        <RiThumbUpFill className="text-blue mr-[5px] text-[13px] md:text-[15px]" />
      ) : (
        <RiThumbUpLine className="text-gray-500 mr-[5px] text-sm md:text-base" />
      )}
      <span
        className={cn(isLiked ? 'text-indigo' : 'text-gray-500', 'text-sm lg:text-lg font-mono')}
      >
        {likeCount}
      </span>
    </Button>
  );
};

export default Thumbs;

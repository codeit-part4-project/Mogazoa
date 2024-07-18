'use client';
import { Button } from '@/components/ui/button';
import { useLikeReview, useUnlikeReview } from '@/hooks/review';
import { useState } from 'react';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';

interface ThumbsProps {
  reviewId: number;
  isLiked: boolean;
  likeCount: number;
}

const Thumbs = ({ reviewId, isLiked, likeCount }: ThumbsProps) => {
  const [isNowLiked, setNowIsLiked] = useState<boolean>(isLiked);
  const [nowLikedCount, setNowLikedCount] = useState<number>(likeCount);

  const likeReview = useLikeReview(reviewId, {
    onSuccess: () => {
      setNowIsLiked(true);
      setNowLikedCount((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const unlikeReview = useUnlikeReview(reviewId, {
    onSuccess: () => {
      setNowIsLiked(false);
      setNowLikedCount((prev) => prev - 1);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    if (isNowLiked) {
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
      {isNowLiked ? (
        <RiThumbUpFill className="text-blue mr-[5px] text-[13px] md:text-[15px]" />
      ) : (
        <RiThumbUpLine className="text-gray-500 mr-[5px] text-sm md:text-base" />
      )}
      {isNowLiked ? (
        <span className="text-indigo text-sm lg:text-lg font-mono">{nowLikedCount}</span>
      ) : (
        <span className="text-gray-500 text-sm lg:text-lg font-mono">{nowLikedCount}</span>
      )}
    </Button>
  );
};

export default Thumbs;

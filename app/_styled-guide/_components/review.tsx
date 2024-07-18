import { Button } from '@/components/ui/button';
import { ReviewResponse } from '@/types/data';
import Image from 'next/image';
import { ReviewProfile } from './review-profile';
import Thumbs from './Thumbs';
import React, { LegacyRef } from 'react';

interface ReviewProps extends ReviewResponse {
  currentUserId: number | undefined;
  isSponsored: boolean;
  reviewRef: LegacyRef<HTMLDivElement> | undefined;
}

export default function Review({
  id,
  reviewImages,
  createdAt,
  content,
  rating,
  userId,
  user,
  isLiked,
  likeCount,
  currentUserId,
  isSponsored,
  reviewRef,
}: ReviewProps) {
  const isMyReview = userId === currentUserId;
  const date = new Date(createdAt);
  const formattedDate = date.toISOString().slice(0, 10);

  return (
    <div
      ref={reviewRef}
      className="flex flex-col md:flex-row lg:flex-row gap-[30px] lg:gap-[80px] p-5 md:p-[30px] bg-[#252530] border border-[#353542] rounded-xl"
    >
      <div className="w-full md:w-[160px]">
        <ReviewProfile user={user} rating={rating} />
      </div>
      <div className="flex-1">
        {isSponsored && (
          <p className="flex text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5097FA] to-[#5363FF]">
            지원받고 남기는 리뷰입니다.
          </p>
        )}
        <p
          className="text-[#F1F1F5] text-sm md:text-base font-normal whitespace-pre mt-[10px]"
          style={{ wordBreak: 'keep-all' }}
        >
          {content}
        </p>
        {reviewImages.length ? (
          <div className="flex gap-[10px] lg:gap-5 w-auto h-auto md:h-[80px] lg:h-[100px] mt-5">
            {reviewImages.map((image) => (
              <div
                key={image.id}
                className="relative w-[60px] md:w-[80px] lg:w-[110px] h-[60px] md:h-[80px] lg:h-[100px] border rounded-lg border-none"
              >
                <Image
                  fill
                  src={image.source}
                  alt={`Review Image ${image.id}`}
                  style={{ objectFit: 'cover' }}
                  sizes="200px auto"
                  priority
                />
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-between mt-[20px]">
          <div className="flex gap-[15px] md:gap-5 lg:gap-5">
            <p className="text-gray-600 text-xs lg:text-sm font-normal">{formattedDate}</p>
            {isMyReview && (
              <div className="flex gap-[10px]">
                <Button
                  variant="text"
                  size="auto"
                  className="text-gray-600 text-xs lg:text-sm font-light underline decoration-gray-600"
                >
                  수정
                </Button>
                <Button
                  variant="text"
                  size="auto"
                  className="text-gray-600 text-xs lg:text-sm font-light underline decoration-gray-600"
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
          <Thumbs reviewId={id} isLiked={isLiked} likeCount={likeCount} />
        </div>
      </div>
    </div>
  );
}

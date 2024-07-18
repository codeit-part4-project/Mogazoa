import { ReviewResponse } from '@/types/data';
import instance from '@/utils/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'sonner';

type ZeroToOne = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

interface useInfinityScrollProps {
  productId: string;
  fetchingType: string;
  sortOrder: string;
  threshold?: ZeroToOne;
}

export const getFetchingUrl = (fetchingType: string, productId: string, sortOrder: string) => {
  if (fetchingType === 'review') {
    return `/products/${productId}/reviews?order=${sortOrder}`;
  }
  return null;
};

export const useInfinityScroll = ({
  productId,
  fetchingType,
  sortOrder,
  threshold = 0.5,
}: useInfinityScrollProps) => {
  const { ref, inView } = useInView({
    threshold: threshold,
  });

  const { data, isPending, isError, fetchNextPage } = useInfiniteQuery<{
    list: ReviewResponse[];
    nextCursor: number;
  }>({
    queryKey: [fetchingType, productId, sortOrder],
    queryFn: async ({ pageParam = null }) => {
      try {
        const url = getFetchingUrl(fetchingType, productId, sortOrder);
        if (!url) return;
        const result = pageParam !== null ? `${url}&cursor=${pageParam}` : url;
        const res = await instance.get(result);
        if (!res) return;
        return res.data;
      } catch (err: any) {
        let errorMessage = '데이터를 불러 오는데 실패 했습니다.';
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
        toast.error(errorMessage);
        throw err;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return {
    ref,
    data,
    isError,
    isPending,
  };
};

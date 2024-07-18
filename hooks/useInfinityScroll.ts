import { reviewOrderOptions } from '@/constants/sort-order';
import { ReviewResponse } from '@/types/data';
import instance from '@/utils/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type ZeroToOne = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

interface useInfinityScrollProps {
  productId: string;
  fetchingType: string;
  sortOrder: string;
  threshold: ZeroToOne;
}

export const getFetchingUrl = (fetchingType: string, productId: string, sort: string) => {
  if (fetchingType === 'review') {
    return `/products/${productId}/reviews?order=${reviewOrderOptions.find((value) => value.label === sort)?.id}`;
  }
  return null;
};

export const useInfinityScroll = ({
  productId,
  fetchingType = 'review',
  sortOrder = '최신순',
  threshold = 0.5,
}: useInfinityScrollProps) => {
  const [sort, setSort] = useState<string>(sortOrder);
  const { ref, inView } = useInView({
    threshold: threshold,
  });

  const { data, isPending, isError, fetchNextPage } = useInfiniteQuery<{
    list: ReviewResponse[];
    nextCursor: number;
  }>({
    queryKey: ['review', productId, sort],
    queryFn: async ({ pageParam = null }) => {
      try {
        const url = getFetchingUrl(fetchingType, productId, sort);
        if (!url) return;
        const result = pageParam !== null ? `${url}&cursor=${pageParam}` : url;
        const res = await instance.get(result);
        if (!res) return;
        console.log(res);
        return res.data;
      } catch (e) {
        console.log(e);
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
    sort,
    setSort,
  };
};

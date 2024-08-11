'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RootState } from '../store';
import { setSearchTerm } from '../store/searchSlice';
import { useAppDispatch, useAppSelector } from '.';

const useSearchQuery = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(
    (state: RootState) => state.search.searchTerm
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      dispatch(setSearchTerm(search as string));
    } else if (searchTerm && searchTerm.trim() !== '') {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm !== ' ') {
        params.set('search', searchTerm);
        router.push(`${window.location.pathname}?${params.toString()}`);
      } else {
        params.delete('search');
        router.push(`${window.location.pathname}?${params.toString()}`);
      }
    }
  }, [searchParams]);

  const setSearchTermWithUrlUpdate = (newSearchTerm: string) => {
    dispatch(setSearchTerm(newSearchTerm));
    const params = new URLSearchParams(location.search);
    if (newSearchTerm !== '') {
      params.set('search', newSearchTerm);
      router.push(`${window.location.pathname}?${params.toString()}`);
    } else {
      params.delete('search');
      router.push(`${window.location.pathname}?${params.toString()}`);
    }
  };

  return [searchTerm, setSearchTermWithUrlUpdate] as const;
};

export default useSearchQuery;

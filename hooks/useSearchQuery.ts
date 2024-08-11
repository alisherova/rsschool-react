import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import { setSearchTerm } from '../store/searchSlice';
import { useAppDispatch, useAppSelector } from '.';

const useSearchQuery = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(
    (state: RootState) => state.search.searchTerm
  );
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const { search } = router.query;
    if (search) {
      dispatch(setSearchTerm(search as string));
    } else if (searchTerm && searchTerm.trim() !== '') {
      const params = new URLSearchParams(router.query as any);
      if (searchTerm !== ' ') {
        params.set('search', searchTerm);
        router.push({ query: params.toString() });
      } else {
        const updatedQuery = { ...query };
        delete updatedQuery.search;
      }
    }
  }, [router.query]);

  const setSearchTermWithUrlUpdate = (newSearchTerm: string) => {
    dispatch(setSearchTerm(newSearchTerm));
    const params = new URLSearchParams(location.search);
    if (newSearchTerm !== '') {
      params.set('search', newSearchTerm);
      router.push({ query: params.toString() });
    } else {
      const updatedQuery = { ...query };
      delete updatedQuery.search;
      router.push(
        {
          pathname: router.pathname,
          query: updatedQuery,
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return [searchTerm, setSearchTermWithUrlUpdate] as const;
};

export default useSearchQuery;

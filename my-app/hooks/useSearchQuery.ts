import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSearchTerm } from '../store/searchSlice';

const useSearchQuery = (initialValue: string) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      dispatch(setSearchTerm(query));
    } else if (searchTerm && searchTerm !== ' ') {
      params.set('search', searchTerm);
      navigate({ search: params.toString() });
    }
  }, [location.search]);

  const setSearchTermWithUrlUpdate = (newSearchTerm: string) => {
    dispatch(setSearchTerm(newSearchTerm));
    const params = new URLSearchParams(location.search);
    params.set('search', newSearchTerm);
    navigate({ search: params.toString() });
  };

  return [searchTerm, setSearchTermWithUrlUpdate] as const;
};

export default useSearchQuery;

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useSearchQuery = (initialValue: string) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchTerm(query);
    } else if (searchTerm && searchTerm !== ' ') {
      params.set('search', searchTerm);
      navigate({ search: params.toString() });
    }
  }, [location.search]);

  const setSearchTermWithUrlUpdate = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    localStorage.setItem('searchTerm', newSearchTerm);
    const params = new URLSearchParams(location.search);
    params.set('search', newSearchTerm);
    navigate({ search: params.toString() });
  };

  return [searchTerm, setSearchTerm, setSearchTermWithUrlUpdate] as const;
};

export default useSearchQuery;

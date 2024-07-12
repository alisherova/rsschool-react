import { useState, useEffect } from 'react';

function useSearchQuery(initialValue: string) {
    const [searchTerm, setSearchTerm] = useState<string>(() => {
        return localStorage.getItem('searchTerm') || initialValue;
    });

    useEffect(() => {
        return () => {
            localStorage.setItem('searchTerm', searchTerm);
        };
    }, [searchTerm]);

    return [searchTerm, setSearchTerm] as const;
}

export default useSearchQuery
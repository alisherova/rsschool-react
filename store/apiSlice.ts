import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Character {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    searchCharacters: builder.query<
      ApiResponse,
      { name: string; page: number }
    >({
      query: ({ name, page }) =>
        `people/?search=${encodeURIComponent(name)}&page=${page}`,
    }),
    getCharacterDetail: builder.query<Character, string>({
      query: (name) => `people/?search=${encodeURIComponent(name)}`,
      transformResponse: (response: ApiResponse) => {
        if (!response.results || response.results.length === 0) {
          throw new Error('Character not found');
        }
        return response.results[0];
      },
    }),
  }),
});

export const { useSearchCharactersQuery, useGetCharacterDetailQuery } =
  apiSlice;

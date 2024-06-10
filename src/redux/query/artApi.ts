import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Art, ArtAuthors, ArtLocation, ArtTotalProps } from '../../types/arts';

export const artApi = createApi({
  reducerPath: 'ArtApi',
  tagTypes: ['Arts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test-front.framework.team/' }),
  endpoints: (build) => ({
    getArtByParams: build.query<Art[], ArtTotalProps>({
      query: ({
        searchValue,
        currentPage,
        valueAuthor,
        valueLocation,
        valueAgeFrom,
        valueAgeTo,
      }) =>
        `paintings?${!valueAuthor && !valueLocation && !searchValue && !valueAgeFrom && !valueAgeTo ? `_limit=6&_page=${currentPage}` : `${`q=${searchValue}`}${valueAuthor && `&authorId=${valueAuthor}`}${valueLocation && `&locationId=${valueLocation}`}${valueAgeFrom && `&created_gte=${valueAgeFrom}`}${valueAgeTo && `&created_lte=${valueAgeTo}`}`}`,
      providesTags: ['Arts'],
    }),

    getTotalArt: build.query<Art[], void>({
      query: () => `paintings`,
    }),

    getTotalAuthors: build.query<ArtAuthors[], void>({
      query: () => `authors`,
    }),

    getTotalLocations: build.query<ArtLocation[], void>({
      query: () => `locations`,
    }),
  }),
});

export const {
  useGetArtByParamsQuery,
  useGetTotalArtQuery,
  useGetTotalAuthorsQuery,
  useGetTotalLocationsQuery,
} = artApi;

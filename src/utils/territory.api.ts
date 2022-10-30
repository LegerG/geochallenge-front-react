// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Territory, TerritoryName } from "../models/country";
import { shuffleArray } from "./arrayTools";

interface TerritoryNamesParams {
  lang: string;
  group?: string;
}

interface CountryParams {
  group?: string;
  size?: number;
}

export const territoryApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getTerritoryNames: builder.query<TerritoryName[], TerritoryNamesParams>({
      query: ({ lang, group }) => ({
        method: "GET",
        url: `/api/territory/name`,
        params: { lang, group },
      }),
    }),
    getNewGame: builder.query<Territory[], void>({
      query: () => ({
        method: "GET",
        url: `/api/territory`,
        params: { size: 50, group: "un" },
      }),
      transformResponse: (response: Territory[]) => shuffleArray(response),
    }),
    getTrainingGame: builder.query<Territory[], CountryParams>({
      query: ({ group, size }) => ({
        method: "GET",
        url: `/api/territory`,
        params: { group, size },
      }),
      transformResponse: (response: Territory[]) => shuffleArray(response),
    }),
  }),
});

export const {
  useGetTerritoryNamesQuery,
  useLazyGetNewGameQuery,
  useGetTrainingGameQuery,
} = territoryApi;

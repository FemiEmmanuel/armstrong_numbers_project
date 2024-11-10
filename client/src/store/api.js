import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./slices/authSlice";
import { setUser, setError as setUserError } from "./slices/userSlice";
import {
  setContactInfo,
  setError as setContactError,
} from "./slices/contactInfoSlice";

const API_URL = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401 && args.url !== "token/refresh/") {
    const refreshResult = await baseQuery(
      {
        url: "token/refresh/",
        method: "POST",
        body: { refresh: api.getState().auth.refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(
        setCredentials({
          ...refreshResult.data,
          user: api.getState().auth.user,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Attempts", "Feedback", "ContactInfo"],
  endpoints: (builder) => ({

    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.access,
              refreshToken: data.refresh,
            })
          );
          dispatch(setUser(data.user));
        } catch (error) {}
      },
      invalidatesTags: ["User", "Attempts", "Feedback"],
    }),

    logout: builder.mutation({
      query: (refresh_token) => ({
        url: "logout/",
        method: "POST",
        body: { refresh_token },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setCredentials({ accessToken: null, refreshToken: null }));
          dispatch(setUser(null));
          dispatch(api.util.resetApiState());
        } catch (error) {}
      },
      invalidatesTags: ["User", "Attempts", "Feedback"],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "token/refresh/",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.access,
            })
          );
        } catch (error) {
          dispatch(logout());
          dispatch(api.util.resetApiState());
        }
      },
    }),

    // User endpoints
    register: builder.mutation({
      query: (userData) => ({
        url: "register/",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: () => "users/me/",
      providesTags: ["User"],
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          const { data } = await cacheDataLoaded;
          dispatch(setUser(data));
        } catch (error) {
          dispatch(setUserError(error));
        }
        await cacheEntryRemoved;
      },
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: "users/me/",
        method: "PUT",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      invalidatesTags: ["User"],
    }),


    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}/soft_delete/`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
          dispatch(setCredentials({ accessToken: null, refreshToken: null }));
          dispatch(api.util.resetApiState());
        } catch (error) {}
      },
      invalidatesTags: ["User", "Attempts", "Feedback"],
    }),

    // Attempts endpoints
    checkArmstrong: builder.mutation({
      query: (attempted_number) => ({
        url: "attempts/",
        method: "POST",
        body: { attempted_number },
      }),
      invalidatesTags: ["Attempts"],
    }),

    getAttempts: builder.query({
      query: (page = 1) => `attempts/?page=${page}`,
      providesTags: ["Attempts"],
      transformResponse: (response) => ({
        attempts: response.results,
        pagination: {
          totalPages: Math.ceil(response.count / 10),
          nextPage: response.next,
          previousPage: response.previous,
          totalCount: response.count,
        },
      }),
    }),

    checkRange: builder.mutation({
      query: (range) => ({
        url: "attempts/check_range/",
        method: "POST",
        body: range,
      }),
      invalidatesTags: ["Attempts"],
    }),

    // Feedback endpoint
    submitFeedback: builder.mutation({
      query: (feedback) => ({
        url: "feedback/",
        method: "POST",
        body: feedback,
      }),
      invalidatesTags: ["Feedback"],
    }),

    // Contact Info endpoint
    getContactInfo: builder.query({
      query: () => "contact/",
      providesTags: ["ContactInfo"],
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          const { data } = await cacheDataLoaded;
          dispatch(setContactInfo(data));
        } catch (error) {
          dispatch(setContactError(error));
        }
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCheckArmstrongMutation,
  useGetAttemptsQuery,
  useCheckRangeMutation,
  useSubmitFeedbackMutation,
  useGetContactInfoQuery,
} = api;

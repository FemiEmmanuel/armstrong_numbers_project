import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./slices/authSlice";
import { setUser } from "./slices/userSlice";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Token ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.token }));
          dispatch(setUser(data.user));
        } catch (error) {

        }
      },
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: "register/",
        method: "POST",
        body: userData,
      }),
    }),
    getUser: builder.query({
      query: () => "users/me/",
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "users/me/",
        method: "PUT",
        body: userData,
      }),
    }),
    checkArmstrong: builder.mutation({
      query: (number) => ({
        url: "attempts/",
        method: "POST",
        body: { number },
      }),
    }),
    getAttempts: builder.query({
      query: () => "attempts/",
    }),
    checkRange: builder.mutation({
      query: (range) => ({
        url: "attempts/check_range/",
        method: "POST",
        body: range,
      }),
    }),
    submitFeedback: builder.mutation({
      query: (feedback) => ({
        url: "feedback/",
        method: "POST",
        body: feedback,
      }),
    }),
    getContactInfo: builder.query({
      query: () => "contact/",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useCheckArmstrongMutation,
  useGetAttemptsQuery,
  useCheckRangeMutation,
  useSubmitFeedbackMutation,
  useGetContactInfoQuery,
} = api;

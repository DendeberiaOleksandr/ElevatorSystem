import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/elevatorSystem'
    }),
    tagTypes: ['Elevator'],
    endpoints: (build) => ({
        getElevators: build.query({
            query: () => ({
                url: '/status',
                method: 'GET'
            }),
            providesTags: ['Elevator']
        }),
        step: build.mutation({
            query: () => ({
                url: '/step',
                method: 'POST'
            }),
            invalidatesTags: ['Elevator']
        }),
        update: build.mutation({
            query: ({id, currentFloor, targetFloor}) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: {
                    currentFloor,
                    targetFloor
                }
            }),
            invalidatesTags: ['Elevator']
        }),
        pickup: build.mutation({
            query: ({id, targetFloor}) => ({
                url: `/pickup/${id}`,
                method: 'POST',
                body: {
                    targetFloor
                }
            }),
            invalidatesTags: ['Elevator']
        })
    })
})

export const {
    useGetElevatorsQuery,
    useStepMutation,
    useUpdateMutation,
    usePickupMutation
} = api

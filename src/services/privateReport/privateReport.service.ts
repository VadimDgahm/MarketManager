import {baseApi} from "@/services/base-api";

const privateReportService = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            checkPrivatePass: builder.mutation<any, any>({
                invalidatesTags: ["Catalog"],
                query: (password) => {
                    return {
                        body: {password},
                        method: "POST",
                        url: `private-report/check-pass`,
                    };
                },
            }),
            downloadPrivateReport: builder.query<Blob, void>({
                query: (idBriefcase) => ({
                    url: `private-report/report/${idBriefcase}`,
                    method: "GET",
                    responseHandler: (response) => response.blob(),
                }),
            }),
        };
    },
});

export const {
    useCheckPrivatePassMutation,
    useLazyDownloadPrivateReportQuery,
} = privateReportService;

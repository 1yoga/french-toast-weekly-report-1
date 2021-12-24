import { api } from "../api/api.service";



export const getWeeklyReportHistoryToUser = (companyId, teamMemberId, dateFrom, dateTo) => {
    return api.get(`companies/${companyId}/team-members/reports/immediate?dateFrom=${dateFrom}&dateTo=${dateTo}&to=${teamMemberId}`)
        .then((response) => response.data);
};

export default getWeeklyReportHistoryToUser;
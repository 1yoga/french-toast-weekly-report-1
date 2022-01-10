import { api } from "../api/api.service";

export const getUserBySub = (sub) => {
    return api.get(`team-members/${sub}`)
        .then((response) => response.data);
};

export const getUser = async (sub) => {
    let teamMember = await api.get(`team-members/${sub}`)
    let company = await api.get(`companies/${teamMember.data.companyId}`)
    return { ...teamMember.data, ...company.data }
};




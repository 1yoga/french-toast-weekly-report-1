import { api } from "../api/api.service";

export const changeNameCompany = async (companyId, name, joinDate) => {
    await api.put(`companies/`, {
        "companyId": companyId,
        "companyName": name,
        "joinDate": joinDate
    })
};

export const addNewCompanyAndTeamMember = async (values, user) => {
    const today = new Date()
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    const bodyCompany = {
        CompanyName: values.companyName,
        JoinDate: date
    }
    const responseCompany = await api.post(`companies`, bodyCompany)
    const bodyTeamMember = {
        FirstName: values.firstName,
        LastName: values.lastName,
        Title: "",
        Mail: user.email,
        Subject: user.sub,
        CompanyId: responseCompany.data.companyId
    }
    await api.post(`companies/${responseCompany.data.companyId}/team-members`, bodyTeamMember)
}

import moment from "moment";
export const getCurrentAndPreviousDate = () => {
    const firstday = moment().startOf("isoWeek");
    const lastday = moment().endOf("isoWeek");
    const firstdayPrev = moment().subtract(1, "week").startOf("isoWeek");
    const lastdayPrev = moment().subtract(1, "week").endOf("isoWeek");
    return [firstday, lastday, firstdayPrev, lastdayPrev];
}
export const DateToString = (date) => {
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}
export const getCurrentPeriod = () => {
    const startDate = moment().startOf("isoWeek");
    const endDate = moment().endOf("isoWeek");
    return `${startDate.month() + 1}/${startDate.date()} - ${endDate.month() + 1}/${endDate.date()}`;
}

export const getPreviousPeriod = () => {
    const startDate = moment().subtract(1, "week").startOf("isoWeek");
    const endDate = moment().subtract(1, "week").endOf("isoWeek");
    return `${startDate.month() + 1}/${startDate.date()} - ${endDate.month() + 1}/${endDate.date()}`;
}
export interface ScheduleItem {
    coachingScheduleId: number;
    coachingBatch: string;
    coachingDays: string;
    startTime: string;
    endTime: string;
    locationId: number;
    location: { 
        name: string;
    };
}

export interface FilterLocation {
    locationId: number;
    name: string;
}


export function convertDays(coachingDays: string): string {
    const days: { [key: string]: string } = {
        "1": "Monday",
        "2": "Tuesday",
        "3": "Wednesday",
        "4": "Thursday",
        "5": "Friday",
        "6": "Saturday",
        "7": "Sunday"
    };
    const convertedDayNames: string[] = [];

   for (let i = 0; i < coachingDays.length; i++) {
    const digit = coachingDays[i];
    if (days[digit]) {
        convertedDayNames.push(days[digit]);
    }
}
    return convertedDayNames.join(", ");
};
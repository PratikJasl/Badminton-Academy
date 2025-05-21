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

export interface AttendanceItem {
    attendanceDate: string;
    isStatus: boolean;
    user: {
        fullName: string;
        userId: number;
    }
}

export interface FilterLocation {
    locationId: number;
    name: string;
}

//@dev: Function to convert days to number string.
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

//@dev: Function to Formate Date Time to Date.
export const formatDateToYYYYMMDD = (date: Date | string | null | undefined): string | undefined => {
    if (!date) return undefined;
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return undefined;
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        const day = ('0' + d.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    } catch (e) {
        console.error("Failed to format date:", date, e);
        return undefined;
    }
};


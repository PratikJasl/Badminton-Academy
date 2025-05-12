import { getCoachingPlanById } from "../repository/coachingPlanRepo";

//@dev: Function to determine a user is kid or adult.
export function checkAge(dob: Date): boolean {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const adultAge = 18;
    return age < adultAge;
}

//@dev: Function to calculate Plan End Date.
export async function calculateEndDate(planStartDate: Date, coachingPlanId: number): Promise<Date | null> {
    try {
        //@dev: Fetch the coaching plan details
        let coachingPlan = await getCoachingPlanById(coachingPlanId);
        if (!coachingPlan) {
            console.error(`Coaching plan with ID ${coachingPlanId} not found.`);
            return null;
        }

        //@dev: Find the plan duration.
        let duration = coachingPlan.planDuration;
        let durationParts = duration.split(' ');
        if (durationParts.length !== 2) {
            console.error(`Invalid plan duration format: ${duration}`);
            return null;
        }

        //@dev: Parse the duration value and unit.
        const value = parseInt(durationParts[0], 10);
        const unit = durationParts[1].toLowerCase();
        if (isNaN(value) || (unit !== 'month' && unit !== 'months' && unit !== 'year' && unit !== 'years')) {
             console.error(`Invalid plan duration value or unit: ${duration}`);
             return null
        }

        //@dev: Calculate End Date.
        const endDate = new Date(planStartDate);
        if (unit.startsWith('month')) {
            endDate.setMonth(endDate.getMonth() + value);
        } else if (unit.startsWith('year')) {
            endDate.setFullYear(endDate.getFullYear() + value);
        } else {
             console.error(`Unsupported plan duration unit: ${unit}`);
             return null;
        }
        return endDate;
        
    } catch (error) {
        console.error("An error occurred while calculating the end date:", error);
        return null
    }
}

//@raj: date-formate=YYYY-MM-DD 00:00:00
export function getTodaysDate(): string {
    const today = new Date();
    const istOffset = 5.5 * 60 * 60000; // IST is UTC+5:30
    const istTime = new Date(today.getTime() + istOffset);
    const istDateString = istTime.toISOString().split('T')[0];// Get YYYY-MM-DD
    const isoDate=new Date(istDateString).toISOString();
    return isoDate;
  }
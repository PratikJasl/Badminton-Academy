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

//@raj: date-formate=YYYY-MM-DD 00:00:00
export function getTodaysDate(): string {
    const today = new Date();
    const istOffset = 5.5 * 60 * 60000; // IST is UTC+5:30
    const istTime = new Date(today.getTime() + istOffset);
    const istDateString = istTime.toISOString().split('T')[0];// Get YYYY-MM-DD
    const isoDate=new Date(istDateString).toISOString();
    return isoDate;
  }
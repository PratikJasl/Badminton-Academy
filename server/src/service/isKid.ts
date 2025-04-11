//@dev Function to determine a user is kid or adult.
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
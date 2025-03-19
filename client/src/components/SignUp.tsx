import { useForm, Controller } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { userSchema, SignUpFromData } from "../schema/userSchema"

function SignUp(){

    const { control, handleSubmit, formState: {errors} } = useForm<SignUpFromData>({
        resolver: joiResolver(userSchema),
    })

    const onSubmit = (data: SignUpFromData) => {
        console.log('Form Data:', data);
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label>Full Name</label>
            <Controller
            name="fullName"
            control={control}
            render={({ field }) => <input {...field} />}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
        </div>

        <div>
            <label>Date of Birth</label>
            <Controller
            name="dob"
            control={control}
            render={({ field }) => <input type="date" {...field} />}
            />
            {errors.dob && <p>{errors.dob.message}</p>}
        </div>

        <div>
            <label>Gender</label>
            <Controller
            name="gender"
            control={control}
            render={({ field }) => (
                <div>
                <label>
                    <input {...field} type="radio" value="male" /> Male
                </label>
                <label>
                    <input {...field} type="radio" value="female" /> Female
                </label>
                <label>
                    <input {...field} type="radio" value="other" /> Other
                </label>
                </div>
            )}
            />
            {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <div>
            <label>Email</label>
            <Controller
            name="email"
            control={control}
            render={({ field }) => <input type="email" {...field} />}
            />
            {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
            <label>Phone</label>
            <Controller
            name="phone"
            control={control}
            render={({ field }) => <input {...field} />}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
            <label>Password</label>
            <Controller
            name="password"
            control={control}
            render={({ field }) => <input type="password" {...field} />}
            />
            {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
            <label>Role</label>
            <Controller
            name="role"
            control={control}
            render={({ field }) => (
                <select {...field}>
                <option value="student">Student</option>
                <option value="coach">Coach</option>
                <option value="admin">Admin</option>
                </select>
            )}
            />
            {errors.role && <p>{errors.role.message}</p>}
        </div>

        <div>
            <label>Location ID</label>
            <Controller
            name="locationId"
            control={control}
            render={({ field }) => (
                <select {...field}>
                {/* Assuming you will populate these options dynamically */}
                <option value={1}>New York</option>
                <option value={2}>Los Angeles</option>
                </select>
            )}
            />
            {errors.locationId && <p>{errors.locationId.message}</p>}
        </div>

        <div>
            <label>Coaching Plan ID</label>
            <Controller
            name="coachingPlanId"
            control={control}
            render={({ field }) => (
                <select {...field}>
                {/* Assuming you will populate these options dynamically */}
                <option value={1}>Basic Plan</option>
                <option value={2}>Premium Plan</option>
                </select>
            )}
            />
            {errors.coachingPlanId && <p>{errors.coachingPlanId.message}</p>}
        </div>

        <div>
            <label>Join Date</label>
            <Controller
            name="joinDate"
            control={control}
            render={({ field }) => <input type="date" {...field} />}
            />
            {errors.joinDate && <p>{errors.joinDate.message}</p>}
        </div>

        <div>
            <label>Plan Start Date</label>
            <Controller
            name="planStartDate"
            control={control}
            render={({ field }) => <input type="date" {...field} />}
            />
            {errors.planStartDate && <p>{errors.planStartDate.message}</p>}
        </div>

        <div>
            <label>Plan End Date</label>
            <Controller
            name="planEndDate"
            control={control}
            render={({ field }) => <input type="date" {...field} />}
            />
            {errors.planEndDate && <p>{errors.planEndDate.message}</p>}
        </div>

        <button type="submit">Sign Up</button>
    </form>
    )
}

export default SignUp
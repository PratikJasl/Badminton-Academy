import { useForm } from "react-hook-form"
import { userSchema } from "../schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup"


function SignUp(){
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(userSchema),
      })

    const today = new Date().toISOString().split('T')[0];

    const onSubmit = (data: any) => console.log(data)

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-fit shadow-lg p-10 m-5 rounded-2xl">

            <h1 className="text-3xl font-bold text-blue-600 ">SignUp</h1>

            <input 
                id="fullName" 
                type="text" 
                placeholder="Full Name" 
                {...register("fullName", { required: true, maxLength: 50, minLength: 3})}
                className="shadow-lg p-2 rounded-lg"
            />
            
            <p className="shadow-2xl shadow-gray-600 p-2 mt-2 bg-red-100 text-red-700 rounded-md">
                {errors.fullName?.message}
            </p>
           

            <input 
                id="email" 
                type="email" 
                placeholder="Email" 
                {...register("email", {required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
                className="shadow-lg p-2 rounded-lg"
            />
            {errors.email?.message}

            <input 
                id="phone" 
                type="number" 
                placeholder="Phone Number" 
                {...register("phone", {required: true, min: 10, max:10, pattern: /^[0-9]+$/})}
                className="shadow-lg p-2 rounded-lg"
            />
            {errors.phone?.message}

            <input 
                id="dob" 
                type="text"
                placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = 'date')}
                {...register('dob', {
                    required: 'Date of birth is required',
                    max: {
                      value: today,
                      message: 'Date of birth cannot be in the future',
                    },
                    onBlur: (e) => {
                      if (!e.target.value) {
                        e.target.type = 'text';
                      }
                    },
                  })}
                max={today}
                className="shadow-lg p-2 rounded-lg"
            />
            <p>{errors.dob?.message}</p>

            <select 
                id="locationId" 
                {...register("locationId")}
                className="shadow-lg p-2 rounded-lg"
                >
                <option value="female">option1</option>
                <option value="male">option2</option>
                <option value="other">option3</option>
            </select>
            <p>{errors.locationId?.message}</p>

            <select 
                id="coachingPlanId"     
                {...register("coachingPlanId")}
                className="shadow-lg p-2 rounded-lg"
                >
                <option value="female">option1</option>
                <option value="male">option2</option>
                <option value="other">option3</option>
            </select>
            <p>{errors.coachingPlanId?.message}</p>

            <input 
                id="password"
                type="text"
                placeholder="Password" 
                {...register("password",{required: true, min: 4, max: 20})}
                className="shadow-lg p-2 rounded-lg"
            />
            <p>{errors.password?.message}</p>

            <input 
                id="password"
                type="text"
                placeholder="Re-Enter Password" 
                {...register("password",{required: true, min: 4, max: 20})}
                className="shadow-lg p-2 rounded-lg"
            />
            
            <button 
                type="submit"
                className="shadow-lg p-2 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-600">
                Submit
            </button>
        </form>
    )
}

export default SignUp

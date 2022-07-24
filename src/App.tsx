import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

let renderCount = 0;

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

type Inputs = {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  age: number;
  email: string;
};

// If you have an schema set up, the parameters in the "require" function will not be necessary, only valueAsNumber
const schema = yup
  .object({
    firstName: yup.string().required().lowercase().trim(),
    lastName: yup.string().required(),
    gender: yup.string().required(),
    age: yup
      .number()
      .positive()
      .round("round")
      .required("Ahh, you forgot to assing the age"),
    email: yup
      .string()
      .min(10, "This email should have a minimum of 10 characters")
      .email(),
    // website: string().url().nullable(),
    // createdOn: date().default(() => new Date()),
  })
  .required();

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      // firstName: "Mad",
      // lastName: "Max",
      // // age: 100000,
      // gender: GenderEnum.other,
      // email: "",
    },
  });

  renderCount++;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(errors);

  // Subscribe to value changes
  // console.log(watch());
  // console.log(watch("firstName"));
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const gender = watch("gender");
  const email = watch("email");
  const age = watch("age");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>React Hook Form + Yup Integration</h2>
      <h5>Efficient form verification/validation</h5>

      <hr />

      <h2>Render Count: {renderCount}</h2>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ display: "block" }}>First Name</label>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          {...register("firstName", {
            // required:true,
            required: "This field is required!",
            min: 4,
          })}
          placeholder="First Name"
        />

        <p>{firstName}</p>

        {errors.firstName?.message && <p>{errors.firstName?.message}</p>}

        <label style={{ display: "block" }}>Last Name</label>
        {/* include validation with required or other standard HTML validation rules */}
        <input
          {...register("lastName", {
            required: "This field is required!",
            pattern: /^[A-Za-z]+$/i,
            minLength: { value: 4, message: "Min length is 4" },
          })}
          placeholder="Last Name"
        />

        <p>{lastName}</p>

        {/* errors will return when field validation fails  */}
        {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
        {/* {errors.lastName && <p>Last name is required</p>} */}

        <label style={{ display: "block" }}>Age</label>
        <input
          {...register("age", { valueAsNumber: true })}
          placeholder="Age"
        />

        <p>{age}</p>

        {/* errors will return when field validation fails  */}
        {errors.age?.message && <p>{errors.age.message}</p>}

        <label style={{ display: "block" }}>Gender</label>
        <select {...register("gender")}>
          <option value="">Select A Gender</option>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>

        <p>{gender}</p>

        {/* errors will return when field validation fails  */}
        {errors.gender?.message && <p>{errors.gender.message}</p>}

        <label style={{ display: "block" }}>Email</label>
        <input {...register("email")} placeholder="E-Mail" />

        <p>{email}</p>
        {errors.email?.message && <p>{errors.email.message}</p>}

        <input type="submit" />
      </form>
    </div>
  );
}

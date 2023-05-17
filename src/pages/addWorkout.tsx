import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import NavBar from "@/components/navbar";
import Image from "next/image";

// declare types
type FormValues = {
  workoutType: string;
  cardioType: string;
  intensity: string;
  duration: number;
  weightliftingType: string;
  sets: number;
  weight: number;
  reps: number;
  [key: string]: string | number;
};

function AddWorkout() {
  // can either handle a string or a null value
  const [workoutType, setWorkoutType] = useState<string | null>(null);

  {
    /* call the useForm hook to return an object that has functions
to manage a form */
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  {
    /*function to show data on console */
  }
  const onSubmit = (data: FormValues) => {
    if (data.workoutType === "cardio") {
      const { workoutType, cardioType, intensity, duration } = data;
      const cardioData = { workoutType, cardioType, intensity, duration };
      console.log(cardioData);
      reset();
    } else if (data.workoutType === "weightlifting") {
      const { workoutType, weightliftingType, sets } = data;
      const weightliftingData: any = {
        workoutType,
        weightliftingType,
        sets,
        setDetails: [],
      };
      for (let i = 0; i < sets; i++) {
        weightliftingData.setDetails.push({
          weight: data[`weight-${i}`],
          reps: data[`reps-${i}`],
        });
      }
      console.log(weightliftingData);
      reset();
    }
  };

  {
    /* observe changes in the workout type*/
  }
  const workoutTypeSelected = watch("workoutType", "");

  {
    /*observe changes in sets for added input fields*/
  }
  const sets = Number(watch("sets", 0));

  {
    /*used for setting the workout type state variable to the current 
  state of workoutType. [workoutTypeSelected] is the dependency array for 
  this effect, The effect will only run when one of the values in the array
  changes, in this case when workoutTypeSelected changes  */
  }

  useEffect(() => {
    setWorkoutType(workoutTypeSelected);
  }, [workoutTypeSelected]);

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-black"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <Image
        src="/images/addworkout.png"
        alt="Fitness App Logo"
        className="relative top-10 mt-20 ml-5"
        width={400}
        height={100}
      />

      <div className="w-full max-w-xs mx-auto mt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 ">
            {/*workout type label and input*/}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="workoutType"
            >
              Workout Type
            </label>
            <select
              {...register("workoutType")}
              id="workoutType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option disabled value="">
                Select workout type
              </option>
              {/* workout type options */}
              <option value="Select">Select Type</option>
              <option value="cardio">Cardio</option>
              <option value="weightlifting">Weightlifting</option>
            </select>
          </div>

          {/*if cardio workouttype is selected, display the following fields */}
          {workoutType === "cardio" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="cardioType"
                >
                  Cardio Type
                </label>
                <select
                  {...register("cardioType")}
                  id="cardioType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option disabled value="">
                    Select cardio type
                  </option>
                  <option value="running">Running</option>
                  <option value="biking">Biking</option>
                  <option value="swimming">Swimming</option>
                  {/* Add other cardio types as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="intensity"
                >
                  Intensity
                </label>
                <select
                  {...register("intensity")}
                  id="intensity"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option disabled value="">
                    Select intensity
                  </option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="duration"
                >
                  Duration (Minutes)
                </label>
                <input
                  {...register("duration")}
                  id="duration"
                  type="number"
                  step="0.1"
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </>
          )}

          {workoutType === "weightlifting" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="weightliftingType"
                >
                  Weightlifting Type
                </label>
                <select
                  {...register("weightliftingType")}
                  id="weightliftingType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option disabled value="">
                    Select weightlifting type
                  </option>

                  <option value="benchpress">Bench Press</option>
                  <option value="deadlift">Deadlift</option>
                  <option value="squat">Squat</option>
                  {/* Add other weightlifting types as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="sets"
                >
                  Sets
                </label>
                <input
                  {...register("sets")}
                  id="sets"
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                  max="10"
                />
              </div>
              {/* Create inputs for weight and reps based on number of sets */}
              {Array.from({ length: sets }, (_, i) => (
                <div key={i}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`weight-${i}`}
                    >
                      Weight for set {i + 1}
                    </label>
                    <input
                      {...register(`weight-${i}`, { required: true })}
                      id={`weight-${i}`}
                      type="number"
                      step="5"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      min="0"
                    />
                    {errors[`weight-${i}`] && (
                      <p className="text-red-500">This field is required</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`reps-${i}`}
                    >
                      Reps for set {i + 1}
                    </label>
                    <input
                      {...register(`reps-${i}`, { required: true })}
                      id={`reps-${i}`}
                      type="number"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      min="0"
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-cyan-300 hover:bg-cyan-500 hover:text-white text-gray-700 font-bold py-2 px-4 rounded border border-gray-500 mt-3 content-center"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddWorkout;

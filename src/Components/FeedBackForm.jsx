import React from "react";
import { Controller, useForm } from "react-hook-form";
import { db } from "@/firbase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { StarRating } from "./StarRating";
import toast from "react-hot-toast";
import { Input } from "@/Components/ui/Input";
import {
  InputGroupTextarea,
  InputGroup,
  InputGroupAddon,
} from "@/Components/ui/Input-group";
import { Button } from "@/Components/ui/Button";

const FeedBackForm = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      rating: 0,
      firstName: "",
      email: "",
      FeedBack: "",
    },
  });
  const onSubmit = (feedback) => {
    uploadtoFirebase(feedback);
  };

  const uploadtoFirebase = async (feedback) => {
    try {
      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, feedback);
      console.log(feedback);
      toast.success("Thank you for your feedback");
      reset({
        rating: 0,
        firstName: "",
        email: "",
        FeedBack: "",
      });
    } catch (error) {
      console.log("feedback error", error);
    } finally {
    }
  };
  return (
    <div className="flex flex-col  w-full h-screen items-center justify-center">
      <div className="flex flex-col gap-6 w-xl items-center justify-center  p-6">
        <div className="flex items-start flex-col w-full">
          <h1 className="text-4xl py-2 font-semibold text-gray-800">
            FeedBack form
          </h1>
          <p className="text-gray-500">Share your thoughts with us!</p>
        </div>
        <form
          className="gap-4 items-start w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="rating"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <StarRating
                starCount={5}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Input
            className=""
            {...register("firstName", { required: true, minLength: 1 })}
            placeholder="first name"
          />
          <Input className="" {...register("email")} placeholder="Email" />
          <InputGroup className=" ">
            <InputGroupTextarea
              {...register("FeedBack")}
              placeholder="Type your feedback here..."
            />
            <InputGroupAddon align="block-end"></InputGroupAddon>
          </InputGroup>
          <div className="flex w-full justify-end">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedBackForm;

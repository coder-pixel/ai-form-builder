"use client";
// client component
// way to use next-auth in client-component -> use useSession hook

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { generateForm } from "@/actions/generateForm";
import { useFormState, useFormStatus } from "react-dom";
import { signIn, useSession } from "next-auth/react";

type Props = {};

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return <Button>{pending ? "Generating" : "Generate"}</Button>;
};

const initialState: {
  message: string;
  data: any;
} = {
  message: "",
  data: {},
};

const FormGenerator = (props: Props) => {
  const session = useSession();

  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);

  const _onFormCreate = () => {
    if (!session?.data?.user) {
      signIn();
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    if (state.message === "success") {
      setOpen(false); // close dialog
    }
    console.log(state.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={_onFormCreate}>Create Form</Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <div className="grid gap-4 py-4">
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Share what your form is about, who is it for, and what nformation you would like to collect. And AI will do the magic!"
              ></Textarea>
            </div>
            <DialogFooter>
              <SubmitButton />
              <Button variant="link">Create Manually</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormGenerator;

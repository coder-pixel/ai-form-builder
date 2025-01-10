"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const FormGenerator = (props: Props) => {
  const [open, setOpen] = useState(false);

  const _onFormCreate = () => {
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={_onFormCreate}>Create Form</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <form>
            <div className="grid gap-4 py-4">
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Share what your form is about, who is it for, and what nformation you would like to collect. And AI will do the magic!"
              ></Textarea>
            </div>
          </form>
        </DialogHeader>
        <DialogFooter>
          <Button variant="link">Create Manually</Button>
          {/* <Button>Submit</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormGenerator;

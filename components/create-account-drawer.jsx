"use client";
import React, { useEffect } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { accountSchema } from "@/app/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { createAccount } from "@/app/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountfn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountfn(data);
  };
  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [createAccountLoading, newAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g. , Main Checking "
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* select account */}

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Account Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">CURRENT</SelectItem>
                  <SelectItem value="SAVING">SAVING</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Balance Input */}

            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium">
                Account balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00 "
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.balance.message}
                </p>
              )}
            </div>

            {/* Default value */}

            <div className="space-y-2 flex items-center justify-between  rounded-lg p-3">
              <div>
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium cursor-pointer"
                >
                  Set as Default Account
                </label>
                <p className="text-sm text-muted-foreground ">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />
              {errors.isDefault && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.isDefault.message}
                </p>
              )}
            </div>

            {/* button to handele create account and on submit */}
            <div className="flex gap-2 pt-4 ">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                className="flex-1"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;

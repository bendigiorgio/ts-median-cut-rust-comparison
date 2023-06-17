"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUrlStore } from "@/stores/urlStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  link: z
    .string()
    .url()
    .refine((v) => v.endsWith(".png") || v.endsWith(".jpg"), {
      message: "Currently only supports .png or .jpg",
    }),
  iterations: z.number().int().positive(),
});

const TsForm = () => {
  const { toast } = useToast();
  const urlStore = useUrlStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handlePaste = () => {
    if (urlStore.url && urlStore.iterations) {
      form.setValue("link", urlStore.url);
      form.setValue("iterations", urlStore.iterations);
    } else {
      toast({
        title: "No previous values",
        description: "There are no previous values to paste",
      });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    urlStore.setUrl(values.link);
    urlStore.setIterations(values.iterations);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Typescript</CardTitle>
        <CardDescription>
          This is the Typescript implementation of the Median Cut algorithm.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iterations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iterations</FormLabel>
                  <FormControl>
                    <Input
                      min={1}
                      defaultValue={4}
                      type="number"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    This will determine the number of images you get in
                    response. The number of images will be{" "}
                    <span className="font-bold">iterations&#178;</span>
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center justify-between">
              <Button type="submit">Submit</Button>
              <Button
                onClick={handlePaste}
                type="button"
                variant="ghost"
                className="text-xs"
              >
                Paste Previous Values
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TsForm;

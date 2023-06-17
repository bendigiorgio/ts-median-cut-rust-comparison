"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useState } from "react";
import { useResultStore } from "@/stores/resultStore";

export const formSchema = z.object({
  link: z
    .string()
    .url()
    .refine((v) => v.endsWith(".png") || v.endsWith(".jpg"), {
      message: "Currently only supports .png or .jpg",
    }),
  iterations: z.preprocess(
    (a) => (typeof a === "number" ? a : parseInt(z.string().parse(a), 10)),
    z.number().int().positive()
  ),
  endpoint: z.string().url(),
});

const RustForm = () => {
  const [editEndPoint, setEditEndPoint] = useState(false);
  const { toast } = useToast();
  const urlStore = useUrlStore();
  const resultStore = useResultStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint:
        urlStore.rustEndpoint ??
        "http://127.0.0.1:8000/make_palette_image?id=1234",
      iterations: urlStore.rustIterations ?? 4,
      link: urlStore.rustUrl ?? "",
    },
  });

  const handlePaste = () => {
    if (urlStore.rustUrl && urlStore.rustIterations) {
      form.setValue("link", urlStore.rustUrl);
      form.setValue("iterations", urlStore.rustIterations);
    } else {
      toast({
        title: "No previous values",
        description: "There are no previous values to paste",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    urlStore.setRustUrl(values.link);
    urlStore.setRustIterations(values.iterations);
    urlStore.setRustEndpoint(values.endpoint);
    resultStore.setRustLoading(true);
    const response = await fetch(values.endpoint, {
      method: "POST",
      body: JSON.stringify({
        link: values.link,
        iterations: values.iterations,
      }),
    });

    const reader = response.body?.getReader();
    const chunks: Uint8Array[] = [];
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        if (value) {
          chunks.push(value);
        }
      }
    }
    const concatenatedChunks = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    );
    let position = 0;
    for (const chunk of chunks) {
      concatenatedChunks.set(chunk, position);
      position += chunk.length;
    }
    const blob = new Blob([concatenatedChunks], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    resultStore.setRustResult(imageUrl);
    resultStore.setRustLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rust</CardTitle>
        <CardDescription>
          This is the Rust implementation of the Median Cut algorithm.
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
                  <FormMessage />
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
                    <Input min={1} type="number" {...field}></Input>
                  </FormControl>
                  <FormDescription>
                    This will determine the number of images you get in
                    response. The number of images will be{" "}
                    <span className="font-bold">iterations&#178;</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-end justify-end space-x-2">
              {editEndPoint && (
                <FormField
                  control={form.control}
                  name="endpoint"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>API Endpoint</FormLabel>
                      <FormControl>
                        <Input {...field}></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setEditEndPoint(!editEndPoint);
                }}
              >
                Endpoint
              </Button>
            </div>

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

export default RustForm;

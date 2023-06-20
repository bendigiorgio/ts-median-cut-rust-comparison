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
import { formSchema } from "./RustForm";
import { useState } from "react";
import { useResultStore } from "@/stores/resultStore";
import useTimer from "@/lib/useExecutionTimer";
import { convertPaletteToHex, medianCut } from "@/lib/medianCut/palette";
import { extractData } from "@/lib/medianCut/getImageData";

const TsForm = () => {
  const { toast } = useToast();
  const urlStore = useUrlStore();
  const resultStore = useResultStore();
  const executionTimer = useTimer();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: urlStore.tsEndpoint ?? "http://127.0.0.1:3000/api/make_palette",
      iterations: urlStore.tsIterations ?? 4,
      link: urlStore.tsUrl ?? "",
    },
  });
  const [editEndPoint, setEditEndPoint] = useState(false);
  const handlePaste = () => {
    if (urlStore.tsUrl && urlStore.tsIterations) {
      form.setValue("link", urlStore.tsUrl);
      form.setValue("iterations", urlStore.tsIterations);
    } else {
      toast({
        title: "No previous values",
        description: "There are no previous values to paste",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    urlStore.setTsUrl(values.link);
    urlStore.setTsIterations(values.iterations);
    urlStore.setTsEndpoint(values.endpoint);
    resultStore.setTsLoading(true);
    executionTimer.start();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = values.link;
    img.crossOrigin = "Anonymous";

    if (!ctx) throw new Error("Could not get context");

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const palette = medianCut(imageData, values.iterations);
      if (palette) {
        resultStore.setTsResult({
          colors: convertPaletteToHex(palette),
          internal_time: executionTimer.end(),
        });
        resultStore.setTsLoading(false);
        resultStore.setTsTime(executionTimer.end());
      }
    };
  };

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
                disabled
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

export default TsForm;

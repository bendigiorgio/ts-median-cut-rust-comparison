"use client";
import ReqCard from "@/components/ReqCard";
import RustForm from "@/components/RustForm";
import TsForm from "@/components/TsForm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResultStore } from "@/stores/resultStore";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [openTab, setOpenTab] = useState<"rust" | "typescript">("rust");
  const results = useResultStore();
  return (
    <section className="space-y-8">
      <div className="max-w-2xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Benchmarking
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This is a benchmarking site for two implementations of the Median Cut
          algorithm. One is written in Rust and the other in TypeScript. This is
          just a visual way of testing the two APIs but you may be able to
          change it to work with your own API&apos;s.
        </p>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Playground
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Tabs
          onValueChange={(e) => {
            if (e === "rust" || e === "typescript") {
              setOpenTab(e);
            }
          }}
          defaultValue="rust"
          className="lg:w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rust">Rust</TabsTrigger>
            <TabsTrigger value="typescript">Typescript (Next.js)</TabsTrigger>
          </TabsList>
          <TabsContent value="rust">
            <RustForm />
          </TabsContent>
          <TabsContent value="typescript">
            <TsForm />
          </TabsContent>
        </Tabs>

        <Card className="h-full lg:w-[400px]">
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="space-y-2 overflow-hidden">
            {openTab === "rust" ? (
              results.rustLoading ? (
                <div className="h-[87.5px] w-[350px] animate-pulse rounded-md bg-muted"></div>
              ) : (
                results.rustResult && (
                  <AspectRatio ratio={16 / 4}>
                    <Image
                      fill
                      alt="Rust Result"
                      src={results.rustResult}
                      className="object-contain"
                    />
                  </AspectRatio>
                )
              )
            ) : (
              results.tsResult && (
                <AspectRatio ratio={16 / 4}>
                  <Image
                    fill
                    alt="Rust Result"
                    src={results.tsResult}
                    className="object-contain"
                  />
                </AspectRatio>
              )
            )}
          </CardContent>
        </Card>

        <ReqCard tab={openTab} />
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Benchmarking
      </h2>
    </section>
  );
}

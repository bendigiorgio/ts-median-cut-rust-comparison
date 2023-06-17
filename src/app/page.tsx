import RustForm from "@/components/RustForm";
import TsForm from "@/components/TsForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
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
      <div className="grid grid-cols-2 gap-x-4">
        <Tabs defaultValue="rust" className="w-[400px]">
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
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Response</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="space-y-2"></CardContent>
          </Card>
        </div>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Benchmarking
      </h2>
    </section>
  );
}

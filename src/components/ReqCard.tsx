"use client";

import { useUrlStore } from "@/stores/urlStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

const ReqCard = ({ tab }: { tab: "rust" | "typescript" }) => {
  const urlStore = useUrlStore();
  return (
    <Card className="col-span-full">
      <CardHeader className="">
        <CardTitle className="flex flex-row items-center justify-between">
          Request
          <div>
            {tab === "rust" ? (
              <Badge variant="secondary">Rust</Badge>
            ) : (
              <Badge variant="secondary">Typescript</Badge>
            )}
          </div>
        </CardTitle>

        <Separator />
      </CardHeader>
      <CardContent className="space-y-2">
        {tab === "rust" ? (
          urlStore.rustUrl ? (
            <>
              <div className="flex w-full flex-row divide-x divide-input rounded-md border border-input bg-transparent text-sm text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex w-20 items-center justify-center font-semibold text-primary">
                  POST
                </div>
                <div className="py-2 pl-4">{urlStore.rustEndpoint}</div>
              </div>
              <div className="flex min-h-[80px] w-full flex-col rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                &#123;
                <span className="ml-6">
                  &ldquo;link&rdquo; : &ldquo;{urlStore.rustUrl}&rdquo;
                </span>
                <span className="ml-6">
                  &ldquo;iterations&rdquo; : &ldquo;{urlStore.rustIterations}
                  &rdquo;
                </span>
                &#125;
              </div>
            </>
          ) : (
            <>
              <div className="flex w-full animate-pulse flex-row divide-x divide-input rounded-md border border-input bg-muted text-sm text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <div className="flex min-h-[38px] w-20 items-center justify-center font-semibold text-primary"></div>
                <div className="py-2 pl-4 "></div>
              </div>
              <div className="flex min-h-[80px] w-full animate-pulse flex-col rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></div>
            </>
          )
        ) : (
          // urlStore.tsUrl ? (
          //   <>
          //     <div className="flex w-full flex-row divide-x divide-input rounded-md border border-input bg-transparent text-sm text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          //       <div className="flex w-20 items-center justify-center font-semibold text-primary">
          //         POST
          //       </div>
          //       <div className="py-2 pl-4">{urlStore.tsEndpoint}</div>
          //     </div>
          //     <div className="flex min-h-[80px] w-full flex-col rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          //       &#123;
          //       <span className="ml-6">
          //         &ldquo;link&rdquo; : &ldquo;{urlStore.tsUrl}&rdquo;
          //       </span>
          //       <span className="ml-6">
          //         &ldquo;iterations&rdquo; : &ldquo;{urlStore.tsIterations}
          //         &rdquo;
          //       </span>
          //       &#125;
          //     </div>
          //   </>
          // ) :
          <>
            <div className="flex w-full animate-pulse flex-row divide-x divide-input rounded-md border border-input bg-muted text-sm text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <div className="flex min-h-[38px] w-20 items-center justify-center font-semibold text-primary"></div>
              <div className="py-2 pl-4 "></div>
            </div>
            <div className="flex min-h-[80px] w-full animate-pulse flex-col rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReqCard;

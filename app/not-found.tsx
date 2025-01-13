import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4 bg-gradient-to-t from-zinc-600 to-white text-transparent bg-clip-text">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Don&apos;t worry, even the best data sometimes gets lost in the
          internet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={"/"}
            className="flex items-center justify-center px-4 py-2 bg-primary rounded-md hover:bg:primary/80 dark:text-black text-white group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-all" />
            Back to Dashboard
          </Link>
        </div>
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;

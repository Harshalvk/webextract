import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Loader2 size={30} className="animate-spin stroke-primary" />
    </div>
  );
};

export default loading;

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      dashboard
      <Link href={"/admin"}>Admin</Link>
    </div>
  );
};

export default page;

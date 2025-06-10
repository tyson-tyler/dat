"use client";

import { useUser, useUsers } from "@/lib/firebase/user/read";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ListView() {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div>
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }
  {
    (users?.length ?? 0) === 0 && (
      <div className="text-center py-10 text-gray-500">No users found.</div>
    );
  }
  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
  console.log(users);
  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">
              SN
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2">Photo</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Name
            </th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => {
            return <Row index={index} item={item} key={item?.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

function Row({ item, index }) {
  return (
    <tr>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2 text-center">
        <div className="flex justify-center">
          <Image width={50} height={50} alt="hello" src={item?.photoURL} />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">{item?.displayName}</td>
      <td className="border-y bg-white px-3 py-2">{item?.email}</td>
    </tr>
  );
}

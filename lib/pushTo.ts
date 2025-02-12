import { redirect } from "next/navigation";

const pushTo = async (path: string) => {
  return redirect(`/${path}`);
};

export default pushTo;

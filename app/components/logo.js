import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <div className="flex items-center gap-3">
  <Link href="/">
    <Image
      src="/images/logo.png"
      alt="TeamHub"
      width={60}
      height={60}
      className="cursor-pointer"
    />
  </Link>

     <h1 className="text-xl font-bold text-black">
  TeamSphere
</h1>
    </div>
  );
}
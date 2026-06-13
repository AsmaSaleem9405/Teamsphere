import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/logo.png"
        alt="TeamHub"
        width={60}
        height={60}
      />

     <h1 className="text-xl font-bold text-black">
  TeamSphere
</h1>
    </div>
  );
}
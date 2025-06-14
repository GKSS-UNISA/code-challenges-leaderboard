import Image from "next/image";

const Logo = () => (
  <Image
    src="/logo.png"
    alt="GKSS UNISA brand icon"
    width={40}
    height={40}
    className="h-8 w-auto rounded-full"
  />
);
export default Logo;

import { HTMLAttributes, FC } from "react";
import Image from "next/image";

type Props = HTMLAttributes<HTMLDivElement>;

const Logo: FC<Props> = ({
  onClick,
  ...props
}) => {

  return (
    <div
      className="flex cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <Image
        src="/icons/logo.svg"
        width={180}
        height={50}
        alt="logo"
      />
    </div>
  );

};

export default Logo;

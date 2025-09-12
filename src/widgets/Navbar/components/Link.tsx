import { FC } from "react";
import { LinkProps } from "../links";
import Link from "next/link";
import { Caption } from "@/shared/ui/Typography";

type Props = LinkProps;

const CLink: FC<Props> = ({
  label,
  href
}) => {

  return (
    <Link href={href}>
      <Caption
        className='text-black/40 cursor-pointer hover:text-black/60 transition-colors duration-300 ease-in'
      >
        {label}
      </Caption>
    </Link>
  );

};

export default CLink;

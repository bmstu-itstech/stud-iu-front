import { FC } from "react";
import links from "../links";
import Link from "./Link";

const Links: FC<{}> = () => {
  
  return (
    <div
      className='gap-12 hidden lg:flex'
    >
      {links.map(link => <Link {...link} key={link.label} />)}
    </div>
  );

};

export default Links;

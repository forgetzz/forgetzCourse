
import Home2 from "@/components/userComponents/home";

import ProfilePage from "@/components/userComponents/setting";
import HtmlModule from "@/components/module/language/Html";
import Payment from "@/components/userComponents/Payment";
import NextModule from "@/components/module/framework/nextJs";
import TypescriptModule from "@/components/module/language/typescript";
import SolidityModule from "@/components/module/language/solidity";
import Soon from "@/components/ui/soon";




export const tabStrategies = {
  home: <Home2 />,
  settings: <ProfilePage />,
  Payment: <Payment />,

  // LANGUAGE
  Html: <HtmlModule />,
  Typescript: <TypescriptModule />,
  Solidity: <SolidityModule />,


  // FRAMEWORK
  nextJs: <NextModule />,

  // AI PAGE
  aiService: <Soon />,

  //  TOOLS
  npm: <Soon />,

  // WEB3 
  web3: <Soon />


} as const;



export type TabKey = keyof typeof tabStrategies;
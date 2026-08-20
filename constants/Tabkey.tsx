
import Home2 from "@/components/userComponents/home";

import ProfilePage from "@/components/userComponents/setting";
import HtmlModule from "@/components/module/Html";
import Payment from "@/components/userComponents/Payment";




export const tabStrategies = {
  home: <Home2 />,
  settings: <ProfilePage />,
  Payment: <Payment />,

  // LANGUAGE
  Html: <HtmlModule />,


  // FRAMEWORK
  nextJs: <h1>SOON</h1>,

  // AI PAGE
  aiService: <h1> SOON</h1>,

  //  TOOLS
  npm: <h1>SOON</h1>,

  // WEB3 

  web3: <h1>SOON</h1>


} as const;



export type TabKey = keyof typeof tabStrategies;
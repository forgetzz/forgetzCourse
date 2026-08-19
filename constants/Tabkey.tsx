
import Home2 from "@/components/userComponents/home";

import ProfilePage from "@/components/userComponents/setting";
import HtmlModule from "@/components/module/Html";
import Payment from "@/components/userComponents/Payment";




export const tabStrategies = {
  home: <Home2 />,
  settings: <ProfilePage />,
  Module: <HtmlModule/>,
  Html: <HtmlModule/>,
  Payment: <Payment/> 
} as const;



export type TabKey = keyof typeof tabStrategies;
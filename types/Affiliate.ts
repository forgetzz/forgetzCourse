import { Timestamp } from "firebase/firestore";

export interface AffiliateTypes {
  name: string;
  username: string;
  referal: string;
  createdAt: Timestamp;
}

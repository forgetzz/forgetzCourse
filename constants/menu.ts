import { Code2, FrameIcon, LucideIcon } from "lucide-react";
import type { TabKey } from "./Tabkey";

type menuType = {
    id: string
    label: string
    icon: LucideIcon,
    items: {
        label: string,
        tab: TabKey
    }[]
}
export const menuGroups: menuType[] = [
    {
        id: "Language",
        label: "Language",
        icon: Code2,
        items: [
            { label: "Html", tab: "Html" },
            { label: "Typescript", tab: "Typescript" },
            { label: "Solidity", tab: "Solidity" },
        ]
    },
    {
        id: "Framework",
        label: "Framewoek",
        icon: FrameIcon,
        items: [
            { label: "Next Js", tab: "nextJs" },
           
        ]
    }
]
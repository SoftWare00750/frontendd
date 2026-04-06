import  type { ReactNode } from "react";
import { CheckCircle, File } from "lucide-react";

export interface Documents{
id: number;
title: string;
subtitle: string;
updatedat?: string;
verified?: string;
icon?: ReactNode
}

export const my_document:Documents[] = [
{
 id: 1,
title: "Government ID",
subtitle: "National Identity Number",
verified: "verified",
updatedat: "Updated Jan 10 2026",
icon : <CheckCircle size={18} className="text-green-600" />
},
{
 id: 2,
title: "Selfie Verification",
subtitle: "Identity Verification",
verified: "verified",
updatedat: "Updated Jan 10 2026",
icon : <CheckCircle size={18} className="text-green-600" />
},
{
 id: 3,
title: "Business Registration",
subtitle: "CAC Document",
verified: "optional",
updatedat: "Updated Jan 10 2026",
icon : <File size={18} className="text-green-600" />
},
]



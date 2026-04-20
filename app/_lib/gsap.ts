import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(useGSAP, SplitText, CustomEase);
CustomEase.create("premium", "0.16, 1, 0.3, 1");

export { gsap, useGSAP, SplitText, CustomEase };

import home from "@assets/lottieFiles/homePage.json";
import Lottie from "lottie-react";

const LottieHandlerWelcome = () => {
  return <Lottie animationData={home} style={{ width: "100%" }} />;
};

export default LottieHandlerWelcome;

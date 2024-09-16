import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/Animation - 1726081292959.json";
import error from "@assets/lottieFiles/ErrorAnimation.json";
import shooping from "@assets/lottieFiles/Shopping.json";
import trash from "@assets/lottieFiles/TrashAnimation.json";
import loading from "@assets/lottieFiles/LoadingAnimation.json";
import home from "@assets/lottieFiles/HomeAnimation.json";
import success from "@assets/lottieFiles/Success.json";

const lottieHandlerTypes = {
  notFound,
  error,
  shooping,
  trash,
  loading,
  home,
  success,
};

type lottieHandlerProps = {
  type:
    | "home"
    | "notFound"
    | "error"
    | "shooping"
    | "trash"
    | "loading"
    | "success";
  message?: string;
};

const LottieHandler = ({ type, message }: lottieHandlerProps) => {
  const messageStyle = type === "error" ? { color: "red" } : { color: "white" };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3 style={messageStyle}>{message}</h3>
      <Lottie
        animationData={lottieHandlerTypes[type]}
        style={{ width: "30%" }}
      />
    </div>
  );
};

export { LottieHandler };

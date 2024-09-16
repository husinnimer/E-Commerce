import LottieHandlerHome from "@components/feedback/lottieHandler/LottieHandlerHome";
import styles from "@styles/HomePage.module.css";
import LottieHandlerWelcome from "@components/feedback/lottieHandler/lottieHandlerWelcome";

const { myH2 } = styles;

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, width: "100%", height: "100%" }}>
        <LottieHandlerHome />
      </div>
      <div
        style={{
          flexGrow: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieHandlerWelcome />
        <h2 className={myH2}>Welcome To Our Store</h2>
      </div>
    </div>
  );
};

export default Home;

import { Heading } from "@components/common";
import { useAppSelector } from "@store/hook";
import styles from "@styles/profile.module.css";

const { ulProfile } = styles;
const Profile = () => {
  const accountInfo = useAppSelector((state) => state.auth.user);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Heading title="Account User Info" />
      </div>

      <ul className={ulProfile}>
        <li>
          <h3>First Name : {accountInfo?.firstName}</h3>
        </li>
        <li>
          <h3>Last Name : {accountInfo?.lastName}</h3>
        </li>
        <li>
          <h3>Email : {accountInfo?.email}</h3>
        </li>
      </ul>
    </>
  );
};

export default Profile;

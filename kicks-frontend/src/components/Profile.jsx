import Section from "./Section";
import UpdateData from "./UpdateData";

const Profile = ({baseURL}) => {
  return (
    <Section>
      <div className="container flex">
        <UpdateData baseURL={baseURL} />
      </div>
    </Section>
  );
};

export default Profile;

import { useUser } from "@auth0/nextjs-auth0";

const Profile = () => {
  const { user } = useUser();

  return (
    <div className='my-20 text-center'>
      <h1>{user.name}</h1>
      <p>{user.nickname}</p>
      <p>{user.email}</p>
      <p>{user.updated_at}</p>
      <p>{user.email_verified}</p>
    </div>
  );
};

export default Profile;

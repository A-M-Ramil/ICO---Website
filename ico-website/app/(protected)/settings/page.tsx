import { auth, signOut } from "@/auth";
const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="h-7 w-20 text-yellow-50 bg-black rounded">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;

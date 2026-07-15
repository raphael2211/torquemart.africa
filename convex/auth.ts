import Google from "@auth/core/providers/google";
import Apple from "@auth/core/providers/apple";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

// Sign-up form collects a name too — customize the default Password
// provider so it gets stored on the user record.
const CustomPassword = Password({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string | undefined,
    };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    CustomPassword,
    Google,
    Apple({
      profile: (appleInfo) => {
        const name = appleInfo.user
          ? `${appleInfo.user.name.firstName} ${appleInfo.user.name.lastName}`
          : undefined;
        return { id: appleInfo.sub, name, email: appleInfo.email };
      },
    }),
  ],
});
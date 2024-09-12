"use client";
import Identity from "@components/form/Identity";
import Secret from "@components/form/Secret";
import { Button } from "@components/ui/button";
import { pathTo_Home, pathTo_SuccessRegistration } from "@global/navigation";
import { BUTTON_PRIMITIVE } from "@global/UIPrimitive";
import { serviceOAuth } from "@app/actions/serviceOAuth";
// import { userRegister } from "@lib/serviceOAuth/oauthRegistration";
import { useSignupStore } from "@store/signup.store";

import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";

interface InscriptionFormProps {}

const InscriptionForm: FunctionComponent<InscriptionFormProps> = () => {
  const [isNextForm, setIsNextForm] = useState<boolean>(false);
  const [hasFullfilled, setHasFullfilled] = useState<boolean>(false);
  const userData = useSignupStore();
  const router = useRouter();

  const handleChangeForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNextForm(!isNextForm);
  };

  const handleFullfilledSecret = (e: React.MouseEvent) => {
    setHasFullfilled(true);
    handleChangeForm(e);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Gestion du cas d'erreur sur l'inscription
    const withLogin = true;
    await serviceOAuth.registration(userData.email, userData.password);
    const res = await serviceOAuth.connectUser(
      userData.email,
      userData.password
    );
    console.log("view res", res);

    if (res.ok) {
      router.push(pathTo_SuccessRegistration());
    }
    // userRegister(userData)
    //   .then((res) => router.push(pathTo_SuccessRegistration()))
    //   .catch(() => router.push(pathTo_Home()));
  };

  return (
    <div className="mt-12">
      <form onSubmit={handleSubmit}>
        {isNextForm ? <Secret /> : <Identity />}
        <div className="w-full flex-center flex-col gap-4">
          {isNextForm ? (
            <Button
              variant={BUTTON_PRIMITIVE.variant.tertiary}
              onClick={handleFullfilledSecret}
            >
              Valider
            </Button>
          ) : hasFullfilled ? (
            <Button onClick={handleChangeForm}>
              Modifier vos questions secrètes
            </Button>
          ) : (
            <Button onClick={handleChangeForm}>
              Sélectionnez vos questions secrètes
            </Button>
          )}
          {
            // If the user has fullfilled the form, we display the button to submit the form
            hasFullfilled && !isNextForm && (
              <Button variant={BUTTON_PRIMITIVE.variant.tertiary}>
                Valider
              </Button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default InscriptionForm;

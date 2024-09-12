export const pathTo_Home = () => `/`;
// subscription
export const pathTo_Menu = () => `/inscription`;
export const pathTo_SignUp = () => `/inscription/form`;
export const pathTo_SuccessRegistration = () => `/inscription/success`;
// login
export const pathTo_SignIn = () => `/connexion`;
export const pathTo_PasswordRecover = () => `/connexion/recover`;
export const pathTo_PasswordRecoverSuccess = () => `/connexion/recover/success`;
// claim
export const pathTo_Claim = () => `/claim`;
export const pathTo_ClaimPairing = () => `/claim/pairing`;
export const pathTo_ClaimByCard = () => `/claim/carte`;
export const pathTo_ClaimByJewel = () => `/claim/bijou`;
export const pathTo_ClaimVerifier = () => `/claim/verifier`;
//
export const pathTo_Profil = () => `/user/profile`;
export const pathTo_Settings = () => `/user/settings`;
export const pathTo_JewelSelect = () => `/bijou/selection`;

//
// laissé pour exemple :
// secure path
// export const pathTo_Profil = (id: string, token: string) =>
//   `/user/profile?id=${id}&token=${token}`;

// export const securePathTo = (pathTo: () => string, id: string, token: string) =>
//   pathTo().concat(`?id=${id}&token=${token}`);

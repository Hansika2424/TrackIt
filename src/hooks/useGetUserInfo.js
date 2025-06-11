export const useGetUserInfo = () => {
    const auth = localStorage.getItem("auth");
    const { name, profilePhoto, userID, isAuth } = auth ? JSON.parse(auth) : {};
    return { name, profilePhoto, userID, isAuth };
};
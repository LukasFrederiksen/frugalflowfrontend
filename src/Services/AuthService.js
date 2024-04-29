import { showLoadingToast, updateToast } from "../components/common/toast";
import { baseUrl } from "../const";

export const login = async (username, password, setLoggedIn) => {
  var toastId = showLoadingToast("Logging in...");
  const response = await fetch(`${baseUrl}api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    updateToast(toastId, "Error logging in.", response.message);
    console.log(response);
    const message = await response.text();
    throw new Error(message);
  }

  updateToast(toastId, "Logged in successfully!", "success");
  const user = await response.json();

  localStorage.setItem("user", JSON.stringify(user.user));
  localStorage.setItem("access", user.access);
  localStorage.setItem("refresh", user.refresh);
  console.log(getCurrentUser());
  setLoggedIn(true);

  return user;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    return null;
  }
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

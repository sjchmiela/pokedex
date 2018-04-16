import { tokenKey } from "../services/createRelayEnvironment";

export default token => {
  localStorage.setItem(tokenKey, token);
};

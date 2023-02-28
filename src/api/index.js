import axios from "axios";
export const callAllGroups = async (token) => {
  const resp = await axios.get(
    `http://192.168.131.204:4000/groups/allgroups?id=${token}`
  );
  if (resp.data.status == 200) {
    return resp.data.data;
  }
};

import { User } from "@/types/User";

const BASE_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const UsersService = {
  async getAllUsers() {
    const response = await fetch(BASE_URL);
    const data: User[] = await response.json();
    return data;
  },
};

export default UsersService;

import { IUpdatedData } from "@/app/edit-existing-card/[id]/page";
import baseUrl from "../api/axios";

export async function getAll() {
  try {
    const response = await baseUrl.get("/rest/location/getAll");
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
}
export async function addNewCard(data: IUpdatedData) {
  await baseUrl.post("/rest/location/add", data);
}

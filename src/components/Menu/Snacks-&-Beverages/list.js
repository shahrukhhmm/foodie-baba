import axios from "axios";
import { API_BASE } from "../../../lib/constants";

async function fetchMenu() {
  try {
    const response = await axios.get(`${API_BASE}/menu/getmenu`);
    const menuData = response.data;

    const snacksBeveragesItems = menuData.filter(
      (item) => item.categories === "HotTenders"
    );

    return snacksBeveragesItems;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
}

export default fetchMenu;

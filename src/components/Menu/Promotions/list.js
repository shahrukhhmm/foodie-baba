import axios from "axios";
import { API_BASE } from "../../../lib/constants";

async function fetchcontent() {
  try {
    const response = await axios.get(`${API_BASE}/menu/getmenu`);
    const snacksBeveragesItems = response.data.filter(
      (item) => item.categories === "HotWitches"
    );

    return snacksBeveragesItems;
  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
}

export default fetchcontent;

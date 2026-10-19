import { docs } from "$lib";
import { redirect } from "@sveltejs/kit";

export const load = () => redirect(308, `/docs/${Object.values(docs)[0]}`)
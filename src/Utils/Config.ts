const BASE_URL = "https://apk.bacakomik.co/";
export const API_URL = {
	popular: `${BASE_URL}?page=terpopuler`,
	latest: `${BASE_URL}?page=latest`,
	search: function (query: string, page: number): string {
		return `${BASE_URL}?page=search&search=${query}&paged=${page}`;
	},
};

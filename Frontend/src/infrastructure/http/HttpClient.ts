export class HttpClient{
    async get<T>(url: string): Promise<T>{
        try{
            const response = await fetch(url);

            if(!response.ok){
                throw new Error("Failed to fetch data");
            }

            return await response.json() as T;
        }catch(error){
            console.error("Error fetching data:", error);
            throw new Error("Error fetching data");
        }
    }

    async post<T>(url: string, body: any): Promise<T>{
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if(!response.ok){
                throw new Error("Failed to post data");
            }

            return await response.json() as T;
        }catch(error){
            console.error("Error posting data:", error);
            throw new Error("Error posting data");
        }
    }
}

export const httpClient = new HttpClient();
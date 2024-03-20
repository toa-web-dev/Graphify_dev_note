const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const anonKey = process.env.NEXT_PUBLIC_API_KEY;

export async function fetchData(path, queryString = null) {
    try {
        let URL = `${apiUrl}/${path}`;
        if (queryString) URL += queryString;
        const response = await fetch(URL, {
            cache: "force-cache",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                apikey: anonKey,
                Authorization: `Bearer ${anonKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API 오류: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error; // 필요에 따라 예외를 다시 던지거나 처리합니다.
    }
}

import axios from "axios";


const API_KEY = '8b6695a794796864975ebc6361fa0dbd';
const BASE_URL = 'https://api.themoviedb.org/3';


export async function fetchPopularMovies() {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
            language: 'es-ES', // Puedes cambiar el idioma
            page: 1
        }
    });

    return response.data.results; // Retorna solo el array de películas
}

import axios, { AxiosInstance } from "axios";

// Define uma instância do Axios com as configurações necessárias
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // URL base da API
  headers: {
    Authorization: `Basic ${process.env.NEXT_PUBLIC_API_TOKEN}==`, // Define o cabeçalho `Authorization` com o token da API
  },
});

// Define a tipagem do retorno da função `getSchema` (ajuste conforme necessário)
interface SchemaResponse {
  [key: string]: any; // Adapte para os campos reais do retorno
}

interface Artist {
  id: string;
  name: string;
  imageUrl: string; // Supondo que a API retorna uma URL de imagem
}

// Função para obter o esquema da API
export const getSchema = async (): Promise<SchemaResponse> => {
  console.log(process.env.API_TOKEN); // Verifique o valor
  const response = await api.get<SchemaResponse>("/api/query/getSchema");
  return response.data;
};

export const getArtists = async (): Promise<Artist[]> => {
  const response = await api.get("/api/query/getArtists"); // Ajuste o endpoint conforme necessário
  return response.data.artists; // Ou outro nome que a resposta da API contenha
};

export const getAlbums = async (): Promise<any[]> => {
  const response = await api.get("/api/query/getAlbums");
  return response.data.albums; // Ajuste conforme a resposta real da API
};

export const getPlaylists = async (): Promise<any[]> => {
  const response = await api.get("/api/query/getPlaylists");
  return response.data.playlists; // Ajuste conforme a resposta real da API
};

export default api;

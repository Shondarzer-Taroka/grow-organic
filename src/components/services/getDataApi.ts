import axios from 'axios';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const getDataTables = async (page: number, size: number = 10) => {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${size}`);
    const tableData = response.data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        place_of_origin: item.place_of_origin,
        artist_display: item.artist_display,
        inscriptions: item.inscriptions,
        date_start: item.date_start,
        date_end: item.date_end,
    }));
    return { tableData, totalRecords: response.data.pagination.total };
};

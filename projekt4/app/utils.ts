import Papa from 'papaparse';
import { Station } from './types';

export const fetchStations = async (): Promise<Station[]> => {
    const response = await fetch('https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv');
    const text = await response.text();

    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            delimiter: ';',
            skipEmptyLines: true,
            complete: (results) => {
                // Ergebnisse filtern und stationen zurückgeben
                const stations: Station[] = results.data.map((item: any) => ({
                    haltestellen_id: item.HALTESTELLEN_ID,
                    typ: item.TYP,
                    diva: item.DIVA,
                    name: item.NAME,
                    gemeinde: item.GEMEINDE,
                    gemeinde_id: item.GEMEINDE_ID,
                    wgs84_lat: item.WGS84_LAT,
                    wgs84_lon: item.WGS84_LON,
                    stand: '',
                }));
                resolve(stations);
            },
        });
    });
};

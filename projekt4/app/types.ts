export interface Station {
    haltestellen_id: string; // Eindeutige ID der Haltestelle
    typ: string; // Typ der Haltestelle
    diva: string; // DIVA ID
    name: string; // Name der Haltestelle
    gemeinde: string; // Gemeinde
    gemeinde_id: string; // Gemeinde ID
    wgs84_lat: number; // Geografische Breite (als Zahl)
    wgs84_lon: number; // Geografische Länge (als Zahl)
    stand: string; // Stand
}

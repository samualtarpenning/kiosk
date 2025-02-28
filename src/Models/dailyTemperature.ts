export interface DailyTemperatureReading {
    date: string;          
    maxTemperature: number; 
    minTemperature: number; 
    avgTemperature: number; 
    maxHumidity: number;    
    minHumidity: number;   
    avgHumidity: number;    
  }

  export interface DailyCo2ConcentrationReading {
    date: string;
    maxPpm: number;
    minPpm: number;
    avgPpm: number;
  }
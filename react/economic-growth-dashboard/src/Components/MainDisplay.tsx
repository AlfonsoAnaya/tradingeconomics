import { useState, useEffect, useCallback, useRef } from "react"
import SelectForm from "./MainDisplayComponents/SelectForm";
import DataDisplay from "./MainDisplayComponents/DataDisplay";
import axios from "axios";

interface DataPoint {
    Category: string
    Country: string
    DateTime: string
    Frequency: string
    HistoricalDataSymbol: string
    LastUpdate: string
    Value: number
}


function MainDisplay() {

    const [countries, setCountries] = useState<string[]>(['']);
    const [year1, setYear1] = useState<string>('');
    const [year2, setYear2] = useState<string>('');
    const [indicator, setIndicator] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataPoint[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const isInitialMount = useRef(true);


    const fetchData = useCallback(async () => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return; // Skip the first run when search parameters are empty
          }

        const countriesSearch = countries.join(',');
        setLoading(true);
        try {
            const response = await axios.get(`https://api.tradingeconomics.com/historical/country/${countriesSearch}/indicator/${indicator}/${year1}-01-01/${year2}-12-31?c=${process.env.REACT_APP_API_KEY}`);
            setData(response.data);
        } catch (error) {
            setError('Error fetching data. Please try again later.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [countries, indicator, year1, year2])


    useEffect(() => {
        fetchData();
    }, [countries, indicator, year1, year2, fetchData]);


    return (
        <div className="w-[100%] md:h-[100%] bg-white flex justify-center items-center">
            <div className="flex flex-col md:h-[100%] justify-between items-center w-[90%] self-center bg-white text-dark">
                <SelectForm
                    setCountries={setCountries}
                    setYear1={setYear1}
                    setYear2={setYear2}
                    setSearchIndicator={setIndicator}
                />
                {loading ? (
                    <p className="flex justify-center items-center max-w-[900px] w-[95%] h-[500px] md:h-[70%] pb-8">Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : <DataDisplay
                    data={data}
                    indicator={indicator}
                    year1={year1}
                    year2={year2}
                    countries={countries}
                />
                }
            </div>
        </div >
    )
}

export default MainDisplay
import { useState, useEffect } from "react"
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

    const [countries, setCountries] = useState<string[]>(['Mexico', 'Thailand', 'New Zealand', 'Sweden']);
    const [year1, setYear1] = useState<string>('1980');
    const [year2, setYear2] = useState<string>('2022');
    const [indicator, setIndicator] = useState<string>('GDP');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataPoint[] | null>(null);
    const [error, setError] = useState<string | null>(null);


    const fetchData = async () => {
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
    };

    useEffect(() => {
        fetchData();
    }, [countries, year1, year2, indicator]);


    return (
        <div className="w-[100%] bg-white flex justify-center items-center">
            <div className="flex flex-col justify-between items-center w-[90%] gap-8 self-center bg-white text-dark">
                <SelectForm
                    countries={countries}
                    year1={year1}
                    year2={year2}
                    indicator={indicator}
                    setCountries={setCountries}
                    setYear1={setYear1}
                    setYear2={setYear2}
                    setSearchIndicator={setIndicator}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : <p>success</p>
                }
                <DataDisplay
                    data={data}
                    indicator={indicator}
                    year1={year1}
                    year2={year2}
                    countries={countries}
                />
            </div>
        </div >

    )
}

export default MainDisplay
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

    const [countries, setCountries] = useState<string[]>(['Mexico']);
    const [year1, setYear1] = useState<string>('2010');
    const [year2, setYear2] = useState<string>('2022'); 
    const [indicator, setIndicator] = useState<string>('GDP');
    const [searchCounter, setSearchCounter] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataPoint[] | null>(null);
    
    const fetchData = async () => {
        const api_key = 'ba117b157e82406:5j3x3zor5df6ofd';
        const countriesSearch = countries.join(',');
        console.log(`https://api.tradingeconomics.com/historical/country/${countriesSearch}/indicator/${indicator}/${year1}-01-01/${year2}-12-31?c=${api_key}`)
        try {
            const response = await axios.get(`https://api.tradingeconomics.com/historical/country/${countriesSearch}/indicator/${indicator}/${year1}-01-01/${year2}-12-31?c=${api_key}`);
            console.log(response.data)
            setData(response.data)
            console.log(`state data: ${data}`)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
        console.log('search coutner updated')
        fetchData();
    }, [searchCounter]);

    useEffect(() => {
        if (data) {
            console.log('State data:', data[0]);
        }
    }, [data]);


    return (
        <div className="border-2 border-blue-200 flex flex-col justify-between items-center w-[90%] gap-8 self-center">
            <SelectForm 
                countries={countries}
                year1={year1}
                year2={year2}
                indicator={indicator}
                setCountries={setCountries}
                setYear1={setYear1}
                setYear2={setYear2}
                setSearchIndicator={setIndicator}
                setSearchCounter = {setSearchCounter}
            />
            <DataDisplay 
                data={data}
            />
        </div>
    )
}

export default MainDisplay
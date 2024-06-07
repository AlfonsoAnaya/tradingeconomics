import { useState } from "react";
import CountriesRadioSelect from "./SelectElements/CountriesRadioSelect";
import YearsSlider from "./SelectElements/YearsSlider";
import IndicatorsSelect from "./SelectElements/IndicatorsSelect";

interface SelectFormProps {
    countries: string[]
    year1: string
    year2: string
    indicator: string
    setCountries: React.Dispatch<React.SetStateAction<string[]>>;
    setYear1: React.Dispatch<React.SetStateAction<string>>;
    setYear2: React.Dispatch<React.SetStateAction<string>>;
    setSearchIndicator: React.Dispatch<React.SetStateAction<string>>;
    setSearchCounter: React.Dispatch<React.SetStateAction<number>>;
}

function SelectForm({
    countries, 
    year1,
    year2,
    indicator,
    setCountries,
    setYear1,
    setYear2,
    setSearchIndicator,
    setSearchCounter
}: SelectFormProps) {

    const handleClick = () => {
        setSearchCounter((prev) => prev+1);
    }

    return (
        <div className="border-2 border-red-200 flex justify-between items-center w-[100%] max-w-[1000px] self-center">
            <div className="flex gap-4 justify-start items-center">
                <CountriesRadioSelect
                    setCountries={setCountries}
                />
                <YearsSlider
                    setYear1={setYear1}
                    setYear2={setYear2}
                />
                <IndicatorsSelect
                    setSearchIndicator={setSearchIndicator}
                />
            </div>
            <div>
                <p>country: {countries}</p>
                <p>year1: {year1}</p>
                <p>year2: {year2}</p>
                <p>indicator: {indicator}</p>
            </div>
            <button 
                className="bg-primary px-6 py-2 text-white rounded-lg"
                onClick={handleClick}
            >
                SEARCH
                </button>
        </div>
    )
}

export default SelectForm
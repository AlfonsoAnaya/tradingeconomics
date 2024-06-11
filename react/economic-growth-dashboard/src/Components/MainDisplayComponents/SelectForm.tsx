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
}: SelectFormProps) {

    return (
        <div className="flex justify-center items-center w-[100%] max-h-[25%] max-w-[800px] self-center border-[1px] border-dark rounded-xl mt-[20px] p-4">
            <div className=" w-[100%] flex flex-col md:flex-row gap-[30px] justify-between items-center">
                
                <IndicatorsSelect
                    setSearchIndicator={setSearchIndicator}
                />
                <CountriesRadioSelect
                    setCountries={setCountries}
                />
                <YearsSlider
                    setYear1={setYear1}
                    setYear2={setYear2}
                />
            </div>

        </div>
    )
}

export default SelectForm
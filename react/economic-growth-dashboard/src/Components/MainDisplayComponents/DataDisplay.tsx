interface DataPoint {
    Category: string
    Country: string
    DateTime: string
    Frequency: string
    HistoricalDataSymbol: string
    LastUpdate: string
    Value: number
}

interface DataDisplayProps {
    data: DataPoint[] | null
}

function DataDisplay({data}: DataDisplayProps) {

    if (data === null) return <div><p>No data to show</p></div>

    return (
        <div>
            {/* {data.map((datapoint:any, i:number) => (
                <p key={`${datapoint} ${i}`}>{datapoint.Value}</p>
            ))} */}
            {data[0].Country} {data[0].Value}
        </div>
    )
}

export default DataDisplay
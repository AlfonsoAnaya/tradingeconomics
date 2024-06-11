import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

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
    indicator: string
    year1: string
    year2: string
    countries: string[]
}

function DataDisplay({ data, indicator, year1, year2, countries }: DataDisplayProps) {

    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    const generateYearsArray = (startYear: string, endYear:string) => {
        let years: string[]= []
        const start = parseInt(startYear, 10)
        const end = parseInt(endYear, 10)
        for (let year = start; year <= end; year++) {
            years.push(year.toString());
          }
        return years
    }
    
    const colors = ["rgb(209, 77, 65)", "rgb(208, 162, 21)", "rgb(58, 169, 159)", "rgb(139, 126, 200)"]

    const generateDataSets = (countriesArray: string[], dataArray: DataPoint[] | null, colorsArray: string[]) => {
        // Initialize an empty array to hold the datasets
        let datasets: { label: string; data: number[]; fill: boolean; borderColor: string; tension: number }[] = [];
        
        // Check if dataArray is null, if so return the empty datasets array
        if (!dataArray) {
            return datasets;
        }
    
        // Iterate over each country in countriesArray
        countriesArray.forEach((country, i) => {
            // Create a new dataset object for the current country
            let dataset = {
                label: country,
                data: [] as number[],
                fill: false,
                borderColor: colorsArray[i],
                tension: 0.1
            };
    
            // Iterate over each data point in dataArray
            dataArray.forEach(dataPoint => {
                // If the Country key matches the current country, add the Value to the data array
                if (dataPoint.Country === country) {
                    dataset.data.push(dataPoint.Value);
                }
            });
    
            // Add the constructed dataset to the datasets array
            datasets.push(dataset);
        });
    
        // Return the final array of datasets
        return datasets;
    };

    useEffect(() => {
        const years = generateYearsArray(year1, year2)
        const datasetsArray = generateDataSets(countries, data, colors)
        if (data && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Clean up old chart instance if it exists
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                }

                chartInstanceRef.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: years,
                        datasets: datasetsArray
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: 
                        {
                            title: {
                                display: true,
                                text: indicator
                              },
                            legend: {
                                position: 'top'
                            }
                        },
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'year'
                                },
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Value"
                                }
                            }
                        }
                    }
                });
            }
        }
    }, [data]);

    
    if (data === null) return <div><p>No data to show</p></div>

    return (
        <div className="max-w-[900px] w-[95%] min-h-[600px] max-h-[75%] pb-14">
            <canvas ref={chartRef}></canvas>
        </div>
    )
}

export default DataDisplay
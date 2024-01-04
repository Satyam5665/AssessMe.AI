"use client"
import React from 'react'
import BoxWrapper from '../../shared/BoxWrapper'
import { Box, Button, Typography,Paper  } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter } from 'next/navigation';
 
const Analytics = () => {
    const router = useRouter();
  
  const arr=[40+Math.floor(Math.random() * (70 - 40 + 1)) + 1,30+ Math.floor(Math.random() * (70 - 40 + 1)) + 1,40+Math.floor(Math.random() * (70 - 40 + 1)) + 1]
  return ( 

    <Box>
    <BoxWrapper title="Analytics">
        <Box>
        <Typography sx={{marginTop:'', marginBottom:'1rem' ,fontWeight:'400', fontSize:'1.3rem', textAlign:'center'}}>
        According to the Assessment <br/> The Rating has been generated
        </Typography>
        </Box> 
        <Box style={{display:"flex"}}>

        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: ['Concept Clarity', 'fluency', 'relevancy'],
              scaleType: 'band',
            },
          ]}
          yAxis={[
            {
              id: 'barValues',
              domain: [0, 100], // Set the y-axis domain from 0 to 100
              scaleType: 'linear',
              max: 100, // Set the maximum value for the y-axis
            },
          ]}
          series={[
            {
              data: arr,
              color: '#A08AD2',
            },
          ]}
          width={500}
          height={300}
        />
        <PieChart
          colors={['#A08AD2', '#BBA8E2', '#D0C1ED']}
          series={[
            {
              data: [
                { id: 0, value: arr[0], label: 'Concept Clarity' },
                { id: 1, value: arr[1], label: 'relevancy' },
                { id: 2, value: arr[2], label: 'Fluency' },
              ],
              highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 2,
              cornerRadius: 5,
              startAngle: 360,
              endAngle: 0,
              cx: 150,
              cy: 150,
            },
            
            
          ]}
          width={500}
          height={300}
        />
        </Box>
    </BoxWrapper>
    <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '2rem' }}>
          <Button
            sx={{
              padding: '1.1rem 1.5rem',
              borderRadius: '10px',
              color: 'white',
              background: 'linear-gradient(108deg, #654ea3 -0.23%, rgba(143, 192, 169, 0.00) 91.06%), #eaafc8',
              boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
            }}
            startIcon={<NavigateNextIcon />}
            onClick={() => router.push('/recommendation')}
          >
            Recommendation
          </Button>
        </Box>
    
          </Box>        
  )
}

export default Analytics;
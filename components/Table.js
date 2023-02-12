import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import supabase from '@/supabase';

export default function advertTable () {
const [dataRows, setDataRows] = useState([]);
const date = new Date().getTime();

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
      .from('advertisements')
      .select(`*`)
      setDataRows(data)
    }
    fetchAds()
  })

  // Create a single supabase client for interacting with your database
  // const supabase = createClient('https://ulefnqafgjbxykfehntu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZWZucWFmZ2pieHlrZmVobnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU4NDYwNTcsImV4cCI6MTk5MTQyMjA1N30.k3r7e4xsj_jeiS0FsbwFWxBe0WOtXRMsNT9igXJryz0')

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRows.map((row) => {
              let adStatus = "";
              const startDate = Date(row.start_date);
              const endDate = Date(row.end_date);

              if (date <= endDate && startDate <= date ) {
                adStatus = "active";
              } else {
                adStatus = "inactive";
              } 

              return (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.start_date}</TableCell>
                <TableCell align="right">{row.end_date}</TableCell>
                <TableCell align="right">{adStatus}</TableCell>
              </TableRow>
            )}
            
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
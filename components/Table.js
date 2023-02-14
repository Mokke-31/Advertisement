import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import supabase from '../config/supabaseClient';

export default function advertTable () {
  const [fetchError, setFetchError] = useState(null)
  const [dataRows, setDataRows] = useState([]);

  const date = new Date().getTime();

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
      .from('advertisements')
      .select(`*`)
      setDataRows(data)

      if (error) {
        setFetchError('Could not retrieve advertisement data')
        setDataRows([])
        console.log(error)
      }

    }
    fetchAds()
  })

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
              const startDate = new Date(row.start_date);
              const endDate = new Date(row.end_date);

              if (date <= endDate && startDate <= date) {
                adStatus = "active";
              } else {
                adStatus = "inactive";
                console.log(date <= endDate)
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
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
import {
  Avatar,
  Box,
  Button,
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState, useEffect  } from "react";
import io from 'socket.io-client';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function TopCreatorTable(props) {
  const { columnsData, tableData } = props;
  const [logs, setLogs] = useState([]);
    useEffect(() => {
    const socket = io('http://localhost:8000'); // Replace with your server URL

    socket.on('log_message', (msg) => {
      setLogs((prevLogs) => [...prevLogs, { time: getCurrentTime(), log: msg.logs }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
    const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  };
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify='space-between'
          w='100%'
          px='22px'
          pb='20px'
          mb='10px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.26)'>
          <Text color={textColor} fontSize='xl' fontWeight='600'>
            Alerts
            
          </Text>
          <Button variant='action'>See all</Button>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500'>
          

          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Name") {
                      data = (
                        <Flex align='center'>
                         
                          <Text
                            color={textColor}
                            fontSize='sm'
                            fontWeight='600'>
                            {cell.value[0]}
                          </Text>
                        </Flex>
                      );}
                    // } else if (cell.column.Header === "Artworks") {
                    //   data = (
                    //     <Text
                    //       color={textColorSecondary}
                    //       fontSize='sm'
                    //       fontWeight='500'>
                    //       {cell.value}
                    //     </Text>
                    //   );
                    // } else if (cell.column.Header === "Rating") {
                    //   data = (
                    //     <Box>
                    //       <Progress
                    //         variant='table'
                    //         colorScheme='brandScheme'
                    //         value={cell.value}
                    //       />
                    //     </Box>
                    //   );
                    // }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        <ul>
                        {logs.map((log, index) => (
                        <li key={index}>
                        <strong>{log.time}</strong>: {log.log}
                        </li>
                        ))}
                        </ul>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default TopCreatorTable;

import { useState, useEffect } from "react";
import io from 'socket.io-client';
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets

// Custom components

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdBarChart,

} from "react-icons/md";

import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChart from "variables/PieChart";

export default function UserReports() {
  // Chakra Color Mode
  const [logs, setLogs] = useState([]);
  const[mp,setMp]=useState({"Error":0,"half-install":0,'install':0,'authentication failure':0,'login':0,'incorrect password attempts':0});
  const [errno,setErrno]=useState(0)
  const [hfInst,sethfInst]=useState(0)
  const [inst,setInst]=useState(0)
  const [auth,setAuth]=useState(0)
  const [login,setlogin]=useState(0)
  const [passAtt,setPassAtt]=useState(0)
  const [total,setTotal]=useState(0)
  const stringCountsMap = new Map();
  useEffect(() => {
  const socket = io('http://localhost:8000'); // Replace with your server URL
  
  //analyze
  function analyzeLogsWithMap(logs) {

    if(logs.includes("Error"))
    {
      setErrno(errno+1);
    }
    else if(logs.includes("install"))
    {
      setInst(inst=>inst+1);
    }
    else if( logs.includes("half-install"))
    {
      sethfInst(hfInst=>hfInst+1);
    }
    else if( logs.includes("authentication"))
    {
      setAuth(auth=>auth+1);
    }
    else if( logs.includes("login"))
    {
      setlogin(login=>login+1);
    }
    else if( logs.includes("incorrect"))
    {
      setPassAtt(passAtt=>passAtt+1);
    }
    setTotal(total=>total+1)
    // Create a Map to store the counts of each predefined string
    
    // predefinedStrings.forEach(string => stringCountsMap.set(string, 0));
  
    // // Iterate through each log message
    
    //   predefinedStrings.forEach(string => {
    //     if (logs.includes(string)) {
    //       stringCountsMap.set(string, stringCountsMap.get(string) + 1);
    //     }
  
    // });
    // const threshold=3;
  
    // if(threshold<stringCountsMap.get('incorrect password attempts'))
    //     console.log("Alert !!!!!")
    // return stringCountsMap;
  }
  const predefinedStrings = ["Error", "half-install",'install','authentication failure','login','incorrect password attempts'];



  //////////
  socket.on('log_message', (msg) => {
    
    const stringCountsMap = analyzeLogsWithMap(msg.logs);
    console.log("inst"+inst)
    // setMp(stringCountsMap)
    
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
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Authentication Failure logs'
          value={auth}
        />
        <MiniStatistics
          // startContent={
          //   <IconBox
          //     w='56px'
          //     h='56px'
          //     bg={boxBg}
          //     icon={
          //       <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
          //     }
          //   />
          // }
          name='Alert logs'
          value={errno}
        />
        <MiniStatistics  name='Total logs' value={total}/>
        
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Installed Packages log'
          value={inst}
        />
        <MiniStatistics
          // startContent={
          //   <IconBox
          //     w='56px'
          //     h='56px'
          //     bg={boxBg}
          //     icon={
          //       <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
          //     }
          //   />
          // }
          name='Incorect Password Attempts'
          value={passAtt}
        />
        <MiniStatistics  name='Total Login Attempts' value={login}/>
        
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent total={total} />
        {/* <WeeklyRevenue /> */}
        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
        <PieChart errno={errno} inst={inst} auth={auth} login={login} passAtt={passAtt} total={total} chartOptions={{
         labels: ['Error logs', 'Install Pacakges logs', 'Auth logs', 'Login Attempt logs', 'Failed Password attempts logs','Total logs'],
          chart: {
            type: 'pie',
          },
        }} />
      </SimpleGrid>
      
      
    </Box>
  );
}
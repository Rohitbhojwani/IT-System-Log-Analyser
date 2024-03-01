
// Chakra imports
import { Box } from "@chakra-ui/react";

import {
  Flex,
  Grid 
} from "@chakra-ui/react";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import Card from "components/card/Card.js";

import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    // <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    //   <SimpleGrid
    //     mb='20px'
    //     columns={{ sm: 1, md: 2 }}
    //     spacing={{ base: "20px", xl: "20px" }}>
    //     <DevelopmentTable
    //       columnsData={columnsDataDevelopment}
    //       tableData={tableDataDevelopment}
    //     />
        
    //   </SimpleGrid>
    // </Box>
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
    {/* Main Fields */}
    <Grid
      mb='20px'
      // gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
      
      gap={{ base: "20px", xl: "20px" }}
      display={{ base: "block", xl: "grid" }}>
      
      <Flex
        flexDirection='column'
        gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "1 / 1 / 2 / 2" }}>
        <Card px='0px' mb='20px'>
          <TableTopCreators
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          />
        </Card>
        <Card p='0px'>
        </Card>
      </Flex>
    </Grid>
    {/* Delete Product */}
  </Box>
  );
}

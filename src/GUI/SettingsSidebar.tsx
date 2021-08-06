import React, { CSSProperties } from "react";
import { useStore } from "effector-react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ArrangeFigureSettings from "./Components/ArrangeFigureSettings";
import GridSettings from "./Components/GridViewSettings";
import StyleFigureSettings from "./Components/StyleFigureSettings";
import TextFigureSettings from "./Components/TextFigureSettings";
import { $selectedFigures } from "../models/diagrams/index";
import "react-tabs/style/react-tabs.css";
import "react-color-palette/lib/css/styles.css";

const TabsStyle: CSSProperties = {
  minWidth: "200px",
};

const SettingsSidebar = () => {
  const figures = useStore($selectedFigures);
  return figures.length > 0 ? (
    <>
      <Tabs style={TabsStyle}>
        <TabList>
          <Tab>Style</Tab>
          <Tab>Text</Tab>
          <Tab>Arrange</Tab>
        </TabList>

        <TabPanel>
          <StyleFigureSettings figures={figures} />
        </TabPanel>

        <TabPanel>
          <TextFigureSettings figures={figures} />
        </TabPanel>

        <TabPanel>
          <ArrangeFigureSettings figures={figures} />
        </TabPanel>
      </Tabs>
    </>
  ) : (
    <Tabs style={TabsStyle}>
      <TabList>
        <Tab>Diagram</Tab>
      </TabList>
      <TabPanel>
        <GridSettings />
      </TabPanel>
    </Tabs>
  );
};

export default SettingsSidebar;

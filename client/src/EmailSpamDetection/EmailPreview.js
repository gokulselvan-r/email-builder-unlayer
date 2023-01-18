import * as React from 'react';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import Mobile from './Preview/Mobie';
import Tablet from './Preview/Tablet';
import Desktop from './Preview/Desktop';

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    -webkit-animation: Gradient 15s ease infinite;
           animation: Gradient 15s ease infinite;
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    -webkit-animation: Gradient 15s ease infinite;
           animation: Gradient 15s ease infinite;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    -webkit-animation: Gradient 15s ease infinite;
           animation: Gradient 15s ease infinite;
    color: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    -webkit-animation: Gradient 15s ease infinite;
           animation: Gradient 15s ease infinite;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
  -webkit-animation: Gradient 15s ease infinite;
         animation: Gradient 15s ease infinite;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default class EmailPreview extends React.Component {

  render(){
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        <Tab>Mobile</Tab>
        <Tab>Tablet</Tab>
        <Tab>Desktop</Tab>
      </TabsList>
      <TabPanel value={0}>
          <Mobile template = {this.props.template}/>
      </TabPanel>
      <TabPanel value={1}>
          <Tablet  template = {this.props.template}/>
      </TabPanel>
      <TabPanel value={2}>
          <Desktop  template = {this.props.template}/>
      </TabPanel>
    </TabsUnstyled>
  );
}}
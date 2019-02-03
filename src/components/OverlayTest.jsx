import React,{Component} from 'react';
import {Popover, Button, OverlayTrigger} from 'react-bootstrap';

const popover = (
  <Popover id='popover-basic' title='Popover right' style={{backgroundColor:'#333'}}>
    <a href='www.patriotpup.us' target='_blank'>A link goes here</a>
  </Popover>
);

const Example = () =>(
  <OverlayTrigger trigger='click' placement='right' overlay={popover}>
    <Button style={{marginLeft:100}} variant='success'>Click it</Button>
  </OverlayTrigger>
);

export default Example;

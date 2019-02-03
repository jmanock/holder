import React,{Component} from 'react';
import EventCalendar from './Components/Calendar';
import moment from 'moment';
import {Container, Row, Col, Button, ButtonToolbar, Popover, Overlay, Modal} from 'react-bootstrap';
import TestData from './Components/TestData';

class CalendarTest extends Component{
  state = {
    moment:moment(),
    showPopover:false,
    showModal:false,
    overlayTitle:null,
    overlayContent:null,
    popoverTarget:null,
  };

  handleNextMonth = () =>{
    this.setState({
      moment:this.state.moment.add(1,'M')
    });
  }

  handlePreviousMonth = () =>{
    this.setState({
      moment:this.state.moment.subtract(1,'M')
    });
  }

  handleToday = () =>{
    this.setState({
      moment:moment()
    });
  }

  handleEventClick =(target, eventData, day)=>{
    this.setState({
      showPopover:false,
      showModal:true,
      overlayTitle:eventData.title,
      overlayContent:eventData.description
    });

  }

  getMomentFromDay(day){
    return moment().set({
      'year':day.year,
      'month':(day.month+0)%12,
      'day':day.day
    });
  }

  handleModalClose = () =>{
    this.setState({
      showModal:false
    });
  }

  getHumanDate(){
    return [moment.months('MM', this.state.moment.month()), this.state.moment.year()].join(' ');
  }

  render(){
    return(
      <div>
        <Overlay show={this.state.showPopover} onHide={() => this.setState({showPopover:false})} placement="top"  target={this.state.popoverTarget}>
          <Popover id="event" title='Popover top'>{this.state.overlayTitle}</Popover>
        </Overlay>
        <Modal show={this.state.showModal} onHide={this.handleModalClose} style={{backgroundColor:'red', position:'absolute',top:'50%',zIndex:10, marginLeft:30, marginRight:30}}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.overlayTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.overlayContent}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row>
            <Col xs={6}>
              <ButtonToolbar>
                <Button onClick={this.handlePreviousMonth}>&lt;</Button>
                <Button onClick={this.handleNextMonth}>&gt;</Button>
                <Button onClick={this.handleToday}>Today</Button>
              </ButtonToolbar>
            </Col>
            <Col xs={6}>
              <div className='pull-right h1'>{this.getHumanDate()}</div>
              <h1>{this.getHumanDate()}</h1>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col xs={12}>
              <EventCalendar month={this.state.moment.month()}  year={this.state.moment.year()} events={TestData.getEvents()} onEventClick={this.handleEventClick} maxEventSlots={10} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CalendarTest;

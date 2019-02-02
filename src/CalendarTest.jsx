import React,{Component} from 'react';
import EventCalendar from './Main';
import moment from 'moment';
import {  Row, Col, Button, ButtonToolbar, Overlay, Popover, Modal, Container} from 'react-bootstrap';
import TestData from './TestData';

class CalendarTest extends Component{
  state = {
    moment:moment(),
    showPopover:false,
    showModal:false,
    overlayTitle:null,
    overlayContent:null,
    popoverTarget:null
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

  handleEventClick = (target, eventData, day) =>{
    console.log('Anything here???')
    // this.setState({
    //   showPopover:false,
    //   showModal:true,
    //   overlayTitle:eventData.title,
    //   overlayContent:eventData.description
    // });
  }

  handleDayClick = (target,day) =>{
    console.log('what about here?')
    this.setState({
      showPopover:false,
      showModal:true,
      overlayTitle:this.getMomentFromDay(day).format('Do of MMMM YYYY'),
      overlayCOntent:'Something should be going on here and also this should be something that does work I feel like I am so fucking close to finishing this'
    });
  }

  getMomentFromDay(day){
    return moment().set({
      'year':day.year,
      'month':(day.month+0)%12,
      'date':day.day
    });
  }

  handleModalClose = () =>{
    this.setState({
      showModal:false
    });
  }

  getHumanDate(){
    return [moment.months('MM', this.state.moment.month()), this.state.moment.year(),].join(' ');
  }

  render(){
    const styles = {
      position:'relative'
    };

    return(
      <div style={styles}>
        <Overlay show={this.state.showPopover} rootClose onHide = {()=>this.setState({showPopover:false})} placement='top' container={this} target={this.state.popoverTarget}>
          <Popover id='event'>{this.state.overlayTitle}</Popover>
        </Overlay>

        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
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
              <div className='pull-right h2'>{this.getHumanDate()}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <EventCalendar month={this.state.moment.month()} year={this.state.moment.year()} events={TestData.getEvents()} onEventClick={this.handleEventClick} maxEventSlots={10} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CalendarTest;

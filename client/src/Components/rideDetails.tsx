import React from 'react'
import axios from 'axios';

type rideDetails = {
    id:number,
    name:string,
    car:string,
    seatsLeft:number,
    pickUp:string,
    destination:string,
    rerenderParentCallback:any,
}
type MyState={
    bookButton:boolean,
    cancelButton:boolean,
    bookedId:number,
    message:string,
    name:string,
    car:string,
    pickUp:string,
    seatsLeft:number,
    destination:string
}

class RideDetails extends React.Component<rideDetails,MyState>{


    constructor(props:rideDetails){
        super(props)

        this.state={
            bookButton:true,
            cancelButton:false,
            bookedId:0,
            message:'',
            name:this.props.name,
            car:this.props.car,
            pickUp:this.props.pickUp,
            seatsLeft:this.props.seatsLeft,
            destination:this.props.destination          
        }
    }

    componentDidUpdate(prevProps:any) {
        if(prevProps.name !== this.props.name) {
          this.setState({bookButton:true,cancelButton:false,message:'',name:this.props.name,car:this.props.car,pickUp:this.props.pickUp,seatsLeft:this.props.seatsLeft,destination:this.props.destination});
        }
      }

    bookRide=()=>{


        const bookedRide={
            rider:{
                name:this.state.name,
                pickUp:this.state.pickUp,
                destination:this.state.destination,
                seatsLeft:this.state.seatsLeft
            },
            ridee:'admin',

        }
        if(this.state.seatsLeft==0){
            this.setState({message:'  Sorry,No seats available'})            
        }
        else{
            axios.post("http://localhost:5000/book_ride",bookedRide)
        .then(res=>{
            console.log("response is ",res)
            if(res.status===200){
                this.setState({bookedId:res.data.id,cancelButton:true,bookButton:false,seatsLeft:this.state.seatsLeft-1})
                this.props.rerenderParentCallback()
            }
        })
        }

    }

    cancelRide=()=>{
        const cancelRide={
            rideId:this.state.bookedId,
            name:this.state.name
        }
        axios.post("http://localhost:5000/cancel_ride",cancelRide)
        .then(res=>{
            console.log("response is ",res)
            if(res.status===200){
                this.setState({bookedId:0,cancelButton:false,bookButton:true,message:'Ride Cancelled',seatsLeft:this.state.seatsLeft+1})
                this.props.rerenderParentCallback()
            }
        })
    }

    render(){

        return(
            <React.Fragment>
                <div className="row border row  d-flex justify-content-center " style={{paddingBottom:'5%'}}>
                    <table  className='table table-bordered table-sm'  >
                        <caption className="bg-primary text-white text-center" style={{captionSide:'top'}}><b>Ride Details</b></caption>
                        <thead className="thead-light" >
                            <tr className="text-white text-center ">
                                <th>Name</th>
                                <th>Start Point</th>
                                <th>End Point</th>
                                <th>Car</th>
                                <th>Seats Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.name}</td>
                                <td>{this.state.pickUp}</td>
                                <td>{this.state.destination}</td>
                                <td>{this.state.car}</td>
                                <td>{this.state.seatsLeft}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {this.state.bookButton &&<button className="btn btn-primary text-center" onClick={()=>this.setState({},()=>{this.bookRide()})}>Book Ride</button>}
                    {this.state.message==='  Sorry,No seats available' && <p><b>{this.state.message}</b></p>}
                    {this.state.cancelButton && <p><b>Ride Booked . Id is {this.state.bookedId}</b></p>}
                    {this.state.cancelButton &&<button className="btn btn-danger text-center" onClick={()=>this.setState({},()=>{this.cancelRide()})}>Cancel Ride</button>}
                    <br />
                </div><br />

                
            </React.Fragment>
        )
    }

}

export default RideDetails;
import React from 'react';
import { BrowserRouter as Router, Route, Link,} from 'react-router-dom';
import { History, LocationState } from 'history';
import axios from 'axios';
import RideDetails from './rideDetails'

type MyState ={

    jumbo:boolean
    showAllRides:boolean,
    toInfy:boolean,
    fromInfy:boolean,
    otherRides:boolean,
    offerRides:boolean,
    rides:offerRide[]
    details:boolean,
    detailRide:offerRide,

}

type offerRide = {
    id:number,
    name:string,
    car:string,
    seatsLeft:number,
    pickUp:string,
    destination:string,
}

type bookingRide = {
    rideId:number,
    riderName:string,
    rideeName:string,
    pickUp:string,
    destination:string,
    status:string
}

type Props = {
    history: History<LocationState>
}

class ShowRide extends React.Component<Props, MyState> {

    constructor(props:any){
        super(props)
        this.state={
            jumbo:true,
            showAllRides:false,
            toInfy:false,
            fromInfy:false,
            otherRides:false,
            offerRides:false,
            rides:[],
            details:false,
            detailRide:{id:0,name:'',car:'',pickUp:'',seatsLeft:0,destination:''},
        }
        this.handleChange = this.handleChange.bind(this)
    }

    rerenderParentCallback=()=> {
        this.handleChange()
      }

    handleChange=()=>{
        
        if(this.state.showAllRides){
            axios.get("http://localhost:5000/show_rides")
            .then(res=>{
                console.log("All Rides fetched : ",res.data);
                this.setState({rides:res.data})
                })
        }

        else if(this.state.toInfy){        
            axios.get("http://localhost:5000/show_rides")
            .then(result=>{
                let res:offerRide[]=result.data
                res=res.filter(output=>{
                    if(output.destination==="Infosys"){
                        return output
                    }
                })
                console.log("Rides to Infosys fetched : ",res);
                this.setState({rides:res})
            })
        }

        else if(this.state.fromInfy){        
            axios.get("http://localhost:5000/show_rides")
            .then(result=>{
                let res:offerRide[]=result.data
                res=res.filter(output=>{
                    if(output.pickUp==="Infosys"){
                        return output
                    }
                })
                console.log("Rides from Infosys fetched : ",res);
                this.setState({rides:res})
            })
        }

        else if(this.state.otherRides){        
            axios.get("http://localhost:5000/show_rides")
            .then(result=>{
                let res:offerRide[]=result.data
                res=res.filter(output=>{
                    if(output.pickUp!=="Infosys" && output.destination!=="Infosys"){
                        return output
                    }
                })
                console.log("Other Rides fetched : ",res);
                this.setState({rides:res})
            })
        }

    }

    render() {

        var newObject={...this.state.detailRide,rerenderParentCallback:this.rerenderParentCallback}

        if(this.state.jumbo){
            return (
                <React.Fragment>
                    <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">PoolCarz</a>
                <ul className="navbar-nav ml-auto " style={{marginRight:"50px"}}>
                    <li className="nav-item">
                    <Link to="/show_rides" className="nav-link text-white">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white"  to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
                       
                      </div>

                    <div className="container-fluid">
                    <div className="col-md-6 offset-md-3">
                        <div className="jumbotron" style={{marginTop:'5%',backgroundColor:'white',border:'1px solid black'}}>
                                <div className="row bg-primary text-white" style={{padding:'5px 0px 0px 5px'}}>
                                <caption className="bg-primary text-white text-center" style={{captionSide:'top',padding:'1%'}}><b>Book a Ride</b></caption>
                                </div>
                                <div className="row">
                                    <p>PoolCarz is an online application which enables users to share rides with others .
                                        You can either book a ride or offer a ride .Did we mention that this app is advertisement free?
                                         To add on top of that its free of cost ! So what are you waiting for ? Check out the 
                                         rides available and start PCing !!
                                    </p>
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={()=>this.setState({jumbo:false,showAllRides:true,offerRides:false},()=>{this.handleChange()})}>Show all Rides</button>
                                </div><br />
                                <div className="row d-flex justify-content-center">
                                    <Link to="/offer_ride"><button className="btn btn-primary" onClick={()=>this.setState({jumbo:false,showAllRides:false,offerRides:true})} >Offer a Ride</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </React.Fragment>
            )
        }
        else if(this.state.showAllRides ||this.state.toInfy ||this.state.fromInfy || this.state.otherRides){
            return (
                <React.Fragment>
                    <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">PoolCarz</a>
                <ul className="navbar-nav ml-auto " style={{marginRight:"50px"}}>
                    <li className="nav-item">
                        <Link to="/show_rides" className="nav-link text-white">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white"  to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
                       
                      </div>
                    <div className="container-fluid">
                    <div className="col-md-6 offset-md-3">
                        <div className=" jumbotron bg-white" style={{marginTop:'5%'}}>
                                <div className="row bg-primary text-white" style={{padding:'5px 0px 0px 5px'}}>
                                <caption className="bg-primary text-white text-center" style={{captionSide:'top',padding:'1%'}}><b>Book a Ride</b></caption>
                                </div>
                                <div className="row">
                                    <p>PoolCarz is an online application which enables users to share rides with others .
                                        You can either book a ride or offer a ride .Did we mention that this app is advertisement free?
                                         To add on top of that its free of cost ! So what are you waiting for ? Check out the 
                                         rides available and start PCing !!
                                    </p>
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={()=>this.setState({showAllRides:true,toInfy:false,fromInfy:false,otherRides:false,details:false},()=>{this.handleChange()})}>Show all Rides</button>&nbsp;&nbsp;
                                    <button className="btn btn-primary" onClick={()=>this.setState({showAllRides:false,toInfy:true,fromInfy:false,otherRides:false,details:false},()=>{this.handleChange()})}>To Infosys</button>&nbsp;&nbsp;
                                    <button className="btn btn-primary" onClick={()=>this.setState({showAllRides:false,toInfy:false,fromInfy:true,otherRides:false,details:false},()=>{this.handleChange()})}>From Infosys</button>&nbsp;&nbsp;
                                    <button className="btn btn-primary" onClick={()=>this.setState({showAllRides:false,toInfy:false,fromInfy:false,otherRides:true,details:false},()=>{this.handleChange()})}>Others</button>
                                </div><br /><br />

                                <div className="row  d-flex justify-content-center">
                                <table  className='table table-bordered table-sm'>
                                <thead className="bg-primary">
                                    <tr className="text-white text-center ">
                                        <th>Start Point</th>
                                        <th>End Point</th>
                                        <th>Seats Available</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.rides.map((ride: offerRide, index) => {
                                        return (
                                        <tr key={index} className="text-center" onClick={()=>{this.setState({details:true,detailRide:ride})}} >
                                            <td>{ride.pickUp}</td>
                                            <td>{ride.destination}</td>
                                            <td className=" d-flex justify-content-centre">{ride.seatsLeft}</td>
                                        </tr>) 
                                        })
                                   }
                                </tbody>
                                </table>
                                <br /><br />
                                
                                </div>
                                {this.state.details && <RideDetails  {...newObject}  />}
                                


                                <div className="row d-flex justify-content-center">
                                    <Link to="/offer_ride"><button className="btn btn-primary" onClick={()=>this.setState({jumbo:false,showAllRides:false,offerRides:true})} >Offer a Ride</button></Link>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                    
            </React.Fragment>
            )
        }
    }
}
export default ShowRide;

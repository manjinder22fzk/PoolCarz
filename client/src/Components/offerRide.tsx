import React,{FormEvent} from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link,} from 'react-router-dom';
import { History, LocationState } from 'history';



type MyState = {
    id:number,
    name:string,
    pickUp:string,
    destination:string,
    car:string,
    seatsLeft:number,
    message:string,
    nameMessage:string,
    pickUpMessage:string,
    destinationMessage:string,
    carMessage:string,
    seatsMessage:string,
    valid:boolean,
}

type Props = {
    history: History<LocationState>
}

class OfferRide extends React.Component<Props,MyState>{

    constructor(props:any){
        super(props);
        this.state={
            id:0,
            name:'',
            pickUp:'',
            destination:'',
            car:'',
            seatsLeft:-1,
            message:'',
            nameMessage:'',
            pickUpMessage:'',
            destinationMessage:'',
            carMessage:'',
            seatsMessage:'',
            valid:false
        }    
    }


    handleChange = (event: FormEvent<HTMLInputElement>)=>{
        const value = (event.target as HTMLInputElement).value;
        const field = (event.target as HTMLInputElement).name;
        this.setState({...this.state,[field]:value,message:'',nameMessage:'',pickUpMessage:'',destinationMessage:'',carMessage:'',seatsMessage:'',valid:false},()=>{  
            if(this.state.name===''){
                this.setState({nameMessage:"Name is required",valid:false})
            }
            else if(this.state.pickUp===''){
                this.setState({pickUpMessage:"PickUp is required",valid:false})
            }
            else if(this.state.destination===''){
                this.setState({destinationMessage:"Destination is required",valid:false})
            }
            else if(this.state.car===''){
                this.setState({carMessage:"Car is required",valid:false})
            }
            else if(this.state.seatsLeft===-1){
                this.setState({seatsMessage:"Please enter the seats Available ",valid:false})
            }
            else if(this.state.seatsLeft<0 ||this.state.seatsLeft>8){
                this.setState({seatsMessage:"Available seats should be between 0 and 8 ",valid:false})
            }
            else{
                this.setState({nameMessage:'',pickUpMessage:'',destinationMessage:'',carMessage:'',seatsMessage:'',valid:true})
            }
        })
        
    }

    handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const booking={
            id:1,
            name:this.state.name,
            pickUp:this.state.pickUp,
            destination:this.state.destination,
            car:this.state.car,
            seatsLeft:this.state.seatsLeft
        }
        axios.post("http://localhost:5000/offer_ride",booking)
        .then((result)=>{
            console.log(result);
            if(result.data.status===200){
                this.setState({message:"Added Successfully"})
                this.setState({id:0,name:'',pickUp:'',destination:'',car:'',seatsLeft:0,valid:false})
            }
        })
        .catch((error)=>console.log(error))
    }

    render(){
        return (
            <React.Fragment>

                

<div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand">PoolCarz</a>
                <ul className="navbar-nav ml-auto " style={{marginRight:"50px"}}>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/show_rides">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white"  to="/show_rides">Back to Rides</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white"  to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
                       
                      </div>

                <div className="container-fluid">
                    <div className="col-md-4 offset-md-4">
                        <div className="jumbotron" style={{marginTop:'5%',backgroundColor:'white',border:'1px solid black'}}>
                            <div className="row bg-primary text-white" style={{padding:'5px 0px 0px 5px'}}>
                                <caption className="bg-primary text-white text-center" style={{captionSide:'top',padding:'1%'}}><b>Car Ride Registration Form</b></caption>
                            </div><br />

                            <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>

                                <div className="form-group">
                                    <label>Name:</label>
                                    <input style={{width:'100%'}} className="form-control" name="name" type="text" onChange={this.handleChange} />
                               </div>
                               {this.state.nameMessage !== '' && <div className={`text text-danger`}>{this.state.nameMessage}</div>}<br />

                               <div className="form-group">
                                   <label>Start Location:</label>
                                   <input style={{width:'100%'}} className="form-control" name="pickUp" type="text" onChange={this.handleChange} />
                               </div>
                               {this.state.pickUpMessage !== '' && <div className={`text text-danger`}>{this.state.pickUpMessage}</div>}<br />

                               <div className="form-group">
                                   <label>Destination:</label>
                                   <input style={{width:'100%'}} className="form-control" name="destination" type="text" onChange={this.handleChange} />
                               </div>
                               {this.state.destinationMessage !== '' && <div className={`text text-danger`}>{this.state.destinationMessage}</div>}<br />

                               <div className="form-group">
                                   <label>Car:</label>
                                   <input style={{width:'100%'}} className="form-control" name="car" type="text" onChange={this.handleChange} />
                                </div>
                                {this.state.carMessage !== '' && <div className={`text text-danger`}>{this.state.carMessage}</div>}<br />

                                <div className="form-group">
                                    <label>Seats Available:</label>
                                    <input style={{width:'100%'}} className="form-control" name="seatsLeft" type="text" onChange={this.handleChange} />
                                </div>
                                {this.state.seatsMessage !== '' && <div className={`text text-danger`}>{this.state.seatsMessage}</div>}<br />

                                <button type="submit" className="btn btn-success" disabled={!this.state.valid}>Submit</button><br />
                                {this.state.message !== '' && <div className={`text text-success`}>{this.state.message}</div>}<br />

                            </form>
                        </div>
                    </div>
               </div>  
                          
            </React.Fragment>
        )
    }
} 
    

export default OfferRide ;
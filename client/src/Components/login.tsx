import React,{FormEvent} from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link,} from 'react-router-dom';
import { History, LocationState } from 'history';



type MyState = {
    userName:string,
    password:string,
    usernameMessage:string,
    passwordMessage:string,
    loggedIn:Boolean
}

// type Props = {
//     history: History<LocationState>
// }

class Login extends React.Component<any,MyState>{

    constructor(props:any){
        super(props);
        this.state={
            userName:'',
            password:'',
            usernameMessage:'',
            passwordMessage:'',
            loggedIn:false
        }    
    }


    handleChange = (event: FormEvent<HTMLInputElement>)=>{
        const value = (event.target as HTMLInputElement).value;
        const field = (event.target as HTMLInputElement).name;
        this.setState({...this.state,[field]:value},()=>{  

            if(this.state.userName===''){
                this.setState({usernameMessage:"Username is required"})
            }
            else if(this.state.password===''){
                this.setState({passwordMessage:"Password is required"})
            }
            else{
                this.setState({passwordMessage:'',usernameMessage:''})
            }
        })
        
    }

    handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const credentials={
            userName:this.state.userName,
            password:this.state.password
        }
        axios.post("http://localhost:5000/login",credentials)
        .then((result)=>{
            console.log(result);
            if(result.data.status===200){
                this.setState({loggedIn:true})
                this.props.history.replace('/show_rides/');
            }
        })
        .catch((error)=>console.log(error))
    }

    logOut = (value: Boolean) => {
        this.setState({ loggedIn: value });
    };

    render(){
        let propsObject={loggedIn:this.state.loggedIn,update:this.logOut}
        return (
            <React.Fragment>
                
                <br/>
                <div className="container-fluid">
                    <div className="col-md-3 offset-md-4">
                    <div className="jumbotron" style={{marginTop:'5%',backgroundColor:'white',border:'1px solid black'}}>
                    <div className="row bg-primary text-white" style={{padding:'5px 0px 0px 5px'}}>
                        <caption className="bg-primary text-white text-center" style={{captionSide:'top',padding:'1%'}}><b>Login</b></caption>
                    </div><br />
                        <form onSubmit={(event: FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
                            
                            <div className="form-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ">
                                <label><b>Username</b></label>
                                <input style={{width:'100%'}} className="form-control" name="userName" type="text" onChange={this.handleChange} />
                            </div>
                            {this.state.usernameMessage !== '' && <div className={`text text-danger`}>{this.state.usernameMessage}</div>}<br />

                            <div className="form-group">
                                <label><b>Password</b></label>
                                <input style={{width:'100%'}} className="form-control" name="password" type="password" onChange={this.handleChange} />
                            </div>
                            {this.state.passwordMessage !== '' && <div className={`text text-danger`}>{this.state.passwordMessage}</div>}<br />

                           <button type="submit" className="btn btn-success" >Login</button>

                        </form>
                    </div>
                    </div>
                </div>
                
            </React.Fragment>
        )
    }
} 
    

export default Login ;
import React,{Component} from 'react'

class Register extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
       this.onChange = this.onChange.bind(this); 
       this.onSubmit = this.onSubmit.bind(this); 
    }

  onChange(e){
      this.setState({[e.target.name]:e.target.value});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log("New User.......",newUser);
    //this.props.registerUser(newUser, this.props.history);
  }
  render(){
    return(
        <div className="register">
            <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">
                            Create your DevConnector account
                        </p>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                className= "form-control form-control-xs"
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                />
                            </div>
                        <div className="form-group">

                            <input
                            placeholder="Email"
                            className= "form-control form-control-xs"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            />
                        </div>    
                        <div className="form-group">
                
                            <input
                            placeholder="Password"
                            className= "form-control form-control-xs"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            />
                        </div>    
                        <div className="form-group">
                            <input
                            placeholder="Confirm Password"
                            className= "form-control form-control-xs"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            />
                        </div>    
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Register
var PersonalSetting = React.createClass({
	getInitialState: function(){
		return {
			email:"",
			userName:"",
		}
	},
	render: function(){
		return (
			<div className="PI-block">
				<div className="page-title">
					<h1>Personal Information</h1>
					<div className="filter-block edit">
						<a href="">Edit</a>
					</div>
					</div>
					<form>
					<div className="f1"><label>Name</label><p>{this.props.userCredentials.username}</p></div>
					<div className="f2"><label>Email</label><p>{this.props.userCredentials.emailId}</p></div>
				</form>
			</div>
		);
	},
	_onClick: function(){
		console.log(this.state.userName);
		console.log(this.state.email);
	},
	_onChange: function(){
		if(event.target.name == "userName"){
			this.setState({
				userName:event.target.value
			})
		}
		else if(event.target.name == "email"){
			this.setState({
				email:event.target.value
			})
		}
	}
}); 
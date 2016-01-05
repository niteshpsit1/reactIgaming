var PasswordSetting = React.createClass({
	getInitialState: function(){
		return {
			confirnPassword:"",
			password:"",
			oldPassword:""
		}
	},
	render: function(){
		return (
			<div className="pwd-block">
				<div className="page-title">
					<h1>Password Settings</h1>
				</div>
				<form>
					<div className="f1"><label>Old Password</label><input type="password" name="oldPassword" className="form-control" onChange={this._onChange}/></div>
					<div className="f2"><label>New Password</label><input type="password" name="password" className="form-control" onChange={this._onChange}/></div>
					<div className="f3"><label>Confirm Password</label><input type="password" name="confirnPassword" className="form-control" onChange={this._onChange}/></div>
					<div className="button-block">
						<button type="button" onClick={this._onClick}>Change Password</button>
					</div>
				</form>
			</div>
		);
	},
	_onChange: function (event){
		if(event.target.name == "password"){
			this.setState({
				password:event.target.value
			})
		}
		else if(event.target.name == "oldPassword"){
			this.setState({
				oldPassword:event.target.value
			})
		}
		else if(event.target.name == "confirnPassword"){
			this.setState({
				confirnPassword:event.target.value
			})
		}
	},
	_onClick: function(){
		
	}
}); 
var SettingComponent = React.createClass({
	render: function(){
		return (
			<div className="content setting-content">
				<PasswordSetting token={this.props.token} userCredentials={this.props.userCredentials}/>
				<PersonalSetting token={this.props.token} userCredentials={this.props.userCredentials}/>
			</div>
		);
	}
});
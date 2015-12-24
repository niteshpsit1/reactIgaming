var AboutUs = React.createClass({
	getInitialState: function (){
		return {
			aboutUsMessage:"ram",
			edit:false
		}
	},
	componentWillMount: function () {
		var currentThis = this;
		var requestData = {
			token: this.props.token
		};
		services.POST(config.url.getAllClub, requestData)
		.then(function(data){
			currentThis.setState({
				//aboutUsMessage:data.response.message
			});
		})
		.catch(function(error){
			console.log("====catch",error);	
		});	
	},
	render: function(){
		return (
			<div>
				{	!this.state.edit	&&
					<div>
					<button type="button" name="edit" class="btn btn-primary" onClick={this._onClick}>EDIT</button>
					<p>{this.state.aboutUsMessage}</p>
					</div>}

				{	this.state.edit	&&
					<div>
					<textarea rows="10" cols="15" name="aboutUsMessage" onChange={this._onChange} value={this.state.aboutUsMessage}></textarea>
					<button type="button" name="change" class="btn btn-danger" onClick={this._onClick}>CHANGE</button>
					</div>}
			
			</div>
		);
	},
	_onChange: function(event){
		this.setState({
			aboutUsMessage:event.target.value
		})
	},
	_onClick: function(event){
		if($(event.target).attr("name") == "edit"){
			this.setState({
				edit:true
			})
		}
		else if($(event.target).attr("name") == "change"){
			this.setState({
				edit:false
			})
		}
	}
});
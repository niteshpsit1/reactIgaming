var AboutUs = React.createClass({
	getInitialState: function() {
			return {
				description:"",
				descriptionEdit: false
			};
	},
	componentWillMount: function(){
		this.setState({
			description: this.props.description
		});
	},
	render: function(){
		return (
			<div>
				{ !this.state.descriptionEdit &&
					<div>
					<button onClick={this._onClick}><div name="edit">EDIT</div></button>
					<div><p><b>Description:</b>{this.state.description}</p></div>
					</div>}
				{ this.state.descriptionEdit &&
					<div>
					<textarea rows="4" cols="50" value={this.state.description} onChange={this._onChange}></textarea><br/>
					<button onClick={this._onClick}><div name="submit">SUBMIT</div></button>
					</div>}
			</div>
		);
	},
	_onClick: function(){
		if($(event.target).attr("name") == "edit"){
			this.setState({
				descriptionEdit: true
			});
		}
		else if($(event.target).attr("name") == "submit")
		{
			this.setState({
				description:this.state.description,
				descriptionEdit: false
			});
		}
	},
	_onChange: function(event){
		this.setState({
			description: event.target.value
		});
	}

});
var postCall = function (url, data){
	
	return new RSVP.Promise(function(fulfill, reject) {
		$.ajax({
	        url: url,
	        method: 'POST',
	        data: $.param({"options":data}),
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        success: function (data, textStatus, jqXHR) {
	        	
	            if( textStatus == "success") {
	            	console.log("service in");
	            	console.log(JSON.parse(jqXHR.responseText).response.result);
	            	fulfill(JSON.parse(jqXHR.responseText).response.result);    
	            }
	      		else {
	      			reject('error');
	    		}
	        }
		});
	});
};
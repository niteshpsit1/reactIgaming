var TermAndConditions = React.createClass({
	getInitialState: function (){
		return {
			termAndConditionMessage:"ram",
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
			setTimeout(function() {
				currentThis.setState({
					//termAndConditionMessage:data.response.message
				})	
			}, 0);
			setTimeout(function() {
				$('#termAndConditionMessage').html((JSON.stringify(currentThis.state.termAndConditionMessage)).replace(/^\s+|\s+$/g, ''));
			}, 0);
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
					<div id="termAndConditionMessage"></div>
					</div>}

				{	this.state.edit	&&
					<div>
					<textarea rows="10" cols="15" name="termAndConditionMessage"  value={this.state.termAndConditionMessage}></textarea>
					<button type="button" name="change" class="btn btn-danger" onClick={this._onClick}>CHANGE</button>
					</div>}
			
			</div>
		);
	},
	_onClick: function(event){
		var currentThis = this;
		if($(event.target).attr("name") == "edit"){
			setTimeout(function() {
				currentThis.setState({
					edit:true
				})	
			}, 0);
			setTimeout(function() {
				CKEDITOR.replace( 'termAndConditionMessage' )
			}, 0);	
		}
		else if($(event.target).attr("name") == "change"){
			setTimeout(function() {
				currentThis.setState({
					termAndConditionMessage:CKEDITOR.instances.termAndConditionMessage.getData(),
					edit:false
				})	
			}, 0);
			setTimeout(function() {
				$('#termAndConditionMessage').html(JSON.stringify(currentThis.state.termAndConditionMessage).replace(/(\r\n|\n|\r)/gm," "));
			}, 0);
		}
	}
});
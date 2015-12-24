var PersonalSetting = React.createClass({
	render: function(){
		return (
			<div>
			<div className="form-group">
				<label>Name:</label>
				<input type="text" className="form-control" id="usr"/>
			</div>
			<div className="form-group">
				<label>Email:</label>
				<input type="password" className="form-control" id="pwd"/>
			</div>
			</div>
		);
	}
}); 
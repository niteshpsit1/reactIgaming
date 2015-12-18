var ClubRidesList = React.createClass({

	render: function () {

		return (
			<div>Rides List
			<span>this.props.rideName</span>
			<span>this.props.description</span>
			<span>this.props.startDate</span>
			<span>this.props.startTime</span>
			<span>this.props.members</span>
			</div>
		);
	}
});
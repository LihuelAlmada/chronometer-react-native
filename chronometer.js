import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';

class Chronometer extends Component {
	constructor(props){
		super(props)
		this.state = {
			active: false,
			hours: 0,
			minutes: 59,
			secons: 0,
			laps: []
		}
		this.timeChronometer	= this.timeChronometer.bind(this);
    this.startChronometer = this.startChronometer.bind(this);
    this.stopChronometer = this.stopChronometer.bind(this);
		//TODO: add newLap
		//this.newLap = this.newLap.bind(this);
		this.closeChronometer = this.closeChronometer.bind(this);
	}

	startChronometer(){
		if(!this.state.active){
			this.setState({clock: setInterval(this.timeChronometer, 1000)});
			this.setState({active: true})
		}
	}

	timeChronometer(){
		let h = this.state.hours;
		let m = this.state.minutes;
		let s = this.state.secons;
		//TODO: miliseg
		if(s<59){
			s++;
		} else {
			s = 0;
			if(m < 59){
				m++
			}else{
				m=0;
				h++
			}
		}
		this.setState({secons: s, minutes: m, hours: h})
	}

	stopChronometer(){
		if (this.state.active){
			clearInterval(this.state.clock)
			this.setState({active: false});
		}
	}
	/*
	newLap(){
		let txtDoChronometer = this.format(this.state.hours) + 
			":" + this.format(this.state.minutos) + 
			":" + this.format(this.state.secons) + "\n"	

		this.state.laps.push(txtDoChronometer)
		this.forceUpdate();
	}
	format(t){
		return (t<10) ? "0"+t.toString() : t.toString();
	}
	*/
	closeChronometer(){
		this.stopChronometer();
		this.setState({secons: 0, minutes: 0, hours: 0});

		// if(this.state.laps.length>0){
		// 	this.state.laps.push(' ------ \n');
		// }
	}
	render(){
		// {
		// 	let txtH = this.format(this.state.hours);
		// 	let txtM = this.format(this.state.minutes);
		// 	let txtS = this.format(this.state.secons);
		// }
		return(
			<ScrollView>
				<View style={styles.container}>
					<Text>Chronometer</Text>
					<Text>{this.state.hours}:{this.state.minutes}:{this.state.secons}</Text>
				</View>
				<View>
					<Button 
						onPress={(this.state.active ? this.stopChronometer : this.startChronometer)}
						title={(this.state.active ? "Stop Chronometer" : "Start Chronometer")}
					/>
					{/* <Button 
						onPress={this.newLap}
						title="New Lap"
					/> */}
					<Button 
						onPress={this.closeChronometer}
						title="Close Chronometer"
					/>
				</View>
				<View>
					<Text>
						{this.state.laps}
					</Text>
				</View>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default Chronometer;
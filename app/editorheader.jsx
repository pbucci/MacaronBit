
import React from 'react';
import Reflux from 'reflux';

var AnimationStore = require('./stores/animationstore.js');
var StudyStore = require('./stores/studystore.js');
var SaveLoadStore = require('./stores/saveloadstore.js');
var LogStore = require('./stores/logstore.js');

var IO = require('./../thirdparty/socket/socket.io.js');
var socket = io();

var EditorHeader = React.createClass({

	mixins : [
				Reflux.connect(AnimationStore.store, 'animation'), //emitted updates go to 'animation' key
				Reflux.connect(StudyStore.store, 'study'), //emitted updates go to 'study' key

			],

	propTypes: {
			},

	getDefaultProps: function() {
	    return {
	    	displayAnimation:false,
	    	displayInterfaceMode:false,
	    	displaySaveButton:true,
	    	displayStartButton:true,
			displayTestButton:true,
			displayRenderButton:true,
			displayStopButton:true,
			displayLoadButton:true,
			uploadFileID:"uploadedFile"
	    }
	},

	_onAnimationChange: function(val) {
		AnimationStore.actions.setAnimation(val.target.value);
	},

	_onDisplayModeChange: function(val) {
		StudyStore.actions.setDisplayMode(val.target.value);
	},

	_onStartClick : function(e) {
		LogStore.actions.log("START_TASK");
	},

	_onSaveClick : function(e) {
		SaveLoadStore.actions.save();
	},

	_onLoadClick : function(e) {
		var uploadedFiles = document.getElementById(this.props.uploadFileID);
		if (uploadedFiles.files.length > 0) {
			SaveLoadStore.actions.loadMacaronFile(uploadedFiles.files[0]);
		}
		uploadedFiles.value = [];
	},

	_onTestClick : function(e) {
		socket.emit('test');
	},

	_onRenderClick : function(e) {
		socket.emit('render');
	},

	_onStopClick : function(e) {
		socket.emit('stop_render');
	},

	/**
	* Rendering
	*
	*/

	render : function() {

		var headerStyle = {
		};

		var animationOptions = this.state.animation.animationOptions;
		var displayOptions = this.state.study.modes;
		var animationChangeCallback = this._onAnimationChange;
		var displayChangeCallback = this._onDisplayModeChange;
		var selectedAnimation = this.state.animation.animation;
		var selectedDisplayMode = this.state.study.currentMode;

		var animationOptionDisplay = <span />
		if (this.props.displayAnimation)
		{
			animationOptionDisplay = (<select className="animationoptions unselectable" onChange={animationChangeCallback}>
					{animationOptions.map( (animationOption) => (
						<option value={animationOption} selected={animationOption==selectedAnimation}>{animationOption}</option>
						))}
				</select>);
		}

		var interfaceModeDisplay = <span />
		if (this.props.displayInterfaceMode)
		{
			interfaceModeDisplay = (<select className="displayoptions unselectable" onChange={displayChangeCallback}>
					{Object.keys(displayOptions).map( (displayOption) => (
						<option value={displayOption} selected={displayOption==selectedDisplayMode}>{displayOption}</option>
						))}
				</select>);
		}

		var startButton = <span />
		if (this.props.displayStartButton)
		{
			startButton = (<button onClick={this._onStartClick}>Start</button>);
		}

		var saveButton = <span />
		if (this.props.displaySaveButton)
		{
			saveButton = (<button onClick={this._onSaveClick}>Finish</button>);
		}

		var loadButton = <span />
		if (this.props.displayLoadButton)
		{
			loadButton = (<input type="file" id={this.props.uploadFileID} onChange={this._onLoadClick}>Upload</input>);
		}

		var testButton = <span />
		if (this.props.displayTestButton)
		{
			testButton = (<button onClick={this._onTestClick}>Test</button>);
		}

		var renderButton = <span />
		if (this.props.displayRenderButton)
		{
			renderButton = (<button onClick={this._onRenderClick}>Render</button>);
		}

		var stopButton = <span />
		if (this.props.displayStopButton)
		{
			stopButton = (<button onClick={this._onStopClick}>Stop</button>);
		}


		return (
			<div className="header" style={headerStyle}>
				{startButton}
				{loadButton}
				<span className="title unselectable"> Editor </span>
				{animationOptionDisplay}
				{interfaceModeDisplay}
				{saveButton}
				{testButton}
				{renderButton}
				{stopButton}
			</div>
			);
	}

});

module.exports = EditorHeader;

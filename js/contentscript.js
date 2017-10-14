console.log("speechpoint activated...");
var spActivated = false;
var spStatus;
document.body.innerHTML += "<div id=\"sp-status-div\"><p id=\"sp-status\">Not running</p></div>"

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // voice functions
  if(request.spType == "start" && !spActivated) {
    console.log("started");
    spActivated = true;
    document.getElementById("sp-status").innerHTML = "Ready...";
    // spStatus =
  } else if(request.spType == "stop" && spActivated) {
    document.getElementById("sp-status").innerHTML = "Not running...";
    spActivated = false;
  } else if(request.spType == "onVoiceDetected") {
    console.log("onVoiceDetected");
    document.getElementById("sp-status").innerHTML= "Listening...";
  } else if(request.spType == "onVoiceEnded") {
    document.getElementById("sp-status").innerHTML ="Processing...";
    console.log("onVoiceEnded");
  } else if (request.spType == "onNetworkActivityStarted") {
    document.getElementById("sp-status").innerHTML ="Processing...";
  } else if (request.spType == "onNetworkActivityEnded") {
    document.getElementById("sp-status").innerHTML = "Done!";
  } else if (spActivated) {
    if (request.spType == "click") {
      console.log("click: " + request.data);
    } else if (request.spType == "go back") {
        goBackToPreviousPage();
    } else if (request.spType == "scroll down") {

    } else if (request.spType == "scroll up") {

    }
  }
});

function goBackToPreviousPage(){
    window.history.back();
}

function scrollYDistance(targetY, duration, onDone) {

			stopScroll()
			if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
                console.log("smooth scroll");
				container.toY(targetY)
				if (onDone) {
					onDone()
				}
			} else {
                console.log("not smooth scroll");
				var startY = container.getY()
				var distance = Math.max(0, targetY) - startY
				var startTime = new Date().getTime()
				duration = duration || Math.min(Math.abs(distance), defaultDuration);
				(function loopScroll() {
					setScrollTimeoutId(setTimeout(function () {
						// Calculate percentage:
						var p = Math.min(1, (new Date().getTime() - startTime) / duration)
						// Calculate the absolute vertical position:
						var y = Math.max(0, Math.floor(startY + distance*(p < 0.5 ? 2*p*p : p*(4 - p*2)-1)))
						container.toY(y)
						if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
							loopScroll()
						} else {
							setTimeout(stopScroll, 99) // with cooldown time
							if (onDone) {
								onDone()
							}
						}
					}, 9))
				})()
			}
		}
setTimeout(function () {
    console.log("start scrolling");
    window.scrollYDistance(3000);
    scrollYDistance(3000, 3, null);
}, 1000);

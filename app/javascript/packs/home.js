const row_height = 100;

document.body.onload = function() {
    document.getElementById("grid-container").addEventListener("click",timeBetweenWorkOrders);
    setWorkOrderSizeAndPlacement();
}


function timeBetweenWorkOrders(event){
    if(event.path.find(element => element.classList ? element.classList.contains("work-order") : false )){
        alert("Work Order in progress");
        console.log("Clicked a work order");
    } else {
        console.log("previousWorkOrder");
        let previousWorkOrder = checkPreviousSiblingHasChild(event.target);
        let previousOrderTime = null;
        if(previousWorkOrder !== null){
            previousOrderTime = new Date(previousWorkOrder.children[0].dataset.time * 1000);
            console.log(previousOrderTime);
        }
        console.log("nextWorkOrder");
        let nextWorkOrder = checkNextSiblingHasChild(event.target);
        let nextOrderTime = null;
        if(nextWorkOrder !== null){
            nextOrderTime = new Date(nextWorkOrder.children[0].dataset.time * 1000);
            console.log(nextOrderTime);
        }
        if(previousWorkOrder === null){
            alert("First work order of the day at: " + nextOrderTime);
        } else if(nextWorkOrder === null){
            alert("No further work orders");
        } else {
            alert(msToTime(nextOrderTime - previousOrderTime) + " until the next work order");
        }
    }
}
//takes a dom elelemt and rescursively finds the previous sibiling that has a work-order class
function checkPreviousSiblingHasChild(dom) {
    if(dom.previousElementSibling === null) {
        return null;
    }
    if(dom.previousElementSibling.children[0] !== null && dom.previousElementSibling.children[0] !== undefined){
        return dom.previousElementSibling;
    } else {
        return checkPreviousSiblingHasChild(dom.previousElementSibling);
    }
}

function checkNextSiblingHasChild(dom) {
    if(dom.nextElementSibling === null) {
        return null;
    }
    if(dom.nextElementSibling.children[0] !== null && dom.nextElementSibling.children[0] !== undefined){
        return dom.nextElementSibling;
    } else {
        return checkNextSiblingHasChild(dom.nextElementSibling);
    }
}
function setWorkOrderSizeAndPlacement() {
    let work_orders = document.getElementsByClassName("work-order");
    for (work_order of work_orders) {
        let duration = work_order.dataset.duration;
        let minutes = new Date(work_order.dataset.time * 1000).getMinutes();
        console.log(minutes);
        work_order.style.height =  (row_height * (duration/60)) + "px";
        console.log(minutes);
        if(minutes !== 0){
            work_order.style.marginTop = ((minutes/60) * row_height) + "px";
        }
    }

}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    return hours + ":" + minutes;
  }
const row_height = 100;

document.body.onload = function() {
    setWorkOrderSizeAndPlacement();
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

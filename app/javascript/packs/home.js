const row_height = 100;

document.body.onload = function() {
    document.getElementById("grid-container").addEventListener("click",timeBetweenWorkOrders);
    setWorkOrderSizeAndPlacement();
    var modal = document.getElementsByClassName("modal")[0];
    var span = document.getElementsByClassName("close")[0];
    span.addEventListener("click",function() {
        modal.style.display = "none";
      });
    window.addEventListener("click", function(event) {
    if (event.target == modal) {
         modal.style.display = "none";
     }
    });
}


function timeBetweenWorkOrders(event){
    console.log(event);
    if((event.target.classList ? event.target.classList.contains("center_text") : false) || event.target.id === "grid-container") {
        return;
    }
    let workOrder = event.path.find(element => element.classList ? element.classList.contains("work-order") : false );

    if(workOrder){
        openModalWithContent(workOrder.innerHTML);
    } else {
        let previousWorkOrder = checkPreviousSiblingHasChild(event.target);
        let previousOrderTime = null;
        if(previousWorkOrder !== null){
            previousOrderTime = new Date((previousWorkOrder.children[0].dataset.time * 1000 + previousWorkOrder.children[0].dataset.duration * 60000));
        }
        let nextWorkOrder = checkNextSiblingHasChild(event.target.previousElementSibling);
        let nextOrderTime = null;
        console.log(nextWorkOrder);
        if(nextWorkOrder !== null){
            nextOrderTime = new Date(nextWorkOrder.children[0].dataset.time * 1000);
        }
        if(previousWorkOrder === null){
            openModalWithContent("First work order of the day at: " + nextOrderTime.toLocaleTimeString({ timeZone: 'PST', timeZoneName: 'short' }));
        } else if(nextWorkOrder === null){
            openModalWithContent("No further work orders for today");
        } else {
            openModalWithContent(msToTime(nextOrderTime - previousOrderTime ) + " between work orders");
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
        work_order.style.height =  (row_height * (duration/60)) + "px";
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

function openModalWithContent(content) {
    modalTextContent = document.getElementById("modal-text-content");
    var modal = document.getElementsByClassName("modal")[0];
    modalTextContent.innerHTML = content;
    modal.style.display = "block";
}
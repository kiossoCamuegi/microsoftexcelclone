const GETALL = (e)=>{return document.querySelectorAll(e);}
const GETNUMB = (e)=>{return document.querySelectorAll(e).length;}

 

function hideloader() {
    const element = GETALL(".loader");
    if (GETNUMB(".loader") >= 1){
        const loader  = element[0];
        setTimeout(() => {
            loader.classList.toggle("hide");
        }, 5000);
    }

} 


function expandarea() {
    const main = document.querySelector(".excel-area");
    const primary = document.querySelector("#expand-btn");  
    if(GETNUMB(".expand-box") >= 1){
        document.querySelector(".expand-box").addEventListener("click", ()=>{ 
            primary.classList.toggle("expand-box");
            primary.classList.toggle("normal-box"); 
            if (main.requestFullscreen) {
              main.requestFullscreen();
             } else if (roombOx.webkitRequestFullscreen) { /* Safari */
                 main.webkitRequestFullscreen();
             } else if (roombOx.msRequestFullscreen) { /* IE11 */
                 main.msRequestFullscreen();
             } 
         });
    }
   setInterval(() => {
    if(GETNUMB(".normal-box") >= 1){
        document.querySelector(".normal-box").addEventListener("click", ()=>{ 
            primary.classList.toggle("normal-box");
            primary.classList.toggle("expand-box"); 
            if (main.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
              }  
         });  
    }
   }, 1);
}
 

function excel_global_tabs(tab,  header, container, ct, hl, active_element){
    const maintab = GETALL(tab);
    if (maintab.length >= 1){
        const Current_tab = maintab[0];
        const Current_header = Current_tab.querySelector(header);
        const Current_container = Current_tab.querySelector(container);
        const Current_header_links = Current_header.querySelectorAll(hl); 
        const Current_container_elements = Current_container.querySelectorAll(ct);
        for(let i = 0; i < Current_header_links.length; i++){
            Current_header_links[i].onclick = ()=>{ 
                Current_header.querySelector("."+active_element).classList.remove(active_element);
                Current_header_links[i].classList.add(active_element);
                Current_container.querySelector("."+active_element).classList.remove(active_element);
                Current_container_elements[i].classList.add(active_element);
            }
        }
    }
}




function generate_elements(){
  if(GETNUMB(".input-cell-container") >= 1  && GETNUMB(".left-bar") >= 1 && GETNUMB(".columns-name") >= 1){

    const inputs_container = GETALL(".input-cell-container")[0];
    const left_bar_numbers = GETALL(".left-bar")[0];
    const columns_container = GETALL(".columns-name")[0];
    let numb = 100;
 

    for(let i = 1; i <= 100; i++){
         /**Generate letters */
            let answer = "";
            let x = i;
            while (x > 0){
                const remain = x % 26;
                if (remain == 0){
                    answer += "Z";
                    x = Math.floor(x/26) -1;
                }else{
                    answer +=  String.fromCharCode(remain -1+65);
                    x = Math.floor(x/26); 
                } 
            }
           let column  = $(`<div class="column-name colId-${i}" index="${i}" id="col-code-${answer} code-id-${i}">${answer}<div class="mv-cl" col-code="${answer}"></div></div>`);
           $(columns_container).append(column); 

           let row = $(`<div class="row-name" index="${i}" id="rowCode-${i}">${i} <div class="mv-clh"></div></div>`);
           $(left_bar_numbers).append(row); 
           
        /**end */ 
    }
 
        for (let i = 1; i <= numb; i++) {
            let row = $(`<section class="cell-row" index="${i-1}"></section>`);
            for (let k = 1; k <= numb; k++) {
                let colcode = $(`.colId-${k}`).attr("id").split("-")[1];
                let column = $(`<div  contenteditable="true" class="form-control input input-edit-${k}" vr-position="${k}"  code-id="${i}" id="row-${i}-col-${k}" data-input="input-code-${colcode}"> </div>`);
                row.append(column);
            }
            $(inputs_container).append(row);
        } 



    /**add new cells when user scrolls down */ 
    if (GETNUMB(".excel-workspace") >= 1){
        let worksapce = GETALL(".excel-workspace")[0];
        worksapce.onscroll = (e)=> { 
           console.log(e);   
            
        }; 
      console.table("oi"); 
    } 
  }
}




function excel_context_menu(){
    let container = document.querySelector(".input-cell-container"); 
    let inputs = container.querySelectorAll(".input"); 
    const contextmenu = document.querySelector(".main-contextmenu");
         container.oncontextmenu = (e)=>{ 
            e.preventDefault();  
            let x = e.clientX +"px";
            let y = e.clientY +"px"; 
            contextmenu.style.left = x;
            contextmenu.style.top = y; 
            contextmenu.classList.add("showmenu"); 
            console.log("Altura = "+y + " Largura = "+x);
    }
    for (let i = 0; i < inputs.length; i++) {
         const input = inputs[i];
         input.onclick = ()=>{
            if(contextmenu.classList.contains("showmenu")){
                contextmenu.classList.remove("showmenu");
            }
         }
    }
}

 

function simple_toggle(btn, container,  active){
    const BUTTONS = GETALL(btn);
    if(BUTTONS.length >= 1){
      if(GETNUMB(container) >= 1){
       const main = document.querySelector(container);
        BUTTONS.forEach(btn => {
            btn.onclick = ()=>{
                main.classList.toggle(active); 
            }
        });
      }
    }
}




function cellscursor(){
    const  pointer = (".cells-cursor");
    setTimeout(() => {
        const inputs = GETALL(".input-cell-container .form-control");
        for(let i = 0; i < inputs.length; i++) { 
            inputs[i].addEventListener("onmouseover", ()=>{
            console.log("ola mundo")
        })
    }
    }, 10);

    if(GETNUMB(pointer) >= 1){
      let cursor = GETALL(pointer)[0]; 
      document.addEventListener("mousemove", e =>{
            let x = (e.pageX -30);
            let y = (e.pageY-290);
          // cursor.setAttribute("style", "bottom:"+y+"px; left:"+x+"px;");
      });  
    }   
}



function resizecells(){ 
      if(GETNUMB(".input-cell-container") >= 1){
          let container = document.querySelector(".input-cell-container");
          let inputs = container.querySelectorAll(".input"); 
          let rowsName = document.querySelectorAll(".left-bar .row-name"); 
          if(GETNUMB(".columns-name") >= 1){
            let columns = GETALL(".columns-name")[0].querySelectorAll(".column-name");
            //  console.log("columns length : "+ columns.length);
          //    console.log("cells length  : "+cells.length);

          
          ///Add vertical selection
              for (let c = 0; c < columns.length; c++) { 
                   columns[c].onclick = ()=>{   
                        let total_cells_container = container.querySelectorAll(".cell-row")[c]; 
                        RemoveSelectClass();
                         if(total_cells_container.classList[1] != "selected"){
                            total_cells_container.classList.add("selected");  
                         }  
                         for(let i = 0; i < rowsName.length; i++){
                           if(!rowsName[i].classList.contains("green-effect")){
                               rowsName[i].classList.add("green-effect");
                            }
                         }
                         columns[c].classList.add("column-focus");
                    }   
              }
 

              // Add Horizontal selection
                  for (let i = 0; i < rowsName.length; i++) {
                       let rowname = rowsName[i];
                       rowname.onclick = ()=>{  
                           RemoveSelectClass();
                           let index = rowname.getAttribute("index");
                           let text_inputs = document.querySelectorAll(".input-edit-"+index);
                           for (let p = 0; p < text_inputs.length; p++) { 
                             if (!text_inputs[p].classList.contains("select")) {
                                 console.log("No");
                                 text_inputs[p].classList.add("select");
                                 text_inputs[0].style.background = "#ffff";
                             } 
                           } 
                           for (let c = 0; c < columns.length; c++) {
                            if(!columns[c].classList.contains("green-effect")){
                                columns[c].classList.add("green-effect");
                             }
                           }
                           rowname.classList.add("rowname-focus");
                       } 
                  }   
 

              /**remove selections */
             for(let i = 0; i < inputs.length; i++){
                 let input =  inputs[i];
                input.onfocus = () =>{  
                    RemoveSelectClass();
                    let row_name = document.querySelector('#rowCode-'+input.getAttribute("vr-position"));
                    let colunm_name = document.querySelectorAll(".column-name")[input.getAttribute("code-id")-1];
                    colunm_name.classList.add("single-input-focus");
                    row_name.classList.add("single-input-focus"); 
                 } 
             }


            

             function RemoveSelectClass() {
               let selections = container.querySelectorAll("div.select");
               let single_selection = document.querySelectorAll(".single-input-focus"); 
               for(let s = 0; s < single_selection.length; s++) {
                   if(single_selection.length >= 1){
                       console.log("total = "+single_selection.length)
                    single_selection[s].classList.remove("single-input-focus"); 
                   }
                } 
                if(selections.length >= 1) {
                    for (let p = 0; p < selections.length; p++) {
                        selections[p].classList.remove("select");   
                    } 
                } 
                if(container.querySelectorAll(".cell-row.selected").length >= 1) {
                    container.querySelector(".cell-row.selected").classList.remove("selected");
                }   
                for (let c = 0; c < columns.length; c++) {
                    if(columns[c].classList.contains("green-effect")){
                        columns[c].classList.remove("green-effect");
                     }
                     if(columns[c].classList.contains("column-focus")){
                        columns[c].classList.remove("column-focus");
                     }
                  }
                  for(let i = 0; i < rowsName.length; i++){
                    if(rowsName[i].classList.contains("green-effect")){
                        rowsName[i].classList.remove("green-effect");
                     }
                     if(rowsName[i].classList.contains("rowname-focus")){
                        rowsName[i].classList.remove("rowname-focus");
                     }
                  } 
              }
    



             //** Resize inputs and headers */
             function ResizeInput(){ 
                const CellRow =  container.querySelectorAll(".cell-row");   
                let startX, startY, startWidth, finalwidth, finalHeigth, Height, Width, W; 

                initResizeElement();

                function initResizeElement() {   
                //* change the width */
                 const Columns = document.querySelector(".columns-name").querySelectorAll(".column-name");
                  for (var i = 0; i < Columns.length; i++) {
                    let column = Columns[i]; 
                    let right =  column.querySelector(".mv-cl"); 
                    right.addEventListener("mousedown", initDragWidth, false);
                    right.parentinput = column;  
                  } 

                  // change the height */
                  const RowsName = document.querySelector(".left-bar").querySelectorAll(".row-name");
                  for (let i = 0; i < RowsName.length; i++) {
                       let rowname = RowsName[i];
                       let bottom = rowname.querySelector(".mv-clh"); 
                       bottom.addEventListener("mousedown", initDragHeight, false);
                       bottom.parentinput = rowname;  
                     //  console.table(bottom.parentinput);
                  }
                } 
              
                //*Start drag for width
                function initDragWidth(e) {
                    e.preventDefault();
                    element = this.parentinput; 
                     startX = e.clientX; 
                    startWidth = parseInt(
                      document.defaultView.getComputedStyle(element).width, 10
                    ); 
                    document.documentElement.addEventListener("mousemove", doDragWidth, false);
                    document.documentElement.addEventListener("mouseup", stopDrag1, false);
               
                    let i = element.getAttribute("index");
                    W = CellRow[i].getAttribute("index") -1; 
                  }
              
                 function doDragWidth(e) {
                    Width =  startWidth + e.clientX - startX;
                    finalwidth = startWidth + e.clientX - startX + "px"; 
                        if(Width >= 80){
                            element.style.minWidth = finalwidth; 
                            let text_inputs = CellRow[W].querySelectorAll("input"); 
                            CellRow[W].style.minWidth = finalwidth;
                            for(let e = 0; e < text_inputs.length; e++){
                                let input = text_inputs[e];
                                input.style.minWidth = finalwidth;  
                            }
                        } 
                  }
                  /**end */
 

                 //* Start drag for Height 
                function initDragHeight(e) {
                    e.preventDefault();
                    element = this.parentinput;   
                    startY = e.clientY; 
                    startHeight = parseInt(
                      document.defaultView.getComputedStyle(element).height, 10
                    );  
                    document.documentElement.addEventListener("mousemove", doDragHeight, false); 
                    document.documentElement.addEventListener("mouseup", stopDrag2, false);
                  }

                  function doDragHeight(e) { 
                    Height =  startHeight + e.clientY - startY; 
                    finalHeigth = startHeight + e.clientY - startY + "px";  
                    i = element.getAttribute("index");
                        if(Height >= 25){ 
                            console.log("O meu numb é = "+ i)
                            let text_inputs = document.querySelectorAll(".input-edit-"+i); 
                            element.style.minHeight = finalHeigth;  
                            element.style.minWidth =  "24px";  
                            for(let e = 0; e < text_inputs.length; e++){
                                let input = text_inputs[e];
                                input.style.minHeight = finalHeigth;  
                            } 
                        } 
                  } 
                /**end */

              
                function stopDrag1() {
                    document.documentElement.removeEventListener("mousemove", doDragWidth, false); 
                    document.documentElement.removeEventListener("mouseup", stopDrag1, false);
                    console.log("Parando o evento 1");
                  }

                  function stopDrag2(){
                    document.documentElement.removeEventListener("mousemove", doDragHeight, false); 
                    document.documentElement.removeEventListener("mouseup", stopDrag2, false);
                    console.log("Parando o evento 2");
                  }
              
               } 
               setTimeout(() => {
                   ResizeInput();
               }, 100);

          }  
      }
}

 

//Call functions

function call() {
generate_elements();
cellscursor();
hideloader();
excel_context_menu();
expandarea();
resizecells();
 

excel_global_tabs(
    ".excel-tab",
    ".excel-tab-header",
    ".excel-tab-body",
    "aside",
    "ul .tab-link",
    "active"
);

simple_toggle(".toggle-explorer-panel", ".file-explorer", "show-explorer");
}
setTimeout(() => {call()}, 100);
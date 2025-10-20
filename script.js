let myLeads = [];
const inputEl = document.querySelector("#input-li");
const btn = document.querySelector("#save-li");
const btn_del = document.querySelector("#delete-li");
const ulEl = document.querySelector("#link");
const tabBtn = document.querySelector("#tab-btn");

// Function for rendering leads onto the web
const renderLeads = () => {
    ulEl.innerHTML = "";
    for(let i = 0; i < myLeads.length; i++)
    {
        const li = document.createElement("li");
        li.classList = "list";
        const a = document.createElement("a");
        a.href = myLeads[i];
        a.textContent = myLeads[i];
        a.target = "_blank";
        li.appendChild(a);
        ulEl.appendChild(li);
    }
}

//Getting saved Leads from the local storage
const saved = localStorage.getItem("myLeads");
if(saved)
{
    try {
        myLeads = JSON.parse(saved);
    } catch (e) {
        myLeads = [];
        console.error("Failed to parse saved leads:", e);
    }
   renderLeads();
}

 tabBtn.addEventListener("click", (e) => 
    {
        //Grab URL of the current TAB
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            myLeads.push(tabs[0].url);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            renderLeads();
        })
    })

// Event button for Saving input
btn.addEventListener("click", (e) =>
{
    const val = inputEl.value.trim();
    if(!val) return;
    myLeads.push(val);
    inputEl.value = "";
    //Saving myLeads to local storage
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    renderLeads();
});

//Event for Delete button
btn_del.addEventListener("click", (e) =>
{
    localStorage.clear();
    myLeads = [];
    ulEl.innerHTML = "";
})



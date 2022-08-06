form.addEventListener("submit",()=>{
    const contact = {
        name: nama.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    fetch("./api/contactus", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
        .then(data=>{
        if(data.status == "error"){
            success.style.display = "none"
            error.style.display = "block"
            error.innerText = data.error
        }else{
            error.style.display = "none"
            success.style.display = "block"
            success.innerText = data.success
        }
    })
})